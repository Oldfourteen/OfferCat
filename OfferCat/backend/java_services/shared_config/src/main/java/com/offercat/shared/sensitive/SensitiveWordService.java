package com.offercat.shared.sensitive;

import jakarta.annotation.PostConstruct;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;
import org.springframework.stereotype.Service;

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
    
    /** 加载的敏感词总数 */
    private int totalLoadedWords = 0;
    
    /** 词库文件路径 */
    private static final String VOCABULARY_PATH = "sensitive";
    
    /** 备用词库路径 */
    private static final String BACKUP_VOCABULARY_PATH = "com/offercat/shared/sensitive/Vocabulary";
    
    /** 加密词库文件后缀 */
    private static final String ENCRYPTED_SUFFIX = ".enc";
    
    /** 词库文件名列表 */
    private static final List<String> VOCABULARY_FILES = Arrays.asList(
        "COVID-19词库",
        "GFW补充词库",
        "其他词库", 
        "反动词库",
        "广告类型",
        "政治类型",
        "新思想启蒙",
        "暴恐词库",
        "民生词库",
        "涉枪涉爆",
        "网易前端过滤敏感词库",
        "色情类型",
        "色情词库",
        "补充词库",
        "贪腐词库",
        "零时-Tencent",
        "非法网址"
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
        "沉舟侧畔千帆过，病树前头万木春。",
        "人生自古谁无死，留取丹心照汗青。",
        "春蚕到死丝方尽，蜡炬成灰泪始干。",
        "落红不是无情物，化作春泥更护花。",
        "问渠那得清如许，为有源头活水来。",
        "纸上得来终觉浅，绝知此事要躬行。",
        "不识庐山真面目，只缘身在此山中。",
        "竹外桃花三两枝，春江水暖鸭先知。",
        "接天莲叶无穷碧，映日荷花别样红。",
        "欲穷千里目，更上一层楼。",
        "会当凌绝顶，一览众山小。",
        "大漠孤烟直，长河落日圆。",
        "采菊东篱下，悠然见南山。",
        "举杯邀明月，对影成三人。",
        "但愿人长久，千里共婵娟。",
        "天生我材必有用，千金散尽还复来。",
        "抽刀断水水更流，举杯消愁愁更愁。",
        "长风破浪会有时，直挂云帆济沧海。",
        "无边落木萧萧下，不尽长江滚滚来。",
        "停车坐爱枫林晚，霜叶红于二月花。",
        "忽如一夜春风来，千树万树梨花开。",
        "千里黄云白日曛，北风吹雁雪纷纷。",
        "莫愁前路无知己，天下谁人不识君。",
        "月落乌啼霜满天，江枫渔火对愁眠。",
        "姑苏城外寒山寺，夜半钟声到客船。",
        "商女不知亡国恨，隔江犹唱后庭花。",
        "烟笼寒水月笼沙，夜泊秦淮近酒家。",
        "人生得意须尽欢，莫使金樽空对月。",
        "天生丽质难自弃，一朝选在君王侧。",
        "回眸一笑百媚生，六宫粉黛无颜色。",
        "天长地久有时尽，此恨绵绵无绝期。",
        "在天愿作比翼鸟，在地愿为连理枝。",
        "同是天涯沦落人，相逢何必曾相识。",
        "嘈嘈切切错杂弹，大珠小珠落玉盘。",
        "千呼万唤始出来，犹抱琵琶半遮面。",
        "别有幽愁暗恨生，此时无声胜有声。",
        "曲终人不见，江上数峰青。",
        "空山不见人，但闻人语响。",
        "返景入深林，复照青苔上。",
        "空山新雨后，天气晚来秋。",
        "明月松间照，清泉石上流。",
        "竹喧归浣女，莲动下渔舟。",
        "随意春芳歇，王孙自可留。",
        "渭城朝雨浥轻尘，客舍青青柳色新。",
        "劝君更尽一杯酒，西出阳关无故人。",
        "独在异乡为异客，每逢佳节倍思亲。",
        "遥知兄弟登高处，遍插茱萸少一人。",
        "飞流直下三千尺，疑是银河落九天。",
        "朝辞白帝彩云间，千里江陵一日还。",
        "两岸猿声啼不住，轻舟已过万重山。",
        "故人西辞黄鹤楼，烟花三月下扬州。",
        "孤帆远影碧空尽，唯见长江天际流。",
        "天门中断楚江开，碧水东流至此回。",
        "两岸青山相对出，孤帆一片日边来。",
        "众鸟高飞尽，孤云独去闲。",
        "相看两不厌，只有敬亭山。",
        "日照香炉生紫烟，遥看瀑布挂前川。",
        "飞流直下三千尺，疑是银河落九天。",
        "移舟泊烟渚，日暮客愁新。",
        "野旷天低树，江清月近人。",
        "春潮带雨晚来急，野渡无人舟自横。",
        "独怜幽草涧边生，上有黄鹂深树鸣。",
        "独怜幽草涧边生，上有黄鹂深树鸣。",
        "有约不来过夜半，闲敲棋子落灯花。",
        "黄梅时节家家雨，青草池塘处处蛙。",
        "黑云翻墨未遮山，白雨跳珠乱入船。",
        "卷地风来忽吹散，望湖楼下水如天。",
        "水光潋滟晴方好，山色空蒙雨亦奇。",
        "欲把西湖比西子，淡妆浓抹总相宜。",
        "荷尽已无擎雨盖，菊残犹有傲霜枝。",
        "一年好景君须记，最是橙黄橘绿时。",
        "萧萧梧叶送寒声，江上秋风动客情。",
        "知有儿童挑促织，夜深篱落一灯明。",
        "远上寒山石径斜，白云生处有人家。",
        "停车坐爱枫林晚，霜叶红于二月花。",
        "青山遮不住，毕竟东流去。",
        "江晚正愁余，山深闻鹧鸪。",
        "明月别枝惊鹊，清风半夜鸣蝉。",
        "稻花香里说丰年，听取蛙声一片。",
        "七八个星天外，两三点雨山前。",
        "旧时茅店社林边，路转溪桥忽见。",
        "醉里吴音相媚好，白发谁家翁媪。",
        "大儿锄豆溪东，中儿正织鸡笼。",
        "最喜小儿无赖，溪头卧剥莲蓬。",
        "茅檐低小，溪上青青草。",
        "开轩面场圃，把酒话桑麻。",
        "待到重阳日，还来就菊花。",
        "绿树村边合，青山郭外斜。",
        "绿树村边合，青山郭外斜。",
        "种豆南山下，草盛豆苗稀。",
        "晨兴理荒秽，带月荷锄归。",
        "道狭草木长，夕露沾我衣。",
        "衣沾不足惜，但使愿无违。",
        "结庐在人境，而无车马喧。",
        "问君何能尔，心远地自偏。",
        "采菊东篱下，悠然见南山。",
        "山气日夕佳，飞鸟相与还。",
        "此中有真意，欲辨已忘言。",
        "山中相送罢，日暮掩柴扉。",
        "春草明年绿，王孙归不归。",
        "红豆生南国，春来发几枝。",
        "愿君多采撷，此物最相思。",
        "楚塞三湘接，荆门九派通。",
        "江流天地外，山色有无中。",
        "郡邑浮前浦，波澜动远空。",
        "襄阳好风日，留醉与山翁。",
        "木末芙蓉花，山中发红萼。",
        "涧户寂无人，纷纷开且落。",
        "人闲桂花落，夜静春山空。",
        "月出惊山鸟，时鸣春涧中。",
        "独坐幽篁里，弹琴复长啸。",
        "深林人不知，明月来相照。",
        "空山不见人，但闻人语响。",
        "返景入深林，复照青苔上。",
        "山中何事，松花酿酒，春水煎茶。",
        "云来山更佳，云去山如画。",
        "山因云晦明，云共山高下。",
        "长亭外，古道边，芳草碧连天。",
        "晚风拂柳笛声残，夕阳山外山。",
        "天之涯，地之角，知交半零落。",
        "一壶浊酒尽余欢，今宵别梦寒。"
    );
    
    /** 古诗标题库，用于增强输出 */
    private static final List<String> POEM_TITLES = Arrays.asList(
        "【静夜思】", "【春晓】", "【登鹳雀楼】", "【相思】", "【悯农】",
        "【江雪】", "【咏柳】", "【望庐山瀑布】", "【早发白帝城】", "【黄鹤楼送孟浩然之广陵】",
        "【赠汪伦】", "【绝句】", "【枫桥夜泊】", "【清明】", "【出塞】",
        "【凉州词】", "【游子吟】", "【望岳】", "【春望】", "【茅屋为秋风所破歌】",
        "【石壕吏】", "【新安吏】", "【潼关吏】", "【新婚别】", "【垂老别】",
        "【无家别】", "【蜀道难】", "【将进酒】", "【梦游天姥吟留别】", "【行路难】",
        "【长恨歌】", "【琵琶行】", "【锦瑟】", "【无题】", "【夜雨寄北】",
        "【虞美人】", "【浪淘沙】", "【相见欢】", "【破阵子】", "【声声慢】",
        "【念奴娇】", "【水调歌头】", "【江城子】", "【蝶恋花】", "【浣溪沙】",
        "【鹊桥仙】", "【钗头凤】", "【永遇乐】", "【青玉案】", "【暗香】",
        "【疏影】", "【摸鱼儿】", "【贺新郎】", "【沁园春】", "【满江红】"
    );
    
    /**
     * 初始化方法，服务启动时自动调用
     * 初始化字典树并加载敏感词库
     */
    @PostConstruct
    public void init() {
        trie = new Trie();
        loadDefaultWords();
        loadSensitiveWords();
    }
    
    /**
     * 加载默认敏感词（兜底机制）
     */
    private void loadDefaultWords() {
        String[] defaultWords = {
            "习近平", "法轮功", "法轮", "轮子功", "法x功", "flg", "潘石屹", "盘古", 
            "温家宝", "胡主席", "江泽民", "李洪志", "洪志", "法lg", "法x",
            "维权", "上访", "集会", "游行", "示威", "民主", "自由", "人权",
            "天安门", "六四", "8964", "八九", "民运", "反共", "反共", "台独",
            "藏独", "疆独", "港独", "法轮大法", "真善忍", "退党", "退团", "退队",
            "三退", "九评", "天灭中共", "大法弟子", "法轮佛法", "法轮世界",
            "法轮法", "法轮圣", "法轮王", "法神圣", "法圣王", "李大师", "李父",
            "李母", "法轮佛", "法轮圣佛", "法轮圣王", "法轮大佛", "法轮大士",
            "法轮真人", "法轮天尊", "法轮天仙", "法轮天神", "法轮神圣",
            "法轮神佛", "法轮神圣佛", "法轮神圣王", "法轮神圣大佛",
            "法轮神圣大士", "法轮神圣真人", "法轮神圣天尊", "法轮神圣天仙",
            "法轮神圣天神", "法轮神圣仙佛", "法轮神圣神王", "法轮神圣仙王"
        };
        
        for (String word : defaultWords) {
            trie.insert(word.toLowerCase());
            totalLoadedWords++;
        }
    }
    
    /**
     * 加载所有词库文件中的敏感词
     */
    private void loadSensitiveWords() {
        totalLoadedWords = 0;
        for (String fileName : VOCABULARY_FILES) {
            int wordsLoaded = loadWordsFromFile(fileName);
            totalLoadedWords += wordsLoaded;
        }
    }
    
    /**
     * 从指定文件加载敏感词（支持加密和未加密两种格式）
     * @param fileName 词库文件名
     * @return 加载的词数量
     */
    private int loadWordsFromFile(String fileName) {
        int count = 0;
        
        List<String> paths = Arrays.asList(
            VOCABULARY_PATH + "/" + fileName + ENCRYPTED_SUFFIX,
            VOCABULARY_PATH + "/" + fileName + ".txt",
            BACKUP_VOCABULARY_PATH + "/" + fileName + ENCRYPTED_SUFFIX,
            BACKUP_VOCABULARY_PATH + "/" + fileName + ".txt"
        );
        
        for (String path : paths) {
            try (InputStream is = getClass().getClassLoader().getResourceAsStream(path)) {
                if (is != null) {
                    byte[] content = is.readAllBytes();
                    
                    // 判断是否为加密文件（通过文件后缀判断）
                    String contentStr;
                    if (path.endsWith(ENCRYPTED_SUFFIX)) {
                        // 加密文件，需要解密
                        byte[] decrypted = EncryptUtils.decrypt(content);
                        contentStr = new String(decrypted, StandardCharsets.UTF_8);
                    } else {
                        // 未加密文件，直接读取
                        contentStr = new String(content, StandardCharsets.UTF_8);
                    }
                    
                    // 按行解析敏感词
                    String[] lines = contentStr.split("\\r?\\n");
                    for (String line : lines) {
                        String word = line.trim();
                        if (!word.isEmpty()) {
                            trie.insert(word.toLowerCase());
                            count++;
                        }
                    }
                    return count;
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        
        count = loadFromFileSystem(fileName);
        return count;
    }
    
    private int loadFromFileSystem(String fileName) {
        int count = 0;
        try {
            String basePath = System.getProperty("user.dir");
            String[] possiblePaths = {
                basePath + "/backend/java_services/shared_config/src/main/java/com/offercat/shared/sensitive/Vocabulary/" + fileName + ENCRYPTED_SUFFIX,
                basePath + "/backend/java_services/shared_config/src/main/java/com/offercat/shared/sensitive/Vocabulary/" + fileName + ".txt",
                basePath + "/java_services/shared_config/src/main/java/com/offercat/shared/sensitive/Vocabulary/" + fileName + ENCRYPTED_SUFFIX,
                basePath + "/java_services/shared_config/src/main/java/com/offercat/shared/sensitive/Vocabulary/" + fileName + ".txt",
                basePath + "/shared_config/src/main/java/com/offercat/shared/sensitive/Vocabulary/" + fileName + ENCRYPTED_SUFFIX,
                basePath + "/shared_config/src/main/java/com/offercat/shared/sensitive/Vocabulary/" + fileName + ".txt",
                "g:/offercat/OfferCat/OfferCat/backend/java_services/shared_config/src/main/java/com/offercat/shared/sensitive/Vocabulary/" + fileName + ENCRYPTED_SUFFIX,
                "g:/offercat/OfferCat/OfferCat/backend/java_services/shared_config/src/main/java/com/offercat/shared/sensitive/Vocabulary/" + fileName + ".txt",
                "g:/offercat/OfferCat/backend/java_services/shared_config/src/main/java/com/offercat/shared/sensitive/Vocabulary/" + fileName + ENCRYPTED_SUFFIX,
                "g:/offercat/OfferCat/backend/java_services/shared_config/src/main/java/com/offercat/shared/sensitive/Vocabulary/" + fileName + ".txt",
                "g:/offercat/backend/java_services/shared_config/src/main/java/com/offercat/shared/sensitive/Vocabulary/" + fileName + ENCRYPTED_SUFFIX,
                "g:/offercat/backend/java_services/shared_config/src/main/java/com/offercat/shared/sensitive/Vocabulary/" + fileName + ".txt"
            };
            
            for (String filePath : possiblePaths) {
                File file = new File(filePath);
                if (file.exists()) {
                    byte[] content = Files.readAllBytes(file.toPath());
                    
                    String contentStr;
                    if (filePath.endsWith(ENCRYPTED_SUFFIX)) {
                        // 加密文件，需要解密
                        byte[] decrypted = EncryptUtils.decrypt(content);
                        contentStr = new String(decrypted, StandardCharsets.UTF_8);
                    } else {
                        // 未加密文件，直接读取
                        contentStr = new String(content, StandardCharsets.UTF_8);
                    }
                    
                    String[] lines = contentStr.split("\\r?\\n");
                    for (String line : lines) {
                        String word = line.trim();
                        if (!word.isEmpty()) {
                            trie.insert(word.toLowerCase());
                            count++;
                        }
                    }
                    return count;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return count;
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
        int titleIndex = random.nextInt(POEM_TITLES.size());
        int poemIndex1 = random.nextInt(ANCIENT_POEMS.size());
        int poemIndex2;
        do {
            poemIndex2 = random.nextInt(ANCIENT_POEMS.size());
        } while (poemIndex2 == poemIndex1);
        
        String title = POEM_TITLES.get(titleIndex);
        String poem1 = ANCIENT_POEMS.get(poemIndex1);
        String poem2 = ANCIENT_POEMS.get(poemIndex2);
        
        return title + "\n" + poem1 + "\n" + poem2;
    }
    
    /**
     * 获取带装饰的古诗输出
     * @return 格式化的古诗文本
     */
    public String getDecoratedPoem() {
        int titleIndex = random.nextInt(POEM_TITLES.size());
        int poemIndex = random.nextInt(ANCIENT_POEMS.size());
        
        String title = POEM_TITLES.get(titleIndex);
        String poem = ANCIENT_POEMS.get(poemIndex);
        
        StringBuilder sb = new StringBuilder();
        sb.append("╔════════════════════════════════╗\n");
        sb.append("║          ").append(title).append("          ║\n");
        sb.append("╚════════════════════════════════╝\n");
        sb.append("┌────────────────────────────────┐\n");
        sb.append("│  ").append(poem).append("  │\n");
        sb.append("└────────────────────────────────┘\n");
        sb.append("          —— 古诗鉴赏 ——");
        
        return sb.toString();
    }
    
    /**
     * 获取简单优雅的古诗输出（适合日常替换）
     * @return 简洁的古诗文本
     */
    public String getSimplePoem() {
        int poemIndex = random.nextInt(ANCIENT_POEMS.size());
        return ANCIENT_POEMS.get(poemIndex);
    }
    
    /**
     * 获取一组古诗（四句）
     * @return 四句古诗
     */
    public String getFourLinesPoem() {
        int[] indices = new int[4];
        for (int i = 0; i < 4; i++) {
            do {
                indices[i] = random.nextInt(ANCIENT_POEMS.size());
            } while (i > 0 && indices[i] == indices[i-1]);
        }
        
        return ANCIENT_POEMS.get(indices[0]) + "\n" +
               ANCIENT_POEMS.get(indices[1]) + "\n" +
               ANCIENT_POEMS.get(indices[2]) + "\n" +
               ANCIENT_POEMS.get(indices[3]);
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
     * 判断字典树是否为空
     * @return true表示为空，false表示不为空
     */
    public boolean isTrieEmpty() {
        return trie.isEmpty();
    }
    
    /**
     * 获取加载的词库统计信息
     * @return 包含统计信息的Map
     */
    public java.util.Map<String, Object> getLoadStats() {
        java.util.Map<String, Object> stats = new java.util.HashMap<>();
        stats.put("totalWords", totalLoadedWords);
        stats.put("trieEmpty", trie.isEmpty());
        stats.put("vocabularyFiles", VOCABULARY_FILES.size());
        return stats;
    }
}