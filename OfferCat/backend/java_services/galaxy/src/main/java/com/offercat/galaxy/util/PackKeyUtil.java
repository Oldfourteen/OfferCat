package com.offercat.galaxy.util;

import com.fasterxml.jackson.databind.JsonNode;

/**
 * 由个人星图 fusion 推导 starlit_pack.pack_key（与 H5 岗位表约定一致）。
 * 格式：{majorA}__{majorB}:{slot}，slot 为同一学科对下 3 岗中的 0-based 序号。
 */
public final class PackKeyUtil {

    private PackKeyUtil() {}

    public static String fromFusionNode(JsonNode fusion) {
        if (fusion == null || !fusion.isObject()) {
            return null;
        }
        String majorA = text(fusion, "majorA");
        String majorB = text(fusion, "majorB");
        JsonNode row = fusion.get("row");
        if (majorA.isEmpty() || majorB.isEmpty() || row == null) {
            return null;
        }
        int catalogIdx = row.has("idx") ? row.get("idx").asInt(0) : 0;
        int slot = Math.floorMod(catalogIdx - 1, 3);
        String a = majorA.compareTo(majorB) <= 0 ? majorA : majorB;
        String b = majorA.compareTo(majorB) <= 0 ? majorB : majorA;
        if (!majorA.equals(a)) {
            slot = 2 - slot;
        }
        return a + "__" + b + ":" + slot;
    }

    private static String text(JsonNode node, String field) {
        return node.has(field) ? node.get(field).asText("").trim() : "";
    }
}
