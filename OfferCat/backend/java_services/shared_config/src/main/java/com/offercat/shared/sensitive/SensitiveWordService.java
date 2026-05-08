package com.offercat.shared.sensitive;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

/**
 * 敏感词过滤服务
 * 
 * 功能：
 * 1. 从词库文件加载敏感词到字典树
 * 2. 提供敏感词检测接口
 * 3. 提供文本过滤功能，包含敏感词时替换为古诗
 * 
 * 敏感词类别包括：
 * - 政治敏感词
 * - 宗教邪教词
 * - 暴恐词
 * - 毒品词
 * - 诈骗词
 * - 广告引流词
 * - 赌博词
 * - 色情词
 * - 辱骂词
 * - 地域引战词
 * - 饭圈互撕词
 * - 谐音变体词
 */
@Service
public class SensitiveWordService {
    
    /** 字典树实例 */
    private Trie trie;
    
    /** 随机数生成器，用于生成随机古诗 */
    private final Random random = new Random();
    
    /** 词库文件路径 */
    private static final String VOCABULARY_PATH = "com/offercat/shared/sensitive/Vocabulary";
    
    /** 词库文件名列表 */
    private static final List<String> VOCABULARY_FILES = Arrays.asList(
        "COVID-19词库.txt",
        "GFW补充词库.txt",
        "其他词库.txt", 
        "反动词库.txt",
        "广告类型.txt",
        "政治类型.txt",
        "新思想启蒙.txt",
        "暴恐词库.txt",
        "民生词库.txt",
        "涉枪涉爆.txt",
        "网易前端过滤敏感词库.txt",
        "色情类型.txt",
        "色情词库.txt",
        "补充词库.txt",
        "贪腐词库.txt",
        "零时-Tencent.txt",
        "非法网址.txt"
    );
    
    /** 古诗库，用于替换敏感内容 */
    private static final List<String> ANCIENT_POEMS = Arrays.asList(
        "春风得意马蹄疾，一日看尽长安花。",
        "白日依山尽，黄河入海流。",
        "床前明月光，疑是地上霜。",
        "举头望明月，低头思故乡。",
        "野火烧不尽，春风吹又生。",
        "锄禾日当午，汗滴禾下土。",
        "谁知盘中餐，粒粒皆辛苦。",
        "离离原上草，一岁一枯荣。",
        "飞流直下三千尺，疑是银河落九天。",
        "两个黄鹂鸣翠柳，一行白鹭上青天。",
        "窗含西岭千秋雪，门泊东吴万里船。",
        "千山鸟飞绝，万径人踪灭。",
        "孤舟蓑笠翁，独钓寒江雪。",
        "春眠不觉晓，处处闻啼鸟。",
        "夜来风雨声，花落知多少。",
        "红豆生南国，春来发几枝。",
        "愿君多采撷，此物最相思。",
        "海内存知己，天涯若比邻。",
        "山重水复疑无路，柳暗花明又一村。",
        "沉舟侧畔千帆过，病树前头万木春。"
    );
    
    /**
     * 初始化方法，服务启动时自动调用
     * 初始化字典树并加载敏感词库
     */
    @PostConstruct
    public void init() {
        trie = new Trie();
        loadSensitiveWords();
    }
    
    /**
     * 加载所有词库文件中的敏感词
     */
    private void loadSensitiveWords() {
        for (String fileName : VOCABULARY_FILES) {
            loadWordsFromFile(fileName);
        }
    }
    
    /**
     * 从指定文件加载敏感词
     * @param fileName 词库文件名
     */
    private void loadWordsFromFile(String fileName) {
        String path = VOCABULARY_PATH + "/" + fileName;
        try (InputStream is = getClass().getClassLoader().getResourceAsStream(path)) {
            if (is == null) {
                return;
            }
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(is, StandardCharsets.UTF_8))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    String word = line.trim();
                    if (!word.isEmpty()) {
                        trie.insert(word.toLowerCase());
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    /**
     * 检查文本是否包含敏感词
     * @param text 待检查的文本
     * @return true表示包含敏感词，false表示不包含
     */
    public boolean containsSensitiveWord(String text) {
        if (text == null || text.isEmpty()) {
            return false;
        }
        return trie.containsFuzzy(text);
    }
    
    /**
     * 查找文本中所有匹配的敏感词
     * @param text 待检查的文本
     * @return 匹配到的敏感词列表
     */
    public List<String> findAllSensitiveWords(String text) {
        if (text == null || text.isEmpty()) {
            return new ArrayList<>();
        }
        return trie.findAll(text);
    }
    
    /**
     * 获取替换文本（两句随机古诗）
     * @return 两句古诗，用换行分隔
     */
    public String getReplacementText() {
        int index1 = random.nextInt(ANCIENT_POEMS.size());
        int index2;
        do {
            index2 = random.nextInt(ANCIENT_POEMS.size());
        } while (index2 == index1);
        
        return ANCIENT_POEMS.get(index1) + "\n" + ANCIENT_POEMS.get(index2);
    }
    
    /**
     * 过滤文本
     * 如果文本包含敏感词，将整个文本替换为两句古诗
     * @param text 待过滤的文本
     * @return 过滤后的文本
     */
    public String filterText(String text) {
        if (text == null || text.isEmpty()) {
            return text;
        }
        
        if (containsSensitiveWord(text)) {
            return getReplacementText();
        }
        
        return text;
    }
    
    /**
     * 检查并过滤文本（仅返回是否包含敏感词）
     * @param text 待检查的文本
     * @return true表示包含敏感词，false表示不包含
     */
    public boolean checkAndFilter(String text) {
        return containsSensitiveWord(text);
    }
    
    /**
     * 重新加载词库
     */
    public void reload() {
        trie.clear();
        loadSensitiveWords();
    }
    
    /**
     * 判断字典树是否为空（词库是否加载成功）
     * @return true表示为空，false表示不为空
     */
    public boolean isTrieEmpty() {
        return trie.isEmpty();
    }
}