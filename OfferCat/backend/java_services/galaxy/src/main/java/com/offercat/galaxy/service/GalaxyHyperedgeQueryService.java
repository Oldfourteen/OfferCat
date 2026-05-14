package com.offercat.galaxy.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * 内存超边查询（与文档「Java 直查倒排」一致，后续可换调 C++ graph 服务）。
 */
@Service
@RequiredArgsConstructor
public class GalaxyHyperedgeQueryService {

    private final GalaxyGraphDataService graphData;
    private final ObjectMapper objectMapper;

    public ObjectNode containing(String nodeId) {
        JsonNode arr = graphData.hyperedgesArray();
        List<JsonNode> hits = new ArrayList<>();
        if (arr != null && arr.isArray()) {
            for (JsonNode he : arr) {
                JsonNode members = he.get("member_node_ids");
                if (members == null || !members.isArray()) {
                    continue;
                }
                for (JsonNode m : members) {
                    if (nodeId.equals(m.asText())) {
                        hits.add(he);
                        break;
                    }
                }
            }
        }

        ArrayNode hyperedgesOut = objectMapper.createArrayNode();
        ObjectNode membersByHyperedge = objectMapper.createObjectNode();
        List<String> allMemberIds = new ArrayList<>();
        Map<String, Boolean> dedup = new LinkedHashMap<>();

        for (JsonNode he : hits) {
            hyperedgesOut.add(he);
            String hid = he.get("id").asText();
            ArrayNode memberArr = objectMapper.createArrayNode();
            JsonNode members = he.get("member_node_ids");
            if (members != null && members.isArray()) {
                for (JsonNode m : members) {
                    String mid = m.asText();
                    memberArr.add(mid);
                    dedup.putIfAbsent(mid, Boolean.TRUE);
                }
            }
            membersByHyperedge.set(hid, memberArr);
        }

        for (String k : dedup.keySet()) {
            allMemberIds.add(k);
        }

        ObjectNode root = objectMapper.createObjectNode();
        root.set("hyperedges", hyperedgesOut);
        root.set("membersByHyperedge", membersByHyperedge);
        root.put("nodeId", nodeId);
        root.set("memberNodeIds", toArray(allMemberIds));
        return root;
    }

    private ArrayNode toArray(List<String> ids) {
        ArrayNode a = objectMapper.createArrayNode();
        for (String id : ids) {
            a.add(id);
        }
        return a;
    }
}
