package com.offercat.galaxy.dto;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PersonalGalaxySaveRequest {
    @NotNull
    private Long userId;

    /** 与前端 PersonalGalaxyV1 同构的 JSON */
    @NotNull
    private JsonNode galaxy;
}
