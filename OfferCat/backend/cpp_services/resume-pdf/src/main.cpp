#ifdef _WIN32
#ifndef WIN32_LEAN_AND_MEAN
#define WIN32_LEAN_AND_MEAN
#endif
#define _WIN32_WINNT 0x0A00
#include <winsock2.h>
#include <ws2tcpip.h>
#include <windows.h>
#ifndef CreateFile2
#define CreateFile2(lpFileName, dwDesiredAccess, dwShareMode, dwCreationDisposition, lpSecurityAttributes) \
    CreateFileW(lpFileName, dwDesiredAccess, dwShareMode, NULL, dwCreationDisposition, FILE_ATTRIBUTE_NORMAL, NULL)
#endif
#endif

#include "../httplib.h"
#include "highlight_engine.hpp"
#include "keyword_loader.hpp"
#include "resume_segments.hpp"
#include "../nlohmann/json.hpp"

#include <cctype>
#include <cstdlib>
#include <iostream>
#include <optional>
#include <sstream>
#include <string>
#include <utility>

using json = nlohmann::json;

static std::string trim_ascii_json_string(std::string s) {
    while (!s.empty() && std::isspace(static_cast<unsigned char>(s.front()))) {
        s.erase(s.begin());
    }
    while (!s.empty() && std::isspace(static_cast<unsigned char>(s.back()))) {
        s.pop_back();
    }
    return s;
}

/** 去掉 UTF-8 BOM 与首部空白，避免 BOM 污染导致顶层字段名无法匹配。 */
static std::string normalize_json_body(std::string raw) {
    if (raw.size() >= 3 && static_cast<unsigned char>(raw[0]) == 0xEF &&
        static_cast<unsigned char>(raw[1]) == 0xBB && static_cast<unsigned char>(raw[2]) == 0xBF) {
        raw.erase(0, 3);
    }
    while (!raw.empty() && (raw.front() == ' ' || raw.front() == '\t' || raw.front() == '\n' || raw.front() == '\r')) {
        raw.erase(raw.begin());
    }
    return raw;
}

/** 简历 PDF/高亮：收集器（朴素 find / AC）+ 是否合并专业词表 txt。 */
struct ResumePdfKeywordOptions {
    std::optional<bool> use_ac_automaton;
    bool merge_major_dictionary{true};
};

static void attach_keyword_debug_headers(httplib::Response& res, const ResumePdfKeywordOptions& opts,
                                         std::size_t keyword_count, bool include_merge_major_header = true) {
    if (include_merge_major_header) {
        res.set_header("X-OfferCat-MergeMajor", opts.merge_major_dictionary ? "full" : "none");
    }
    res.set_header("X-OfferCat-KeywordCount", std::to_string(keyword_count));
    if (opts.use_ac_automaton.has_value()) {
        res.set_header("X-OfferCat-UseAcOverride", *opts.use_ac_automaton ? "1" : "0");
    } else {
        res.set_header("X-OfferCat-UseAcOverride", "env");
    }
}

/**
 * 优先 `highlightEngine`（"naive"|"ac"），否则 `useAcAutomaton` 布尔/整数。
 * 均未指定：收集器走 RESUME_PDF_AC；词表始终合并专业 txt（与旧版一致）。
 *
 * 「朴素 / 智能」产品区分（请求显式指定时）：
 * - naive 或 useAcAutomaton=false：仅请求体 keywords，不加载 major_file_map 词表；收集用朴素。
 * - ac 或 useAcAutomaton=true：合并专业词表 + 请求 keywords；收集用 AC。
 */
