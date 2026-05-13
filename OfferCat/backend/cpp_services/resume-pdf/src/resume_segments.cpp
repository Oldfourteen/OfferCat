#include "resume_segments.hpp"

#include <cctype>
#include <regex>
#include <sstream>
#include <string>

namespace {

void replace_all_inplace(std::string& s, const std::string& from, const std::string& to) {
    std::size_t pos = 0;
    while ((pos = s.find(from, pos)) != std::string::npos) {
        s.replace(pos, from.size(), to);
        pos += to.size();
    }
}

std::string trim_ws(const std::string& s) {
    std::size_t a = 0;
    while (a < s.size() && std::isspace(static_cast<unsigned char>(s[a]))) {
        ++a;
    }
    std::size_t b = s.size();
    while (b > a && std::isspace(static_cast<unsigned char>(s[b - 1]))) {
        --b;
    }
    return s.substr(a, b - a);
}

std::string collapse_blank_lines(std::string s) {
    std::string out;
    bool prev_nl = false;
    for (char c : s) {
        if (c == '\n') {
            if (!prev_nl) {
                out.push_back(c);
            }
            prev_nl = true;
        } else {
            prev_nl = false;
            out.push_back(c);
        }
    }
    return trim_ws(out);
}

std::string strip_html_resume(std::string t) {
    try {
        t = std::regex_replace(t, std::regex(R"(<br\s*/?>)", std::regex::icase), "\n");
        t = std::regex_replace(t, std::regex(R"(</p\s*>)", std::regex::icase), "\n");
        t = std::regex_replace(t, std::regex(R"(<[^>]+>)"), "");
    } catch (...) {
        std::size_t i = 0;
        std::string out;
        while (i < t.size()) {
            if (t[i] == '<') {
                const auto j = t.find('>', i + 1);
                if (j == std::string::npos) {
                    break;
                }
                i = j + 1;
                continue;
            }
            out.push_back(t[i]);
            ++i;
        }
        t = out;
    }
    replace_all_inplace(t, "&nbsp;", " ");
    replace_all_inplace(t, "&amp;", "&");
    replace_all_inplace(t, "&lt;", "<");
    replace_all_inplace(t, "&gt;", ">");
    replace_all_inplace(t, "&quot;", "\"");
    return collapse_blank_lines(t);
}

const char* proficiency_label(int n) {
    switch (n) {
        case 1:
            return "初学";
        case 2:
            return "一般";
        case 4:
            return "熟练";
        case 5:
            return "精通";
        default:
            return "掌握";
    }
}

void add_segment(nlohmann::json& segments, const std::string& id, const std::string& text) {
    if (!text.empty()) {
        segments.push_back(nlohmann::json{{"id", id}, {"text", text}});
    }
}

void append_skills_from_items(nlohmann::json& segments, const nlohmann::json& resume) {
    const nlohmann::json* items = nullptr;
    if (resume.contains("skills_items") && resume["skills_items"].is_array()) {
        items = &resume["skills_items"];
    } else if (resume.contains("skillsItems") && resume["skillsItems"].is_array()) {
        items = &resume["skillsItems"];
    }
    if (items == nullptr || items->empty()) {
        return;
    }
    std::ostringstream oss;
    for (std::size_t i = 0; i < items->size(); ++i) {
        const auto& it = (*items)[i];
        if (!it.is_object()) {
            continue;
        }
        std::string name;
        if (it.contains("skill_name") && it["skill_name"].is_string()) {
            name = it["skill_name"].get<std::string>();
        } else if (it.contains("name") && it["name"].is_string()) {
            name = it["name"].get<std::string>();
        }
        if (name.empty()) {
            continue;
        }
        int prof = 3;
        if (it.contains("proficiency")) {
            if (it["proficiency"].is_number_integer()) {
                prof = static_cast<int>(it["proficiency"].get<std::int64_t>());
            } else if (it["proficiency"].is_number()) {
                prof = static_cast<int>(it["proficiency"].get<double>());
            }
        }
        if (!oss.str().empty()) {
            oss << "\u3001";
        }
        oss << name << "\uff08" << proficiency_label(prof) << "\uff09";
    }
    add_segment(segments, "skills.joined", oss.str());
}

} // namespace

