package com.offercat.galaxy.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

/**
 * 从 classpath 加载与 H5 mock 同构的图 JSON（首期无 DB）。
 */
@Service
@RequiredArgsConstructor
public class GalaxyGraphDataService {

    private final ObjectMapper objectMapper;

    private byte[] manifestBytes;
    private byte[] nodesBytes;
    private byte[] edgesBytes;
    private byte[] hyperedgesBytes;
    private byte[] layoutBytes;
    private byte[] recommendBytes;
    private JsonNode hyperedgesRoot;
    private JsonNode edgesRoot;

    @PostConstruct
    public void load() throws IOException {
        manifestBytes = read("galaxy/mock/manifest.json");
        nodesBytes = read("galaxy/mock/nodes.json");
        edgesBytes = read("galaxy/mock/edges.json");
        hyperedgesBytes = read("galaxy/mock/hyperedges.json");
        layoutBytes = read("galaxy/mock/layout.json");
        recommendBytes = read("galaxy/mock/recommend.json");
        hyperedgesRoot = objectMapper.readTree(hyperedgesBytes);
        edgesRoot = objectMapper.readTree(edgesBytes);
    }

    private static byte[] read(String classpath) throws IOException {
        ClassPathResource res = new ClassPathResource(classpath);
        try (InputStream in = res.getInputStream()) {
            return in.readAllBytes();
        }
    }

    public byte[] manifest() {
        return manifestBytes;
    }

    public byte[] nodes() {
        return nodesBytes;
    }

    public byte[] edges() {
        return edgesBytes;
    }

    public byte[] hyperedgesRaw() {
        return hyperedgesBytes;
    }

    public byte[] layout() {
        return layoutBytes;
    }

    public byte[] recommend() {
        return recommendBytes;
    }

    public JsonNode hyperedgesArray() {
        return hyperedgesRoot;
    }

    public JsonNode edgesArray() {
        return edgesRoot;
    }
}
