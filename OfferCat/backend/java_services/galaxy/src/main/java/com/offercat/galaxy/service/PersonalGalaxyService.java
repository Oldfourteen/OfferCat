package com.offercat.galaxy.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.offercat.galaxy.mapper.PersonalGalaxyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PersonalGalaxyService {

    private final PersonalGalaxyMapper personalGalaxyMapper;
    private final ObjectMapper objectMapper;

    public JsonNode load(long userId) throws Exception {
        String raw = personalGalaxyMapper.selectGalaxyJson(userId);
        if (raw == null || raw.isBlank()) {
            return null;
        }
        return objectMapper.readTree(raw);
    }

    public void save(long userId, JsonNode galaxy) {
        String json = galaxy.toString();
        personalGalaxyMapper.upsert(userId, json);
    }

    public void delete(long userId) {
        personalGalaxyMapper.delete(userId);
    }
}
