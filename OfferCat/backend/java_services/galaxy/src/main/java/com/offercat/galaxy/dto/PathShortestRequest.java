package com.offercat.galaxy.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PathShortestRequest {

    @NotBlank
    @JsonProperty("fromId")
    @JsonAlias("from_id")
    private String fromId;

    @NotBlank
    @JsonProperty("toId")
    @JsonAlias("to_id")
    private String toId;
}
