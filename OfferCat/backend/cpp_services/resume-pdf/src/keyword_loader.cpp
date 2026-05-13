#include "keyword_loader.hpp"

#include <cctype>
#include <cstdlib>
#include <fstream>
#include <iostream>
#include <mutex>
#include <sstream>
#include <unordered_set>
#include <vector>

#ifdef _WIN32
#ifndef WIN32_LEAN_AND_MEAN
#define WIN32_LEAN_AND_MEAN
#endif
#include <windows.h>
#endif

#include <filesystem>

namespace fs = std::filesystem;
using json = nlohmann::json;

namespace {

std::string trim_ascii(std::string s) {
    while (!s.empty() && std::isspace(static_cast<unsigned char>(s.front()))) {
        s.erase(s.begin());
    }
    while (!s.empty() && std::isspace(static_cast<unsigned char>(s.back()))) {
        s.pop_back();
    }
    return s;
}

static std::string pick_major_string(const json& resume, const json& request) {
    auto from_obj = [](const json& o) -> std::string {
        if (!o.is_object()) {
            return {};
        }
        if (o.contains("majorName") && o["majorName"].is_string()) {
            return trim_ascii(o["majorName"].get<std::string>());
        }
        if (o.contains("major") && o["major"].is_string()) {
            return trim_ascii(o["major"].get<std::string>());
        }
        if (o.contains("major_name") && o["major_name"].is_string()) {
            return trim_ascii(o["major_name"].get<std::string>());
        }
        return {};
    };
    std::string m = from_obj(resume);
    if (!m.empty()) {
        return m;
    }
    return from_obj(request);
}

static std::vector<std::string> read_txt_keyword_lines(const fs::path& file) {
    std::vector<std::string> out;
    std::ifstream in(file, std::ios::binary);
    if (!in) {
        return out;
    }
    std::string buf((std::istreambuf_iterator<char>(in)), std::istreambuf_iterator<char>());
    if (buf.size() >= 3 && static_cast<unsigned char>(buf[0]) == 0xEF && static_cast<unsigned char>(buf[1]) == 0xBB &&
        static_cast<unsigned char>(buf[2]) == 0xBF) {
        buf.erase(0, 3);
    }
    std::istringstream iss(buf);
    std::string line;
    while (std::getline(iss, line)) {
        if (!line.empty() && line.back() == '\r') {
            line.pop_back();
        }
        line = trim_ascii(std::move(line));
        if (line.empty() || line[0] == '#') {
            continue;
        }
        out.push_back(std::move(line));
    }
    return out;
}

static fs::path resolve_keywords_dir_path() {
    const char* env = std::getenv("RESUME_PDF_KEYWORDS_DIR");
    if (env && env[0]) {
        return fs::path(env);
    }

    std::vector<fs::path> candidates;
#ifdef _WIN32
    wchar_t wbuf[MAX_PATH]{};
    const DWORD n = GetModuleFileNameW(nullptr, wbuf, MAX_PATH);
    if (n > 0 && n < MAX_PATH) {
        fs::path p = fs::path(wbuf).parent_path();
        for (int i = 0; i < 8 && !p.empty() && p != p.root_path(); ++i) {
            candidates.push_back(p / "keywords");
            p = p.parent_path();
        }
    }
#endif
    candidates.push_back(fs::current_path() / "keywords");

    for (const auto& p : candidates) {
        try {
            if (fs::exists(p / "major_file_map.json")) {
                return p;
            }
        } catch (...) {
        }
    }
    for (const auto& p : candidates) {
        try {
            if (fs::is_directory(p)) {
                return p;
            }
        } catch (...) {
        }
    }
    return fs::current_path() / "keywords";
}

static std::mutex g_map_mutex;
static json g_major_map_root;
static bool g_major_map_tried = false;

static const json& major_map_cached(const fs::path& kw_dir) {
    std::lock_guard<std::mutex> lock(g_map_mutex);
    if (!g_major_map_tried) {
        g_major_map_tried = true;
        const fs::path map_file = kw_dir / "major_file_map.json";
        std::ifstream in(map_file, std::ios::binary);
        if (!in) {
            std::cerr << "keyword_loader: missing " << map_file.string() << std::endl;
        } else {
            try {
                in >> g_major_map_root;
            } catch (const std::exception& e) {
                std::cerr << "keyword_loader: parse major_file_map.json: " << e.what() << std::endl;
            }
        }
    }
    return g_major_map_root;
}

static std::string lookup_txt_filename(const json& root, const std::string& major_cn) {
    if (major_cn.empty() || !root.is_object() || !root.contains("map") || !root["map"].is_object()) {
        return {};
    }
    const auto& m = root["map"];
    if (!m.contains(major_cn)) {
        return {};
    }
    const auto& v = m[major_cn];
    if (!v.is_string()) {
        return {};
    }
    return trim_ascii(v.get<std::string>());
}

} // namespace

std::string resolve_keywords_directory_string() {
    try {
        return fs::absolute(resolve_keywords_dir_path()).lexically_normal().string();
    } catch (...) {
        return "keywords";
    }
}

std::vector<std::string> merge_resume_keywords(const json& resume, const json& request,
                                               const std::vector<std::string>& json_keywords,
                                               bool include_major_dictionary) {
    std::unordered_set<std::string> seen;
    std::vector<std::string> out;
    out.reserve(json_keywords.size() + 128);
    for (const auto& k : json_keywords) {
        const std::string t = trim_ascii(k);
        if (t.empty()) {
            continue;
        }
        if (seen.insert(t).second) {
            out.push_back(t);
        }
    }

    if (!include_major_dictionary) {
        std::cerr << "merge_resume_keywords: major dictionary skipped, keyword_count=" << out.size()
                  << std::endl;
        return out;
    }

    const fs::path kw_dir = resolve_keywords_dir_path();
    const std::string major = pick_major_string(resume, request);
    const json& map_root = major_map_cached(kw_dir);
    const std::string fname = lookup_txt_filename(map_root, major);
    if (fname.empty()) {
        if (!major.empty()) {
            std::cerr << "keyword_loader: major not in map or empty file field: " << major << std::endl;
        }
        return out;
    }
    const fs::path txt_path = kw_dir / fname;
    if (!fs::exists(txt_path)) {
        std::cerr << "keyword_loader: missing keyword file " << txt_path.string() << std::endl;
        return out;
    }
    for (const auto& w : read_txt_keyword_lines(txt_path)) {
        if (w.empty()) {
            continue;
        }
        if (seen.insert(w).second) {
            out.push_back(w);
        }
    }
    return out;
}
