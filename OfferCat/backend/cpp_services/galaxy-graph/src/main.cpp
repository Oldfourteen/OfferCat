#ifdef _WIN32
/*
 * 星图图查询 C++ 服务（与 resume-pdf C++ 默认端口 22570 错开，本服务默认 22571，见 GALAXY_GRAPH_PORT）。
 * 头文件：通过 CMake 引入 ../resume-pdf 中的 httplib.h、nlohmann/json.hpp，本目录不重复存放。
 */
#ifndef WIN32_LEAN_AND_MEAN
#define WIN32_LEAN_AND_MEAN
#endif
#define _WIN32_WINNT 0x0A00
#include <winsock2.h>
#include <ws2tcpip.h>
#include <windows.h>
#endif

#include "httplib.h"
#include "nlohmann/json.hpp"

#include <algorithm>
#include <cstdlib>
#include <fstream>
#include <iostream>
#include <queue>
#include <sstream>
#include <unordered_map>
#include <unordered_set>
#include <vector>

using json = nlohmann::json;

static std::string data_dir() {
    const char *d = std::getenv("GALAXY_DATA_DIR");
    if (d && *d) {
        std::string s(d);
        while (!s.empty() && (s.back() == '/' || s.back() == '\\')) {
            s.pop_back();
        }
        return s;
    }
    return "data";
}

static json read_json_file(const std::string &path) {
    std::ifstream f(path, std::ios::binary);
    if (!f) {
        throw std::runtime_error("cannot open: " + path);
    }
    std::stringstream buf;
    buf << f.rdbuf();
    return json::parse(buf.str());
}

static json hyperedges_containing(const json &hyperedges, const std::string &node_id) {
    json hits = json::array();
    if (!hyperedges.is_array()) {
        return json{{"hyperedges", hits},
                    {"membersByHyperedge", json::object()},
                    {"nodeId", node_id},
                    {"memberNodeIds", json::array()}};
    }
    for (const auto &he : hyperedges) {
        const auto &mem = he["member_node_ids"];
        if (!mem.is_array()) {
            continue;
        }
        for (const auto &m : mem) {
            if (m.is_string() && m.get<std::string>() == node_id) {
                hits.push_back(he);
                break;
            }
        }
    }
    json members_by = json::object();
    std::vector<std::string> all;
    std::unordered_set<std::string> dedup;
    for (const auto &he : hits) {
        std::string hid = he["id"].get<std::string>();
        json arr = json::array();
        for (const auto &m : he["member_node_ids"]) {
            if (!m.is_string()) {
                continue;
            }
            std::string mid = m.get<std::string>();
            arr.push_back(mid);
            if (dedup.insert(mid).second) {
                all.push_back(mid);
            }
        }
        members_by[hid] = std::move(arr);
    }
    json mids = json::array();
    for (const auto &id : all) {
        mids.push_back(id);
    }
    return json{{"hyperedges", std::move(hits)},
                {"membersByHyperedge", std::move(members_by)},
                {"nodeId", node_id},
                {"memberNodeIds", std::move(mids)}};
}

static void build_adj(const json &edges,
                        std::unordered_map<std::string, std::vector<std::string>> &adj) {
    if (!edges.is_array()) {
        return;
    }
    for (const auto &e : edges) {
        if (!e.contains("u") || !e.contains("v")) {
            continue;
        }
        std::string u = e["u"].get<std::string>();
        std::string v = e["v"].get<std::string>();
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
}

static json shortest_path_nodes(const json &edges, const std::string &from_id, const std::string &to_id) {
    std::unordered_map<std::string, std::vector<std::string>> adj;
    build_adj(edges, adj);
    if (from_id == to_id) {
        return json{{"fromId", from_id}, {"toId", to_id}, {"found", true}, {"nodeIds", json::array({from_id})}};
    }
    if (adj.find(from_id) == adj.end() || adj.find(to_id) == adj.end()) {
        return json{{"fromId", from_id}, {"toId", to_id}, {"found", false}, {"nodeIds", nullptr}};
    }
    std::queue<std::string> q;
    std::unordered_map<std::string, std::string> parent;
    std::unordered_set<std::string> vis;
    q.push(from_id);
    vis.insert(from_id);
    bool found = false;
    while (!q.empty()) {
        std::string cur = q.front();
        q.pop();
        if (cur == to_id) {
            found = true;
            break;
        }
        for (const auto &nx : adj[cur]) {
            if (vis.insert(nx).second) {
                parent[nx] = cur;
                q.push(nx);
            }
        }
    }
    if (!found) {
        return json{{"fromId", from_id}, {"toId", to_id}, {"found", false}, {"nodeIds", nullptr}};
    }
    std::vector<std::string> rev;
    std::string at = to_id;
    rev.push_back(at);
    while (at != from_id) {
        auto it = parent.find(at);
        if (it == parent.end()) {
            return json{{"fromId", from_id}, {"toId", to_id}, {"found", false}, {"nodeIds", nullptr}};
        }
        at = it->second;
        rev.push_back(at);
    }
    std::reverse(rev.begin(), rev.end());
    json arr = json::array();
    for (const auto &id : rev) {
        arr.push_back(id);
    }
    return json{{"fromId", from_id}, {"toId", to_id}, {"found", true}, {"nodeIds", std::move(arr)}};
}

int main(int argc, char **argv) {
    (void)argc;
    (void)argv;
    const std::string dir = data_dir();
    json hyperedges;
    json edges;
    try {
        hyperedges = read_json_file(dir + "/hyperedges.json");
        edges = read_json_file(dir + "/edges.json");
    } catch (const std::exception &ex) {
        std::cerr << "[galaxy-graph] load failed: " << ex.what() << "\n";
        std::cerr << "Set GALAXY_DATA_DIR to directory containing hyperedges.json and edges.json\n";
        return 1;
    }

    httplib::Server svr;

    svr.Post("/galaxy/hyperedges/containing", [&](const httplib::Request &req, httplib::Response &res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Content-Type", "application/json; charset=utf-8");
        try {
            auto body = json::parse(req.body);
            std::string node_id = body.value("nodeId", body.value("node_id", ""));
            if (node_id.empty()) {
                res.status = 400;
                res.body = R"({"error":"nodeId required"})";
                return;
            }
            json out = hyperedges_containing(hyperedges, node_id);
            res.body = out.dump();
        } catch (const std::exception &ex) {
            res.status = 500;
            res.body = json{{"error", ex.what()}}.dump();
        }
    });

    svr.Post("/galaxy/path/shortest", [&](const httplib::Request &req, httplib::Response &res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Content-Type", "application/json; charset=utf-8");
        try {
            auto body = json::parse(req.body);
            std::string from_id = body.value("fromId", body.value("from_id", ""));
            std::string to_id = body.value("toId", body.value("to_id", ""));
            if (from_id.empty() || to_id.empty()) {
                res.status = 400;
                res.body = R"({"error":"fromId and toId required"})";
                return;
            }
            json out = shortest_path_nodes(edges, from_id, to_id);
            res.body = out.dump();
        } catch (const std::exception &ex) {
            res.status = 500;
            res.body = json{{"error", ex.what()}}.dump();
        }
    });

    const char *port_env = std::getenv("GALAXY_GRAPH_PORT");
    int port = port_env ? std::atoi(port_env) : 22571;

    std::cout << "[galaxy-graph] data_dir=" << dir << " port=" << port << "\n";
    if (!svr.listen("0.0.0.0", port)) {
        std::cerr << "[galaxy-graph] listen failed on " << port << "\n";
        return 2;
    }
    return 0;
}
