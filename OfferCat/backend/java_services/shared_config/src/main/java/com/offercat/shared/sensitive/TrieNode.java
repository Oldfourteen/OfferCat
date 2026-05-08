package com.offercat.shared.sensitive;

import java.util.HashMap;
import java.util.Map;

/**
 * 字典树节点类
 * 用于构建敏感词过滤的字典树结构
 */
public class TrieNode {
    
    /** 子节点映射，key为字符，value为对应的子节点 */
    private Map<Character, TrieNode> children;
    
    /** 是否为敏感词的结尾 */
    private boolean isEndOfWord;
    
    /**
     * 构造函数，初始化子节点映射
     */
    public TrieNode() {
        children = new HashMap<>();
        isEndOfWord = false;
    }
    
    /**
     * 获取子节点映射
     * @return 子节点Map
     */
    public Map<Character, TrieNode> getChildren() {
        return children;
    }
    
    /**
     * 判断是否为敏感词结尾
     * @return true表示是敏感词结尾，false表示不是
     */
    public boolean isEndOfWord() {
        return isEndOfWord;
    }
    
    /**
     * 设置是否为敏感词结尾
     * @param endOfWord 是否为敏感词结尾
     */
    public void setEndOfWord(boolean endOfWord) {
        isEndOfWord = endOfWord;
    }
    
    /**
     * 获取指定字符对应的子节点
     * @param c 字符
     * @return 对应的子节点，不存在返回null
     */
    public TrieNode getChild(char c) {
        return children.get(c);
    }
    
    /**
     * 添加子节点
     * @param c 字符
     * @param node 子节点
     */
    public void addChild(char c, TrieNode node) {
        children.put(c, node);
    }
    
    /**
     * 判断是否包含指定字符的子节点
     * @param c 字符
     * @return true表示存在，false表示不存在
     */
    public boolean hasChild(char c) {
        return children.containsKey(c);
    }
}