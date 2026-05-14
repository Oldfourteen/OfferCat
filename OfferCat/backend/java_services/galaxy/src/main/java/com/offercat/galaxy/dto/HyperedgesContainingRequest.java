package com.offercat.galaxy.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class HyperedgesContainingRequest {

    @NotBlank
    @JsonProperty("nodeId")
    @JsonAlias({"node_id"})
    private String nodeId;
}