static ResumePdfKeywordOptions parse_resume_pdf_keyword_options(const json& body) {
    ResumePdfKeywordOptions opts;
    if (body.contains("highlightEngine") && body["highlightEngine"].is_string()) {
        std::string s = trim_ascii_json_string(body["highlightEngine"].get<std::string>());
        if (!s.empty()) {
            for (char& c : s) {
                c = static_cast<char>(std::tolower(static_cast<unsigned char>(c)));
            }
            if (s == "naive") {
                opts.use_ac_automaton = false;
                opts.merge_major_dictionary = false;
                return opts;
            }
            if (s == "ac") {
                opts.use_ac_automaton = true;
                opts.merge_major_dictionary = true;
                return opts;
            }
            throw std::runtime_error(R"(highlightEngine must be "naive" or "ac")");
        }
    }
    if (body.contains("useAcAutomaton") && !body["useAcAutomaton"].is_null()) {
        const auto& v = body["useAcAutomaton"];
        if (v.is_boolean()) {
            const bool b = v.get<bool>();
            opts.use_ac_automaton = b;
            opts.merge_major_dictionary = b;
            return opts;
        }
        if (v.is_number_integer()) {
            const bool b = v.get<int>() != 0;
            opts.use_ac_automaton = b;
            opts.merge_major_dictionary = b;
            return opts;
        }
        if (v.is_string()) {
            std::string u = trim_ascii_json_string(v.get<std::string>());
            for (char& c : u) {
                c = static_cast<char>(std::tolower(static_cast<unsigned char>(c)));
            }
            if (u == "1" || u == "true" || u == "yes" || u == "on") {
                opts.use_ac_automaton = true;
                opts.merge_major_dictionary = true;
                return opts;
            }
            if (u == "0" || u == "false" || u == "no" || u == "off") {
                opts.use_ac_automaton = false;
                opts.merge_major_dictionary = false;
                return opts;
            }
        }
    }
    return opts;
}

static std::string default_node_url() {
    const char* e = std::getenv("NODE_HIGHLIGHT_URL");
    return e && e[0] ? std::string(e) : std::string("http://127.0.0.1:30081");
}

static bool parse_http_host_port(const std::string& base, std::string& host, int& port) {
    std::string u = base;
    const std::string http = "http://";
    const std::string https = "https://";
    if (u.rfind(http, 0) == 0) {
        u = u.substr(http.size());
    } else if (u.rfind(https, 0) == 0) {
        u = u.substr(https.size());
    }
    const auto slash = u.find('/');
    if (slash != std::string::npos) {
        u = u.substr(0, slash);
    }
    const auto colon = u.find(':');
    if (colon == std::string::npos) {
        host = u;
        port = 80;
        return !host.empty();
    }
    host = u.substr(0, colon);
    try {
        port = std::stoi(u.substr(colon + 1));
    } catch (...) {
        return false;
    }
    return !host.empty() && port > 0;
}

static bool node_health_ok(const std::string& node_base) {
    std::string host;
    int port = 0;
    if (!parse_http_host_port(node_base, host, port)) {
        return false;
    }
    httplib::Client cli(host, port);
    cli.set_connection_timeout(1, 0);
    cli.set_read_timeout(1, 0);
    auto res = cli.Get("/health");
    return res && res->status == 200;
}

static json call_node_highlight(const std::string& node_base, const json& body) {
    std::string host;
    int port = 0;
    if (!parse_http_host_port(node_base, host, port)) {
        throw std::runtime_error("invalid NODE_HIGHLIGHT_URL");
    }
    httplib::Client cli(host, port);
    cli.set_connection_timeout(3, 0);
    cli.set_read_timeout(30, 0);
    const std::string payload = body.dump(-1, ' ', false, json::error_handler_t::replace);
    auto res = cli.Post("/api/v1/highlight", payload, "application/json; charset=utf-8");
    if (!res) {
        throw std::runtime_error("no response from node highlight service");
    }
    if (res->status != 200) {
        throw std::runtime_error("node returned HTTP " + std::to_string(res->status) + ": " + res->body);
    }
    return json::parse(res->body, nullptr, true);
}

static json build_node_body(const json& segments, const json& spans) {
    json body;
    body["unit"] = "utf8_byte";
    body["segments"] = segments;
    body["spans"] = spans;
    body["options"] = json{{"className", "kw-highlight"}, {"escapeInner", true}};
    return body;
}

