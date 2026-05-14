package com.offercat.galaxy.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

/** 可选：调用 C++ galaxy-graph（hyperedges + 最短路径）。未配置或失败时由 Java 回退。 */
@Component
@RequiredArgsConstructor
public class GalaxyCppGraphClient {

    private final RestTemplate galaxyRestTemplate;
    private final ObjectMapper objectMapper;

    @Value("${galaxy.cpp.graph-base-url:}")
    private String graphBaseUrl;

    public boolean isEnabled() {
        return graphBaseUrl != null && !graphBaseUrl.isBlank();
    }

    private String base() {
        return graphBaseUrl.trim().replaceAll("/+$", "");
    }

    public Optional<byte[]> postContaining(String nodeId) {
        if (!isEnabled()) {
            return Optional.empty();
        }
        try {
            ObjectNode body = objectMapper.createObjectNode();
            body.put("nodeId", nodeId);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> entity = new HttpEntity<>(objectMapper.writeValueAsString(body), headers);
            ResponseEntity<byte[]> resp = galaxyRestTemplate.exchange(
                    base() + "/galaxy/hyperedges/containing",
                    HttpMethod.POST,
                    entity,
                    byte[].class);
            if (resp.getStatusCode().is2xxSuccessful() && resp.getBody() != null) {
                return Optional.of(resp.getBody());
            }
        } catch (Exception ignored) {
            // fall back to Java
        }
        return Optional.empty();
    }

    public Optional<byte[]> postShortestPath(String fromId, String toId) {
        if (!isEnabled()) {
            return Optional.empty();
        }
        try {
            ObjectNode body = objectMapper.createObjectNode();
            body.put("fromId", fromId);
            body.put("toId", toId);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<String> entity = new HttpEntity<>(objectMapper.writeValueAsString(body), headers);
            ResponseEntity<byte[]> resp = galaxyRestTemplate.exchange(
                    base() + "/galaxy/path/shortest",
                    HttpMethod.POST,
                    entity,
                    byte[].class);
            if (resp.getStatusCode().is2xxSuccessful() && resp.getBody() != null) {
                return Optional.of(resp.getBody());
            }
        } catch (Exception ignored) {
            // fall back
        }
        return Optional.empty();
    }
}
