#include "highlight_engine.hpp"

#include <algorithm>
#include <array>
#include <cctype>
#include <cstdlib>
#include <queue>
#include <string>
#include <vector>

struct Candidate {
    std::size_t start{};
    std::size_t end{};
    std::string word;
};

static bool disjoint(const Utf8Span& a, const Utf8Span& b) {
    return a.end <= b.start || a.start >= b.end;
}

static bool env_flag_ac() {
    const char* e = std::getenv("RESUME_PDF_AC");
    if (!e || !e[0]) {
        return false;
    }
    std::string s;
    for (const char* p = e; *p; ++p) {
        s.push_back(static_cast<char>(std::tolower(static_cast<unsigned char>(*p))));
    }
    return s == "1" || s == "true" || s == "yes" || s == "on";
}

static bool resolve_use_ac(std::optional<bool> use_ac_automaton) {
    if (use_ac_automaton.has_value()) {
        return *use_ac_automaton;
    }
    return env_flag_ac();
}

const char* resume_pdf_highlight_engine_label() {
    return env_flag_ac() ? "ac" : "naive";
}

static std::vector<Candidate> collect_candidates_naive(const std::string& text,
                                                       const std::vector<std::string>& keywords) {
    std::vector<Candidate> all;
    for (const auto& kw : keywords) {
        if (kw.empty()) {
            continue;
        }
        std::size_t pos = 0;
        while (true) {
            const std::size_t idx = text.find(kw, pos);
            if (idx == std::string::npos) {
                break;
            }
            all.push_back(Candidate{idx, idx + kw.size(), kw});
            pos = idx + 1;
        }
    }
    return all;
}

namespace {

struct AcNode {
    std::array<int, 256> next{};
    int fail = 0;
    std::vector<int> out;
    AcNode() { next.fill(-1); }
};

/** Aho–Corasick on raw UTF-8 bytes; emits same [start,end) candidates as naive overlapping scan. */
static std::vector<Candidate> collect_candidates_ac(const std::string& text,
                                                    const std::vector<std::string>& keywords) {
    std::vector<Candidate> all;
    std::vector<AcNode> trie(1);
    for (std::size_t ki = 0; ki < keywords.size(); ++ki) {
        const auto& kw = keywords[ki];
        if (kw.empty()) {
            continue;
        }
        int node = 0;
        for (unsigned char uc : kw) {
            if (trie[static_cast<std::size_t>(node)].next[uc] == -1) {
                trie[static_cast<std::size_t>(node)].next[uc] = static_cast<int>(trie.size());
                trie.emplace_back();
            }
            node = trie[static_cast<std::size_t>(node)].next[uc];
        }
        trie[static_cast<std::size_t>(node)].out.push_back(static_cast<int>(ki));
    }

    std::queue<int> q;
    for (int c = 0; c < 256; ++c) {
        if (trie[0].next[static_cast<std::size_t>(c)] != -1) {
            const int s = trie[0].next[static_cast<std::size_t>(c)];
            trie[static_cast<std::size_t>(s)].fail = 0;
            q.push(s);
        }
    }
    while (!q.empty()) {
        const int r = q.front();
        q.pop();
        for (int c = 0; c < 256; ++c) {
            if (trie[static_cast<std::size_t>(r)].next[static_cast<std::size_t>(c)] == -1) {
                continue;
            }
            const int s = trie[static_cast<std::size_t>(r)].next[static_cast<std::size_t>(c)];
            q.push(s);
            int f = trie[static_cast<std::size_t>(r)].fail;
            while (f != 0 && trie[static_cast<std::size_t>(f)].next[static_cast<std::size_t>(c)] == -1) {
                f = trie[static_cast<std::size_t>(f)].fail;
            }
            trie[static_cast<std::size_t>(s)].fail =
                trie[static_cast<std::size_t>(f)].next[static_cast<std::size_t>(c)] != -1
                    ? trie[static_cast<std::size_t>(f)].next[static_cast<std::size_t>(c)]
                    : 0;
        }
    }

    int state = 0;
    for (std::size_t i = 0; i < text.size(); ++i) {
        const unsigned char bc = static_cast<unsigned char>(text[i]);
        while (state != 0 && trie[static_cast<std::size_t>(state)].next[bc] == -1) {
            state = trie[static_cast<std::size_t>(state)].fail;
        }
        if (trie[static_cast<std::size_t>(state)].next[bc] != -1) {
            state = trie[static_cast<std::size_t>(state)].next[bc];
        }

        int temp = state;
        while (true) {
            for (int pid : trie[static_cast<std::size_t>(temp)].out) {
                if (pid < 0 || static_cast<std::size_t>(pid) >= keywords.size()) {
                    continue;
                }
                const auto& pat = keywords[static_cast<std::size_t>(pid)];
                const std::size_t end = i + 1;
                const std::size_t start = end - pat.size();
                all.push_back(Candidate{start, end, pat});
            }
            if (temp == 0) {
                break;
            }
            temp = trie[static_cast<std::size_t>(temp)].fail;
        }
    }
    return all;
}

} // namespace

static std::vector<Utf8Span> merge_non_overlapping(std::vector<Candidate> all) {
    std::sort(all.begin(), all.end(), [](const Candidate& a, const Candidate& b) {
        if (a.start != b.start) {
            return a.start < b.start;
        }
        return (a.end - a.start) > (b.end - b.start);
    });

    std::vector<Utf8Span> picked;
    for (const auto& c : all) {
        Utf8Span sp{c.start, c.end, c.word};
        bool ok = true;
        for (const auto& p : picked) {
            if (!disjoint(sp, p)) {
                ok = false;
                break;
            }
        }
        if (ok) {
            picked.push_back(sp);
        }
    }

    std::sort(picked.begin(), picked.end(),
              [](const Utf8Span& a, const Utf8Span& b) { return a.start < b.start; });
    return picked;
}

std::vector<Utf8Span> find_spans_utf8(const std::string& text,
                                      const std::vector<std::string>& keywords,
                                      std::optional<bool> use_ac_automaton) {
    std::vector<Candidate> all = resolve_use_ac(use_ac_automaton)
                                     ? collect_candidates_ac(text, keywords)
                                     : collect_candidates_naive(text, keywords);
    return merge_non_overlapping(std::move(all));
}
