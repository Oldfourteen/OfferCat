package com.offercat.galaxy.util;

import com.fasterxml.jackson.databind.JsonNode;

import java.util.Map;

/**
 * 由个人星图 fusion 推导 starlit_pack.pack_key（与 H5 岗位表约定一致）。
 * 格式：{majorA}__{majorB}:{slot}，slot 为同一学科对下 3 岗中的 0-based 序号。
 */
public final class PackKeyUtil {

    private static final Map<String, String> TXT_TO_MAJOR = Map.ofEntries(
            Map.entry("电气工程", "major_electrical"),
            Map.entry("法学", "major_law"),
            Map.entry("会计学", "major_accounting"),
            Map.entry("计算机科学", "major_cs"),
            Map.entry("金融学", "major_finance"),
            Map.entry("临床医学", "major_clinical"),
            Map.entry("软件工程", "major_swe"),
            Map.entry("市场营销", "major_marketing"),
            Map.entry("数据科学", "major_ds"),
            Map.entry("英语", "major_english")
    );

    private PackKeyUtil() {}

    public static String fromFusionNode(JsonNode fusion) {
        return fromFusionNode(fusion, null);
    }

    /** @param majors 个人星图 majors 数组，用于把画布实例 id 解析为 major_* code */
    public static String fromFusionNode(JsonNode fusion, JsonNode majors) {
        if (fusion == null || !fusion.isObject()) {
            return null;
        }
        if (fusion.has("packKey")) {
            String pk = fusion.get("packKey").asText("").trim();
            if (!pk.isEmpty()) {
                return pk;
            }
        }
        String majorA = resolveMajorCode(text(fusion, "majorA"), majors);
        String majorB = resolveMajorCode(text(fusion, "majorB"), majors);
        if (majorA.isEmpty() || majorB.isEmpty()) {
            return null;
        }
        int slot = 0;
        if (fusion.has("jobSlot") && fusion.get("jobSlot").canConvertToInt()) {
            slot = Math.max(0, Math.min(2, fusion.get("jobSlot").asInt()));
        } else {
            JsonNode row = fusion.get("row");
            if (row != null && row.has("idx")) {
                int catalogIdx = row.get("idx").asInt(0);
                slot = Math.floorMod(catalogIdx - 1, 3);
            }
        }
        JsonNode row = fusion.get("row");
        String pairHint = row != null && row.has("pair") ? row.get("pair").asText("").trim() : "";
        String[] ordered = canonicalCodes(majorA, majorB, pairHint);
        String a = ordered[0];
        String b = ordered[1];
        return a + "__" + b + ":" + slot;
    }

    private static String[] canonicalCodes(String codeA, String codeB, String pairHint) {
        if (pairHint != null && !pairHint.isBlank()) {
            String[] fromPair = codesFromPairLabel(pairHint);
            if (fromPair != null) {
                return fromPair;
            }
        }
        if (codeA.compareTo(codeB) <= 0) {
            return new String[] { codeA, codeB };
        }
        return new String[] { codeB, codeA };
    }

    private static String[] codesFromPairLabel(String pair) {
        String[] parts = pair.split("×");
        if (parts.length != 2) {
            return null;
        }
        String a = TXT_TO_MAJOR.get(parts[0].trim());
        String b = TXT_TO_MAJOR.get(parts[1].trim());
        if (a == null || b == null) {
            return null;
        }
        return new String[] { a, b };
    }

    private static String text(JsonNode node, String field) {
        return node.has(field) ? node.get(field).asText("").trim() : "";
    }

    private static String resolveMajorCode(String ref, JsonNode majors) {
        if (ref == null || ref.isBlank()) {
            return "";
        }
        String t = ref.trim();
        if (majors != null && majors.isArray()) {
            for (JsonNode m : majors) {
                if (m.has("id") && t.equals(m.get("id").asText("").trim()) && m.has("majorId")) {
                    return m.get("majorId").asText("").trim();
                }
                if (m.has("label") && t.equals(m.get("label").asText("").trim()) && m.has("majorId")) {
                    return m.get("majorId").asText("").trim();
                }
            }
        }
        if (t.startsWith("m_")) {
            int last = t.lastIndexOf('_');
            if (last > 2) {
                return t.substring(2, last);
            }
        }
        if (t.startsWith("major_")) {
            return t;
        }
        String fromTxt = TXT_TO_MAJOR.get(t);
        return fromTxt != null ? fromTxt : "";
    }
}
