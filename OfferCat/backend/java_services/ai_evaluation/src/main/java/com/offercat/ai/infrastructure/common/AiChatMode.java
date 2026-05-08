package com.offercat.ai.infrastructure.common;
/**
 * AI聊天模式枚举类
 * 用来表示AI聊天模式
 */
/**
 * @author: Ofteen
 * @data: 2026/4/24 - 01:22
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

public enum AiChatMode {
    AIHR, //AI HR模拟面试
    RESUME_POLISH, // 简历润色
    GROUP_INTERVIEW, //模拟大厂群面场景
    JOB_MATCH, //分析岗位匹配度
    SPRING_CAMP, // 2026春招AI冲刺营
    GENERAL; // 通用模式
    
    /**
     * 从字符串转换为枚举值
     * @param s 字符串表示的枚举值
     * @return 枚举值
     */
    public static AiChatMode from(String s) {
        if (s == null || s.trim().isEmpty()) return GENERAL;
        try {
            return AiChatMode.valueOf(s.trim().toUpperCase());
        } catch (Exception e) {
            return GENERAL;
        }
    }
}