#pragma once

#include "nlohmann/json.hpp"

nlohmann::json extract_resume_segments(const nlohmann::json& resume);
