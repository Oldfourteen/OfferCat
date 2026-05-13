#pragma once

#include <cstddef>
#include <optional>
#include <string>
#include <vector>

struct Utf8Span {
    std::size_t start{};
    std::size_t end{};
    std::string word;
};

/**
 * 在 UTF-8 原文中按子串匹配关键词，返回不重叠命中区间（字节下标）。
 * 多词命中时：先收集所有 (start,end,word)，按 start 升序、区间长度降序排序，再贪心去掉重叠。
 *
 * 收集阶段二选一（输出经同一套 merge，便于对比/回归）：
 * - 默认：逐词 std::string::find（朴素多模式）
 * - 环境变量 RESUME_PDF_AC=1|true|yes|on：Aho–Corasick 在 UTF-8 字节流上扫一遍，复杂度 O(n + z + m)
 *
 * use_ac_automaton：nullopt 时按 RESUME_PDF_AC；true/false 时强制 AC / 朴素（HTTP 请求级覆盖）。
 */
std::vector<Utf8Span> find_spans_utf8(const std::string& text,
                                      const std::vector<std::string>& keywords,
                                      std::optional<bool> use_ac_automaton = std::nullopt);

/** 请求体未指定引擎时使用的默认：与 RESUME_PDF_AC 一致。用于 /health 等。 */
const char* resume_pdf_highlight_engine_label();