static std::pair<json, json> compute_spans_for_segments(const json& segments,
                                                         const std::vector<std::string>& keywords,
                                                         std::optional<bool> use_ac_automaton) {
    json spans = json::array();
    json spans_by_id = json::object();

    for (const auto& seg : segments) {
        if (!seg.is_object() || !seg.contains("id") || !seg.contains("text")) {
            continue;
        }
        const std::string id = seg["id"].get<std::string>();
        const std::string text = seg["text"].get<std::string>();
        const auto found = find_spans_utf8(text, keywords, use_ac_automaton);
        json id_spans = json::array();
        for (const auto& sp : found) {
            spans.push_back(
                json{{"id", id}, {"start", sp.start}, {"end", sp.end}, {"word", sp.word}});
            id_spans.push_back(json{{"start", sp.start}, {"end", sp.end}, {"word", sp.word}});
        }
        spans_by_id[id] = std::move(id_spans);
    }
    return {std::move(spans), std::move(spans_by_id)};
}

static json highlight_segments_with_node(const std::string& node_base, const json& segments,
                                         const std::vector<std::string>& keywords,
                                         std::optional<bool> use_ac_automaton) {
    const auto [spans, spans_by_id] = compute_spans_for_segments(segments, keywords, use_ac_automaton);
    const json node_body = build_node_body(segments, spans);
    const json node_resp = call_node_highlight(node_base, node_body);

    json out;
    out["unit"] = "utf8_byte";
    out["spansById"] = spans_by_id;
    if (node_resp.contains("htmlById")) {
        out["htmlById"] = node_resp["htmlById"];
    } else {
        out["htmlById"] = json::object();
    }
    return out;
}

static std::string call_node_generate_pdf(const std::string& node_base, const json& resume,
                                          const json& spans_by_id, const json& request_body) {
    std::string host;
    int port = 0;
    if (!parse_http_host_port(node_base, host, port)) {
        throw std::runtime_error("invalid NODE_HIGHLIGHT_URL");
    }
    httplib::Client cli(host, port);
    cli.set_connection_timeout(5, 0);
    cli.set_read_timeout(120, 0);
    json body;
    body["resume"] = resume;
    body["spansById"] = spans_by_id;
    if (request_body.contains("userId")) {
        body["userId"] = request_body["userId"];
    } else if (request_body.contains("user_id")) {
        body["userId"] = request_body["user_id"];
    } else if (resume.is_object()) {
        if (resume.contains("userId")) {
            body["userId"] = resume["userId"];
        } else if (resume.contains("user_id")) {
            body["userId"] = resume["user_id"];
        }
    }
    const std::string payload = body.dump(-1, ' ', false, json::error_handler_t::replace);
    auto res = cli.Post("/generate-pdf", payload, "application/json; charset=utf-8");
    if (!res) {
        throw std::runtime_error("no response from node /generate-pdf");
    }
    if (res->status != 200) {
        throw std::runtime_error("node /generate-pdf HTTP " + std::to_string(res->status) + ": " + res->body);
    }
    const auto ct = res->get_header_value("Content-Type");
    if (ct.find("application/pdf") == std::string::npos) {
        throw std::runtime_error("node did not return application/pdf, got: " + ct);
    }
    return res->body;
}

static void send_json(httplib::Response& res, int status, const json& j) {
    res.status = status;
    res.set_content(j.dump(-1, ' ', false, json::error_handler_t::replace),
                    "application/json; charset=utf-8");
}

