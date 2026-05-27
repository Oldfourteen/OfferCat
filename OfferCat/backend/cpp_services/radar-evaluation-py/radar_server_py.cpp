#define _WIN32_WINNT 0x0A00
#include "httplib_new.h"
#include "nlohmann/json.hpp"
#include <iostream>
#include <array>
#include <vector>
#include <string>
using namespace std;

const int dimensions = 7;
using json = nlohmann::json;

struct question {
    int A[dimensions];
    int B[dimensions];
    int C[dimensions];
    int D[dimensions];
};
question questionScores[40];

void questionScores_initialize();

bool check(const string& ans_str) {
    // 有效性检测（与原来一致）
    if (ans_str[39] == 'C' || ans_str[39] == 'D') return false;
    if (ans_str[36] != 'C') return false;
    if (ans_str[37] != ans_str[16]) return false;
    return true;
}

int main() {
    questionScores_initialize();
    httplib::Server svr;

    svr.Post("/radar", [](const httplib::Request& req, httplib::Response& res) {
        // 1. 解析 JSON
        json j;
        try {
            j = json::parse(req.body);
        } catch (const exception& e) {
            res.status = 400;
            res.set_content(R"({"error":"Invalid JSON"})", "application/json");
            return;
        }

        // 2. 检查 answers 字段
        if (!j.contains("answers") || !j["answers"].is_array()) {
            res.status = 400;
            res.set_content(R"({"error":"Missing or invalid 'answers' field"})", "application/json");
            return;
        }

        // 3. 转换为字符串
        string ans_str;
        for (const auto& answer : j["answers"]) {
            ans_str += answer.get<string>();
        }
        if (ans_str.size() != 40) {
            res.status = 400;
            res.set_content(R"({"error":"answers array must have 40 elements"})", "application/json");
            return;
        }

        // 4. 累加七维分数
        vector<int> full_scores(7, 0);
        for (int i = 0; i < 40; ++i) {
            char opt = ans_str[i];
            const int* scores = nullptr;
            switch (opt) {
                case 'A': scores = questionScores[i].A; break;
                case 'B': scores = questionScores[i].B; break;
                case 'C': scores = questionScores[i].C; break;
                case 'D': scores = questionScores[i].D; break;
                default: continue;
            }
            for (int d = 0; d < 7; ++d) full_scores[d] += scores[d];
        }

        // 5. 有效性检测
        bool valid = check(ans_str);

        // 6. 返回 JSON (只包含 valid 和 full_scores)
        json response;
        response["valid"] = valid;
        response["full_scores"] = full_scores;
        res.set_content(response.dump(), "application/json");
    });

    cout << "C++ internal server listening on port 22566" << endl;
    svr.listen("localhost", 22566);   // 使用不同端口，避免与原有服务冲突
    return 0;
}

	
void questionScores_initialize(){
    // 1
    questionScores[0]={ {8,4,2,6,0,2,2}, {4,2,0,3,0,0,0}, {0,0,0,-2,-1,-2,-2}, {-6,-4,-2,-5,-2,-4,-3} };
    // 2
    questionScores[1]={ {6,4,2,2,3,3,4}, {3,2,1,1,1,1,2}, {0,0,0,0,-1,0,-1}, {-5,-3,-2,-2,-3,-2,-4} };
    // 3
    questionScores[2]={ {5,2,1,0,2,6,2}, {2,0,0,0,0,3,0}, {0,-1,0,0,-1,-1,-2}, {-3,-2,-2,-1,-2,-5,-3} };
    // 4
    questionScores[3]={ {3,2,0,1,5,2,1}, {1,0,0,0,2,0,0}, {0,-1,0,0,-1,-1,-1}, {-2,-2,0,-1,-4,-2,-2} };
    // 5
    questionScores[4]={ {2,2,0,0,3,6,1}, {1,0,0,0,1,3,0}, {0,0,0,0,0,1,0}, {-2,-1,-1,0,-2,-4,-2} };
    // 6
    questionScores[5]={ {4,1,2,8,0,1,2}, {2,0,0,4,0,0,0}, {0,0,0,0,-1,-1,-1}, {-4,-2,-2,-6,-2,-2,-3} };
    // 7
    questionScores[6]={ {2,1,0,3,1,0,2}, {-2,-1,0,-2,-1,-1,-1}, {-5,-2,-1,-4,-2,-2,-3}, {-8,-4,-2,-6,-3,-3,-5} };
    // 8
    questionScores[7]={ {5,2,6,4,1,2,2}, {3,1,4,2,0,1,1}, {1,0,2,1,0,0,0}, {0,0,0,-1,-1,-1,-1} };
    // 9
    questionScores[8]={ {3,8,1,2,4,6,4}, {2,6,0,1,2,4,2}, {0,2,0,0,1,1,0}, {-3,-6,-2,-2,-3,-5,-3} };
    // 10
    questionScores[9]={ {4,6,2,0,2,2,3}, {2,4,1,0,1,1,2}, {0,2,0,0,0,0,0}, {-4,-6,-2,-1,-2,-2,-3} };
    // 11
    questionScores[10]={ {2,6,1,0,6,2,5}, {3,4,0,0,2,1,3}, {0,2,0,0,0,0,0}, {-2,-4,-2,0,-3,-2,-3} };
    // 12
    questionScores[11]={ {2,7,1,0,2,5,3}, {1,4,0,0,1,2,1}, {0,1,0,0,0,0,0}, {-2,-4,-1,0,-2,-3,-2} };
    // 13
    questionScores[12]={ {1,4,0,0,6,2,3}, {0,2,0,0,3,1,1}, {0,0,0,0,1,0,0}, {-2,-2,-1,0,-4,-1,-2} };
    // 14
    questionScores[13]={ {4,7,3,1,2,3,4}, {2,4,1,0,1,1,2}, {0,2,0,0,0,0,0}, {-3,-5,-2,-1,-2,-2,-3} };
    // 15
    questionScores[14]={ {5,6,1,0,1,4,2}, {2,3,0,0,0,2,1}, {0,0,0,0,0,0,0}, {-3,-4,-1,0,-1,-3,-2} };
    // 16
    questionScores[15]={ {2,5,0,0,3,5,4}, {1,1,0,0,1,2,2}, {0,-1,0,0,-1,-1,-1}, {-2,-4,-1,0,-3,-4,-3} };
    // 17
    questionScores[16]={ {4,3,8,2,2,3,3}, {2,2,5,1,1,2,2}, {1,1,2,0,0,1,1}, {-2,-2,-4,-1,-2,-2,-2} };
    // 18
    questionScores[17]={ {5,4,7,2,0,5,3}, {3,2,4,1,0,3,2}, {1,1,2,0,0,1,1}, {-2,-2,-3,-1,-1,-3,-2} };
    // 19
    questionScores[18]={ {4,5,7,3,2,4,4}, {2,3,4,1,1,2,2}, {0,1,1,0,0,1,1}, {-2,-3,-3,-1,-2,-2,-2} };
    // 20
    questionScores[19]={ {1,2,4,1,5,2,3}, {0,1,2,0,3,1,2}, {0,0,1,0,1,0,1}, {-1,-1,-2,0,-3,-1,-2} };
    // 21
    questionScores[20]={ {3,3,2,0,1,3,2}, {1,1,1,0,0,1,1}, {0,0,0,0,0,0,0}, {-2,-2,-1,0,-1,-2,-2} };
    // 22
    questionScores[21]={ {4,5,8,2,1,3,3}, {2,3,5,1,0,2,2}, {1,1,2,0,0,1,1}, {-2,-2,-3,-1,-1,-2,-2} };
    // 23
    questionScores[22]={ {1,2,0,0,8,2,2}, {0,1,0,0,4,0,1}, {-1,0,0,0,-2,-1,-2}, {-3,-2,0,0,-6,-2,-4} };
    // 24
    questionScores[23]={ {1,3,2,0,7,2,4}, {0,1,1,0,4,0,2}, {0,0,0,0,1,0,0}, {-1,-1,-1,0,-3,-1,-2} };
    // 25
    questionScores[24]={ {1,2,0,0,7,2,1}, {0,0,0,0,3,0,0}, {-1,-1,0,0,-1,-1,-1}, {-3,-3,-1,0,-5,-3,-2} };
    // 26
    questionScores[25]={ {1,1,0,0,6,0,1}, {0,0,0,0,2,0,0}, {0,0,0,0,-1,0,-1}, {-1,-1,0,0,-4,-1,-2} };
    // 27
    questionScores[26]={ {2,3,1,0,2,8,2}, {0,1,0,0,0,4,0}, {-1,0,0,0,-1,0,-1}, {-3,-2,-1,0,-2,-6,-2} };
    // 28
    questionScores[27]={ {1,2,0,0,2,7,4}, {0,0,0,0,0,3,1}, {-1,-1,0,0,-1,-1,-1}, {-3,-2,-1,0,-2,-5,-3} };
    // 29
    questionScores[28]={ {1,3,0,0,2,6,5}, {0,1,0,0,0,2,2}, {-1,0,0,0,-1,-1,-1}, {-3,-2,-1,0,-3,-5,-4} };
    // 30
    questionScores[29]={ {5,3,2,0,3,3,4}, {2,1,1,0,1,1,2}, {0,-1,0,0,-1,-1,-1}, {-5,-4,-2,-1,-4,-4,-5} };
    // 31
    questionScores[30]={ {2,2,0,0,2,0,7}, {0,0,0,0,0,0,3}, {-1,-1,0,0,-1,0,-2}, {-3,-3,-1,0,-3,-1,-6} };
    // 32
    questionScores[31]={ {2,2,1,0,2,1,6}, {0,0,0,0,0,0,2}, {-1,-1,-1,0,-2,0,-2}, {-3,-3,-2,0,-4,-2,-7} };
    // 33
    questionScores[32]={ {3,3,2,1,2,2,7}, {1,1,0,0,0,0,3}, {-1,-1,-1,0,-1,-1,-2}, {-2,-2,-1,0,-2,-2,-4} };
    // 34
    questionScores[33]={ {0,0,0,0,2,0,6}, {0,0,0,0,0,0,2}, {0,0,0,0,-1,0,-1}, {-1,-1,0,0,-2,0,-4} };
    // 35
    questionScores[34]={ {1,2,0,0,0,0,5}, {0,1,0,0,0,0,2}, {-1,-1,0,0,-1,0,-2}, {-2,-2,0,0,-1,0,-3} };
    // 36
    questionScores[35]={ {1,2,0,0,2,0,6}, {0,0,0,0,0,0,2}, {-1,-1,0,0,-1,0,-1}, {-2,-2,0,0,-2,0,-4} };
    // 37
    questionScores[36]={ {0,0,0,0,0,0,0}, {0,0,0,0,0,0,0}, {0,0,0,0,0,0,0}, {0,0,0,0,0,0,0} };
    // 38
    questionScores[37]={ {0,0,0,0,0,0,0}, {0,0,0,0,0,0,0}, {0,0,0,0,0,0,0}, {0,0,0,0,0,0,0} };
    // 39
    questionScores[38]={ {-3,-2,-2,-4,-2,-2,-3}, {-1,-1,-1,-2,-1,-1,-1}, {1,0,0,1,0,0,0}, {2,1,1,2,1,1,2} };
    // 40
    questionScores[39]={ {0,0,0,0,0,0,0}, {0,0,0,0,0,0,0}, {0,0,0,0,0,0,0}, {0,0,0,0,0,0,0} };
}