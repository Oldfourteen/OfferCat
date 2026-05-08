package com.offercat.shared.sensitive;

import java.util.ArrayList;
import java.util.List;

/**
 * 字典树（Trie）数据结构实现
 * 用于高效的敏感词模糊匹配
 * 
 * 支持以下功能：
 * - 插入敏感词
 * - 精确匹配
 * - 模糊匹配（支持全角转半角、大小写转换、去除特殊字符）
 * - 查找所有匹配的敏感词
 */
public class Trie {
    
    /** 字典树的根节点 */
    private TrieNode root;
    
    /**
     * 构造函数，初始化根节点
     */
    public Trie() {
        root = new TrieNode();
    }
    
    /**
     * 插入一个敏感词到字典树
     * @param word 要插入的敏感词
     */
    public void insert(String word) {
        if (word == null || word.isEmpty()) {
            return;
        }
        
        TrieNode current = root;
        for (int i = 0; i < word.length(); i++) {
            char c = word.charAt(i);
            if (!current.hasChild(c)) {
                current.addChild(c, new TrieNode());
            }
            current = current.getChild(c);
        }
        current.setEndOfWord(true);
    }
    
    /**
     * 批量插入敏感词
     * @param words 敏感词列表
     */
    public void insertAll(List<String> words) {
        if (words == null || words.isEmpty()) {
            return;
        }
        for (String word : words) {
            insert(word);
        }
    }
    
    /**
     * 精确匹配判断
     * @param word 要匹配的词
     * @return true表示完全匹配，false表示不匹配
     */
    public boolean contains(String word) {
        if (word == null || word.isEmpty()) {
            return false;
        }
        
        TrieNode current = root;
        for (int i = 0; i < word.length(); i++) {
            char c = word.charAt(i);
            if (!current.hasChild(c)) {
                return false;
            }
            current = current.getChild(c);
        }
        return current.isEndOfWord();
    }
    
    /**
     * 检查文本中是否包含任何敏感词
     * @param text 待检查的文本
     * @return true表示包含敏感词，false表示不包含
     */
    public boolean containsAny(String text) {
        if (text == null || text.isEmpty()) {
            return false;
        }
        
        text = normalizeText(text);
        
        for (int i = 0; i < text.length(); i++) {
            TrieNode current = root;
            int j = i;
            
            while (j < text.length() && current.hasChild(text.charAt(j))) {
                current = current.getChild(text.charAt(j));
                j++;
                
                if (current.isEndOfWord()) {
                    return true;
                }
            }
        }
        
        return false;
    }
    
    /**
     * 查找文本中所有匹配的敏感词
     * @param text 待检查的文本
     * @return 匹配到的敏感词列表
     */
    public List<String> findAll(String text) {
        if (text == null || text.isEmpty()) {
            return new ArrayList<>();
        }
        
        text = normalizeText(text);
        List<String> foundWords = new ArrayList<>();
        
        for (int i = 0; i < text.length(); i++) {
            TrieNode current = root;
            int j = i;
            StringBuilder sb = new StringBuilder();
            
            while (j < text.length() && current.hasChild(text.charAt(j))) {
                char c = text.charAt(j);
                sb.append(c);
                current = current.getChild(c);
                j++;
                
                if (current.isEndOfWord()) {
                    String found = sb.toString();
                    if (!foundWords.contains(found)) {
                        foundWords.add(found);
                    }
                }
            }
        }
        
        return foundWords;
    }
    
    /**
     * 模糊匹配检查
     * 先对文本进行规范化处理，再进行匹配
     * @param text 待检查的文本
     * @return true表示包含敏感词，false表示不包含
     */
    public boolean containsFuzzy(String text) {
        if (text == null || text.isEmpty()) {
            return false;
        }
        
        String normalizedText = normalizeText(text);
        return containsAny(normalizedText);
    }
    
    /**
     * 文本规范化处理
     * 包括：全角转半角、小写转换、去除特殊字符
     * @param text 原始文本
     * @return 规范化后的文本
     */
    private String normalizeText(String text) {
        if (text == null) {
            return "";
        }
        
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            
            // 全角转半角（大写字母）
            if (c >= '\uFF21' && c <= '\uFF3A') {
                c = (char) (c - '\uFF21' + 'A');
            } 
            // 全角转半角（小写字母）
            else if (c >= '\uFF41' && c <= '\uFF5A') {
                c = (char) (c - '\uFF41' + 'a');
            } 
            // 全角转半角（数字）
            else if (c >= '\uFF10' && c <= '\uFF19') {
                c = (char) (c - '\uFF10' + '0');
            }
            
            // 转换为小写
            c = Character.toLowerCase(c);
            
            // 保留字母、数字和汉字
            if (Character.isLetterOrDigit(c) || Character.isIdeographic(c)) {
                sb.append(c);
            }
        }
        
        return sb.toString();
    }
    
    /**
     * 清空字典树
     */
    public void clear() {
        root = new TrieNode();
    }
    
    /**
     * 判断字典树是否为空
     * @return true表示为空，false表示不为空
     */
    public boolean isEmpty() {
        return root.getChildren().isEmpty();
    }
}