int main() {
    const std::string node_base = default_node_url();
    httplib::Server svr;

    svr.Get("/health", [&](const httplib::Request&, httplib::Response& res) {
        const bool ok = node_health_ok(node_base);
        json j{{"status", "ok"},
               {"node", ok ? "ok" : "unreachable"},
               {"highlightEngine", resume_pdf_highlight_engine_label()},
               {"keywordsDir", resolve_keywords_directory_string()}};
        send_json(res, 200, j);
    });

    svr.Post("/api/v1/text/highlight", [&](const httplib::Request& req, httplib::Response& res) {
        try {
            const json body = json::parse(normalize_json_body(std::string(req.body)), nullptr, true);
            const std::string text = body.value("text", "");
            std::vector<std::string> keywords;
            if (body.contains("keywords") && body["keywords"].is_array()) {
                for (const auto& k : body["keywords"]) {
                    if (k.is_string()) {
                        keywords.push_back(k.get<std::string>());
                    }
                }
            }
            json segments = json::array();
            segments.push_back(json{{"id", "body"}, {"text", text}});
            const auto kw_opts = parse_resume_pdf_keyword_options(body);
            const auto spans_vec = find_spans_utf8(text, keywords, kw_opts.use_ac_automaton);
            json spans = json::array();
            for (const auto& sp : spans_vec) {
                spans.push_back(
                    json{{"id", "body"}, {"start", sp.start}, {"end", sp.end}, {"word", sp.word}});
            }
            const json node_body = build_node_body(segments, spans);
            const json node_resp = call_node_highlight(node_base, node_body);
            json out{{"unit", "utf8_byte"}, {"spans", json::array()}};
            for (const auto& sp : spans_vec) {
                out["spans"].push_back(
                    json{{"id", "body"}, {"start", sp.start}, {"end", sp.end}, {"word", sp.word}});
            }
            if (node_resp.contains("htmlById") && node_resp["htmlById"].contains("body")) {
                out["html"] = node_resp["htmlById"]["body"];
            } else {
                out["html"] = "";
            }
            attach_keyword_debug_headers(res, kw_opts, keywords.size(), false);
            send_json(res, 200, out);
        } catch (const std::exception& e) {
            send_json(res, 400, json{{"error", e.what()}});
        }
    });

    svr.Post("/api/v1/resume/highlight", [&](const httplib::Request& req, httplib::Response& res) {
        try {
            const json body = json::parse(normalize_json_body(std::string(req.body)), nullptr, true);
            if (!body.contains("resume")) {
                send_json(res, 400, json{{"error", "missing resume"}});
                return;
            }
            std::vector<std::string> keywords;
            if (body.contains("keywords") && body["keywords"].is_array()) {
                for (const auto& k : body["keywords"]) {
                    if (k.is_string()) {
                        keywords.push_back(k.get<std::string>());
                    }
                }
            }
            const auto kw_opts = parse_resume_pdf_keyword_options(body);
            keywords = merge_resume_keywords(body["resume"], body, keywords, kw_opts.merge_major_dictionary);
            const json segments = extract_resume_segments(body["resume"]);
            const json out =
                highlight_segments_with_node(node_base, segments, keywords, kw_opts.use_ac_automaton);
            attach_keyword_debug_headers(res, kw_opts, keywords.size());
            send_json(res, 200, out);
        } catch (const std::exception& e) {
            send_json(res, 400, json{{"error", e.what()}});
        }
    });

    svr.Post("/api/v1/resume/pdf", [&](const httplib::Request& req, httplib::Response& res) {
        try {
            const json body = json::parse(normalize_json_body(std::string(req.body)), nullptr, true);
            if (!body.contains("resume")) {
                send_json(res, 400, json{{"error", "missing resume"}});
                return;
            }
            std::vector<std::string> keywords;
            if (body.contains("keywords") && body["keywords"].is_array()) {
                for (const auto& k : body["keywords"]) {
                    if (k.is_string()) {
                        keywords.push_back(k.get<std::string>());
                    }
                }
            }
            const auto kw_opts = parse_resume_pdf_keyword_options(body);
            keywords = merge_resume_keywords(body["resume"], body, keywords, kw_opts.merge_major_dictionary);
            const json segments = extract_resume_segments(body["resume"]);
            const auto spans_pair = compute_spans_for_segments(segments, keywords, kw_opts.use_ac_automaton);
            const std::string pdf =
                call_node_generate_pdf(node_base, body["resume"], spans_pair.second, body);
            res.status = 200;
            attach_keyword_debug_headers(res, kw_opts, keywords.size());
            res.set_header("Content-Disposition", "attachment; filename=\"resume.pdf\"");
            res.set_content(pdf, "application/pdf");
        } catch (const std::exception& e) {
            send_json(res, 400, json{{"error", e.what()}});
        }
    });

    const char* port_env = std::getenv("RESUME_PDF_PORT");
    const int port = port_env && port_env[0] ? std::atoi(port_env) : 22570;

    std::cout << "resume_pdf_service listening on 0.0.0.0:" << port << std::endl;
    std::cout << "NODE_HIGHLIGHT_URL=" << node_base << std::endl;

    svr.listen("0.0.0.0", port);
    return 0;
}
