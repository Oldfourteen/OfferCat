package com.offercat.galaxy.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.offercat.galaxy.dto.HyperedgesContainingRequest;
import com.offercat.galaxy.dto.PathShortestRequest;
import com.offercat.galaxy.integration.GalaxyCppGraphClient;
import com.offercat.galaxy.service.GalaxyGraphDataService;
import com.offercat.galaxy.service.GalaxyHyperedgeQueryService;
import com.offercat.galaxy.service.GalaxyPathShortestService;
import com.offercat.galaxy.service.GalaxyRecommendService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

/**
 * 星图 H5 经网关入口；图查询可走 C++ galaxy-graph，推荐/嵌入/报告可走 Python。
 */
@Slf4j
@RestController
@RequestMapping("/api/galaxy")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class GalaxyApiController {

    private final GalaxyGraphDataService graphData;
    private final GalaxyHyperedgeQueryService hyperedgeQuery;
    private final GalaxyPathShortestService pathShortestService;
    private final GalaxyRecommendService recommendService;
    private final GalaxyCppGraphClient cppGraphClient;
    private final ObjectMapper objectMapper;
    private final RestTemplate galaxyRestTemplate;

    /** 统一 Python 根地址，例如 http://127.0.0.1:15100 */
    @Value("${galaxy.python.base-url:}")
    private String pythonBaseUrl;

    /** 兼容旧配置：仅推荐转发时使用 */
    @Value("${galaxy.python.recommend-base-url:}")
    private String pythonRecommendLegacyUrl;

    @Value("${galaxy.recommend.use-java:true}")
    private boolean recommendUseJava;

    private String pythonRoot() {
        if (pythonBaseUrl != null && !pythonBaseUrl.isBlank()) {
            return pythonBaseUrl.trim().replaceAll("/+$", "");
        }
        if (pythonRecommendLegacyUrl != null && !pythonRecommendLegacyUrl.isBlank()) {
            return pythonRecommendLegacyUrl.trim().replaceAll("/+$", "");
        }
        return "";
    }

    @GetMapping(value = {"/manifest.json", "/manifest"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<byte[]> manifest() {
        return rawJson(graphData.manifest());
    }

    @GetMapping(value = "/nodes.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<byte[]> nodes() {
        return rawJson(graphData.nodes());
    }

    @GetMapping(value = "/edges.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<byte[]> edges() {
        return rawJson(graphData.edges());
    }

    @GetMapping(value = "/hyperedges.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<byte[]> hyperedges() {
        return rawJson(graphData.hyperedgesRaw());
    }

    @GetMapping(value = "/layout.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<byte[]> layout() {
        return rawJson(graphData.layout());
    }

    @GetMapping(value = "/recommend.json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<byte[]> recommendGet(@RequestParam(value = "selectedNodeId", required = false) String selectedNodeId)
            throws Exception {
        return rawJson(recommendBytes(selectedNodeId, null));
    }

    @PostMapping(value = "/recommend", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<byte[]> recommendPost(@RequestBody(required = false) JsonNode body) throws Exception {
        return rawJson(recommendBytes(extractSelectedNodeId(body), body));
    }

    private byte[] recommendBytes(String selectedNodeId, JsonNode body) throws Exception {
        if (recommendUseJava) {
            return objectMapper.writeValueAsBytes(recommendService.recommend(selectedNodeId));
        }
        String root = pythonRoot();
        if (!root.isEmpty()) {
            try {
                byte[] proxied = postPython(root + "/galaxy/recommend", body);
                if (proxied != null) {
                    return proxied;
                }
            } catch (RestClientException ex) {
                log.warn("galaxy recommend python fallback: {}", ex.toString());
            }
        }
        return objectMapper.writeValueAsBytes(recommendService.recommend(selectedNodeId));
    }

    private static String extractSelectedNodeId(JsonNode body) {
        if (body == null) {
            return null;
        }
        if (body.has("selectedNodeId")) {
            return body.get("selectedNodeId").asText(null);
        }
        if (body.has("selected_node_id")) {
            return body.get("selected_node_id").asText(null);
        }
        return null;
    }

    @PostMapping(value = "/embed/neighbors", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<byte[]> embedNeighbors(@RequestBody(required = false) JsonNode body) throws Exception {
        String root = pythonRoot();
        if (root.isEmpty()) {
            return ResponseEntity.status(503).body("{\"error\":\"galaxy.python.base-url not configured\"}".getBytes());
        }
        byte[] proxied = postPython(root + "/galaxy/embed/neighbors", body);
        if (proxied == null) {
            return ResponseEntity.status(502).body("{\"error\":\"python embed failed\"}".getBytes());
        }
        return rawJson(proxied);
    }

    @PostMapping(value = "/report", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<byte[]> report(@RequestBody(required = false) JsonNode body) throws Exception {
        String root = pythonRoot();
        if (root.isEmpty()) {
            return ResponseEntity.status(503).body("{\"error\":\"galaxy.python.base-url not configured\"}".getBytes());
        }
        byte[] proxied = postPython(root + "/galaxy/report", body);
        if (proxied == null) {
            return ResponseEntity.status(502).body("{\"error\":\"python report failed\"}".getBytes());
        }
        return rawJson(proxied);
    }

    @PostMapping(value = "/hyperedges/containing", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<byte[]> containing(@Valid @RequestBody HyperedgesContainingRequest req) throws Exception {
        if (cppGraphClient.isEnabled()) {
            var cpp = cppGraphClient.postContaining(req.getNodeId());
            if (cpp.isPresent()) {
                return rawJson(cpp.get());
            }
        }
        return rawJson(objectMapper.writeValueAsBytes(hyperedgeQuery.containing(req.getNodeId())));
    }

    @PostMapping(value = "/path/shortest", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<byte[]> pathShortest(@Valid @RequestBody PathShortestRequest req) throws Exception {
        if (cppGraphClient.isEnabled()) {
            var cpp = cppGraphClient.postShortestPath(req.getFromId(), req.getToId());
            if (cpp.isPresent()) {
                return rawJson(cpp.get());
            }
        }
        return rawJson(objectMapper.writeValueAsBytes(pathShortestService.shortest(req.getFromId(), req.getToId())));
    }

    private byte[] postPython(String url, JsonNode body) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        JsonNode payload = body == null ? objectMapper.createObjectNode() : body;
        try {
            HttpEntity<String> entity = new HttpEntity<>(objectMapper.writeValueAsString(payload), headers);
            ResponseEntity<byte[]> resp = galaxyRestTemplate.exchange(url, HttpMethod.POST, entity, byte[].class);
            if (resp.getStatusCode().is2xxSuccessful() && resp.getBody() != null) {
                return resp.getBody();
            }
        } catch (RestClientException ex) {
            log.warn("python call {} : {}", url, ex.toString());
        } catch (Exception e) {
            log.warn("python call {}", url, e);
        }
        return null;
    }

    private static ResponseEntity<byte[]> rawJson(byte[] body) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        return ResponseEntity.ok().headers(headers).body(body);
    }
}