nlohmann::json extract_resume_segments(const nlohmann::json& resume) {
    nlohmann::json segments = nlohmann::json::array();
    if (!resume.is_object()) {
        return segments;
    }

    if (resume.contains("self_evaluation") && resume["self_evaluation"].is_string()) {
        add_segment(segments, "self_evaluation", strip_html_resume(resume["self_evaluation"].get<std::string>()));
    } else if (resume.contains("selfEvaluation") && resume["selfEvaluation"].is_string()) {
        add_segment(segments, "self_evaluation", strip_html_resume(resume["selfEvaluation"].get<std::string>()));
    }

    if (resume.contains("education_entries") && resume["education_entries"].is_array()) {
        std::size_t i = 0;
        for (const auto& item : resume["education_entries"]) {
            if (!item.is_object()) {
                ++i;
                continue;
            }
            std::string html;
            if (item.contains("html") && item["html"].is_string()) {
                html = item["html"].get<std::string>();
            }
            add_segment(segments, "education." + std::to_string(i) + ".text", strip_html_resume(html));
            ++i;
        }
    } else if (resume.contains("education")) {
        if (resume["education"].is_object()) {
            const auto& ed = resume["education"];
            add_segment(segments, "education.school", ed.value("school", ""));
            add_segment(segments, "education.major", ed.value("major", ""));
            add_segment(segments, "education.date", ed.value("date", ""));
        } else if (resume["education"].is_string()) {
            add_segment(segments, "education.0.text", strip_html_resume(resume["education"].get<std::string>()));
        }
    }

    if (resume.contains("campus_experience_entries") && resume["campus_experience_entries"].is_array()) {
        std::size_t i = 0;
        for (const auto& item : resume["campus_experience_entries"]) {
            if (!item.is_object()) {
                ++i;
                continue;
            }
            std::string html;
            if (item.contains("html") && item["html"].is_string()) {
                html = item["html"].get<std::string>();
            }
            add_segment(segments, "campus." + std::to_string(i) + ".text", strip_html_resume(html));
            ++i;
        }
    } else if (resume.contains("campus_experience") && resume["campus_experience"].is_string()) {
        add_segment(segments, "campus.0.text", strip_html_resume(resume["campus_experience"].get<std::string>()));
    } else if (resume.contains("campus") && resume["campus"].is_array()) {
        std::size_t i = 0;
        for (const auto& item : resume["campus"]) {
            if (!item.is_object()) {
                ++i;
                continue;
            }
            const std::string p = "campus." + std::to_string(i) + ".";
            add_segment(segments, p + "title", item.value("title", ""));
            add_segment(segments, p + "description", item.value("description", ""));
            add_segment(segments, p + "date", item.value("date", ""));
            ++i;
        }
    }

    if (resume.contains("work_experience_entries") && resume["work_experience_entries"].is_array()) {
        std::size_t i = 0;
        for (const auto& item : resume["work_experience_entries"]) {
            if (!item.is_object()) {
                ++i;
                continue;
            }
            std::string html;
            if (item.contains("html") && item["html"].is_string()) {
                html = item["html"].get<std::string>();
            }
            add_segment(segments, "work." + std::to_string(i) + ".text", strip_html_resume(html));
            ++i;
        }
    } else if (resume.contains("work_experience") && resume["work_experience"].is_string()) {
        add_segment(segments, "work.0.text", strip_html_resume(resume["work_experience"].get<std::string>()));
    }

    if (resume.contains("project_experience_entries") && resume["project_experience_entries"].is_array()) {
        std::size_t i = 0;
        for (const auto& item : resume["project_experience_entries"]) {
            if (!item.is_object()) {
                ++i;
                continue;
            }
            std::string html;
            if (item.contains("html") && item["html"].is_string()) {
                html = item["html"].get<std::string>();
            }
            add_segment(segments, "project." + std::to_string(i) + ".text", strip_html_resume(html));
            ++i;
        }
    } else if (resume.contains("projects") && resume["projects"].is_array()) {
        std::size_t i = 0;
        for (const auto& p : resume["projects"]) {
            if (!p.is_object()) {
                ++i;
                continue;
            }
            const std::string pref = "projects." + std::to_string(i) + ".";
            add_segment(segments, pref + "name", p.value("name", ""));
            add_segment(segments, pref + "date", p.value("date", ""));
            add_segment(segments, pref + "description", p.value("description", ""));
            if (p.contains("highlights") && p["highlights"].is_array()) {
                std::ostringstream hs;
                for (std::size_t j = 0; j < p["highlights"].size(); ++j) {
                    if (j > 0) {
                        hs << '\n';
                    }
                    if (p["highlights"][j].is_string()) {
                        hs << p["highlights"][j].get<std::string>();
                    }
                }
                add_segment(segments, pref + "highlights_text", hs.str());
            }
            ++i;
        }
    } else if (resume.contains("project_experience") && resume["project_experience"].is_string()) {
        add_segment(segments, "project.0.text", strip_html_resume(resume["project_experience"].get<std::string>()));
    }

    append_skills_from_items(segments, resume);

    auto has_skills_joined_fn = [&segments]() {
        for (const auto& s : segments) {
            if (s.is_object() && s.contains("id") && s["id"] == "skills.joined") {
                return true;
            }
        }
        return false;
    };

    if (!has_skills_joined_fn() && resume.contains("skills") && resume["skills"].is_array()) {
        std::ostringstream oss;
        for (std::size_t i = 0; i < resume["skills"].size(); ++i) {
            if (i > 0) {
                oss << "\u3001";
            }
            if (resume["skills"][i].is_string()) {
                oss << resume["skills"][i].get<std::string>();
            }
        }
        add_segment(segments, "skills.joined", oss.str());
    }
    if (!has_skills_joined_fn() && resume.contains("skills") && resume["skills"].is_string()) {
        add_segment(segments, "skills.joined", strip_html_resume(resume["skills"].get<std::string>()));
    }
    if (!has_skills_joined_fn() && resume.contains("skill") && resume["skill"].is_string()) {
        add_segment(segments, "skills.joined", strip_html_resume(resume["skill"].get<std::string>()));
    }

    std::string certs_joined;
    if (resume.contains("certificates") && resume["certificates"].is_array()) {
        std::ostringstream oc;
        bool first_c = true;
        for (const auto& c : resume["certificates"]) {
            if (!c.is_string()) {
                continue;
            }
            const std::string t = trim_ws(c.get<std::string>());
            if (t.empty()) {
                continue;
            }
            if (!first_c) {
                oc << "\u3001";
            }
            first_c = false;
            oc << t;
        }
        certs_joined = oc.str();
    }
    if (certs_joined.empty() && resume.contains("certificate")) {
        if (resume["certificate"].is_string()) {
            certs_joined = trim_ws(resume["certificate"].get<std::string>());
        } else if (resume["certificate"].is_array()) {
            std::ostringstream oc;
            bool first_c = true;
            for (const auto& c : resume["certificate"]) {
                if (!c.is_string()) {
                    continue;
                }
                const std::string t = trim_ws(c.get<std::string>());
                if (t.empty()) {
                    continue;
                }
                if (!first_c) {
                    oc << "\u3001";
                }
                first_c = false;
                oc << t;
            }
            certs_joined = oc.str();
        }
    }
    add_segment(segments, "head.certificates_text", certs_joined);

    std::string major_disp;
    if (resume.contains("education") && resume["education"].is_object()) {
        const auto& ed = resume["education"];
        if (ed.contains("major") && ed["major"].is_string()) {
            major_disp = trim_ws(ed["major"].get<std::string>());
        }
    }
    if (major_disp.empty() && resume.contains("majorName") && resume["majorName"].is_string()) {
        major_disp = trim_ws(resume["majorName"].get<std::string>());
    }
    if (major_disp.empty() && resume.contains("major_name") && resume["major_name"].is_string()) {
        major_disp = trim_ws(resume["major_name"].get<std::string>());
    }
    if (major_disp.empty() && resume.contains("major") && resume["major"].is_string()) {
        major_disp = trim_ws(resume["major"].get<std::string>());
    }
    add_segment(segments, "head.major_text", major_disp);

    add_segment(segments, "title_line", resume.value("title_line", ""));

    return segments;
}
