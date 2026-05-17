package com.offercat.galaxy.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.offercat.galaxy.dto.RecommendResponse;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * 「推荐下一步」Java 实现（默认启用，不依赖 Python）。
 *
 * <p>算法（与 Python 占位服务同构，可独立运行）：
 * <ol>
 *   <li><b>静态候选池</b>：读取 classpath {@code recommend.json} 中的编辑/运营配置列表。</li>
 *   <li><b>图邻接增强</b>：在 {@code edges.json} 无向邻接表上对 {@code selectedNodeId} 做
 *       <b>1-hop 邻居扫描</b>；若存在尚未入榜且 id 以 {@code fusion_} 开头的融合节点，则
 *       <b>插入队首</b>（优先展示与当前选中点直接相连的交叉岗）。</li>
 *   <li><b>去重 + 截断</b>：按 nodeId 去重，最多返回 8 条。</li>
 * </ol>
 * 图最短路（BFS）在 {@link GalaxyPathShortestService}；本推荐不做多跳路径排序，仅 1-hop。
 */
@Service
@RequiredArgsConstructor
public class GalaxyRecommendService {

    private static final int MAX_SUGGESTIONS = 8;

    private final GalaxyGraphDataService graphData;
    private final ObjectMapper objectMapper;

    public RecommendResponse recommend(String selectedNodeId) throws Exception {
        JsonNode base = objectMapper.readTree(graphData.recommend());
        List<RecommendResponse.Suggestion> suggestions = new ArrayList<>();
        if (base.has("suggestions") && base.get("suggestions").isArray()) {
            for (JsonNode n : base.get("suggestions")) {
                if (!n.has("nodeId")) {
                    continue;
                }
                String nodeId = n.get("nodeId").asText();
                String reason = n.has("reason") ? n.get("reason").asText() : "";
                suggestions.add(new RecommendResponse.Suggestion(nodeId, reason));
            }
        }

        String selected = selectedNodeId == null ? "" : selectedNodeId.trim();
        if (!selected.isEmpty()) {
            String fusionNeighbor = findFirstFusionNeighbor(selected);
            if (fusionNeighbor != null && suggestions.stream().noneMatch(s -> fusionNeighbor.equals(s.getNodeId()))) {
                suggestions.add(
                        0,
                        new RecommendResponse.Suggestion(
                                fusionNeighbor,
                                "与当前选中节点「" + selected + "」在星图上直接相邻（1-hop 图邻接）"));
            }
        }

        List<RecommendResponse.Suggestion> deduped = dedupeCap(suggestions);
        return new RecommendResponse(
                deduped,
                "galaxy-java-recommend",
                "static-pool + 1-hop-graph-neighbor");
    }

    private String findFirstFusionNeighbor(String selected) {
        JsonNode edges = graphData.edgesArray();
        if (edges == null || !edges.isArray()) {
            return null;
        }
        Set<String> neighbors = new LinkedHashSet<>();
        for (JsonNode e : edges) {
            if (!e.has("u") || !e.has("v")) {
                continue;
            }
            String u = e.get("u").asText();
            String v = e.get("v").asText();
            if (selected.equals(u)) {
                neighbors.add(v);
            } else if (selected.equals(v)) {
                neighbors.add(u);
            }
        }
        return neighbors.stream()
                .filter(id -> id.startsWith("fusion_"))
                .sorted()
                .findFirst()
                .orElse(null);
    }

    private static List<RecommendResponse.Suggestion> dedupeCap(List<RecommendResponse.Suggestion> in) {
        Set<String> seen = new LinkedHashSet<>();
        List<RecommendResponse.Suggestion> out = new ArrayList<>();
        for (RecommendResponse.Suggestion s : in) {
            if (s.getNodeId() == null || s.getNodeId().isBlank()) {
                continue;
            }
            if (seen.add(s.getNodeId())) {
                out.add(s);
            }
            if (out.size() >= MAX_SUGGESTIONS) {
                break;
            }
        }
        return out;
    }
}
