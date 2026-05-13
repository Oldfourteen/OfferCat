#pragma once

#include "nlohmann/json.hpp"

#include <string>
#include <vector>

/**
 * 解析 RESUME_PDF_KEYWORDS_DIR；否则在 exe 路径向上查找含 major_file_map.json 的 keywords/；
 * 再否则使用当前工作目录下的 keywords/。
 */
std::string resolve_keywords_directory_string();

/**
 * 从请求 JSON 的 keywords 数组 + 可选的专业名对应 txt 词表合并去重。
 * include_major_dictionary 为 false 时（「朴素」按钮）仅保留请求中的词，不加载 major_file_map 词表。
 */
std::vector<std::string> merge_resume_keywords(const nlohmann::json& resume,
                                                const nlohmann::json& request,
                                                const std::vector<std::string>& json_keywords,
                                                bool include_major_dictionary = true);
