package com.offercat.galaxy.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

@Data
public class RecommendRequest {
    @JsonAlias("selected_node_id")
    private String selectedNodeId;
}
