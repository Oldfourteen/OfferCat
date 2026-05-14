package com.offercat.galaxy.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/** 无 C++ 时的无向图最短路（与 H5 shortestPathUndirected 一致）。 */
@Service
@RequiredArgsConstructor
public class GalaxyPathShortestService {

    private final GalaxyGraphDataService graphData;
    private final ObjectMapper objectMapper;

    public ObjectNode shortest(String fromId, String toId) {
        JsonNode edges = graphData.edgesArray();
        Map<String, List<String>> adj = new HashMap<>();
        if (edges != null && edges.isArray()) {
            for (JsonNode e : edges) {
                if (!e.has("u") || !e.has("v")) {
                    continue;
                }
                String u = e.get("u").asText();
                String v = e.get("v").asText();
                if (u.isEmpty() || v.isEmpty()) {
                    continue;
                }
                adj.computeIfAbsent(u, k -> new ArrayList<>()).add(v);
                adj.computeIfAbsent(v, k -> new ArrayList<>()).add(u);
            }
        }
        ObjectNode out = objectMapper.createObjectNode();
        out.put("fromId", fromId);
        out.put("toId", toId);
        if (fromId.equals(toId)) {
            out.put("found", true);
            ArrayNode one = objectMapper.createArrayNode();
            one.add(fromId);
            out.set("nodeIds", one);
            return out;
        }
        if (!adj.containsKey(fromId) || !adj.containsKey(toId)) {
            out.put("found", false);
            out.set("nodeIds", null);
            return out;
        }
        Queue<String> q = new ArrayDeque<>();
        Map<String, String> parent = new HashMap<>();
        Set<String> vis = new HashSet<>();
        q.add(fromId);
        vis.add(fromId);
        boolean found = false;
        while (!q.isEmpty()) {
            String cur = q.poll();
            if (cur.equals(toId)) {
                found = true;
                break;
            }
            for (String nx : adj.getOrDefault(cur, List.of())) {
                if (vis.add(nx)) {
                    parent.put(nx, cur);
                    q.add(nx);
                }
            }
        }
        if (!found) {
            out.put("found", false);
            out.set("nodeIds", null);
            return out;
        }
        List<String> rev = new ArrayList<>();
        String at = toId;
        rev.add(at);
        while (!at.equals(fromId)) {
            String p = parent.get(at);
            if (p == null) {
                out.put("found", false);
                out.set("nodeIds", null);
                return out;
            }
            at = p;
            rev.add(at);
        }
        Collections.reverse(rev);
        ArrayNode arr = objectMapper.createArrayNode();
        for (String id : rev) {
            arr.add(id);
        }
        out.put("found", true);
        out.set("nodeIds", arr);
        return out;
    }
}
