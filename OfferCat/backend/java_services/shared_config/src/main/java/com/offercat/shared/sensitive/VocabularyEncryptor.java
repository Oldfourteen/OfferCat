package com.offercat.shared.sensitive;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

/**
 * 敏感词库加密工具
 * 用于将明文词库文件加密为二进制格式
 */
public class VocabularyEncryptor {
    
    /** 加密后文件的后缀 */
    private static final String ENCRYPTED_SUFFIX = ".enc";
    
    /**
     * 加密单个词库文件
     * @param inputPath 输入文件路径
     * @param outputPath 输出文件路径
     * @throws IOException 读写异常
     */
    public static void encryptFile(String inputPath, String outputPath) throws IOException {
        Path inPath = Paths.get(inputPath);
        Path outPath = Paths.get(outputPath);
        
        // 读取原始文件内容
        byte[] content = Files.readAllBytes(inPath);
        
        // 使用XOR加密
        byte[] encrypted = EncryptUtils.encrypt(content);
        
        // 写入加密文件
        Files.write(outPath, encrypted);
        
        System.out.println("已加密: " + inputPath + " -> " + outputPath);
    }
    
    /**
     * 解密单个词库文件
     * @param inputPath 加密文件路径
     * @param outputPath 输出文件路径
     * @throws IOException 读写异常
     */
    public static void decryptFile(String inputPath, String outputPath) throws IOException {
        Path inPath = Paths.get(inputPath);
        Path outPath = Paths.get(outputPath);
        
        // 读取加密文件内容
        byte[] encrypted = Files.readAllBytes(inPath);
        
        // 使用XOR解密
        byte[] decrypted = EncryptUtils.decrypt(encrypted);
        
        // 写入解密文件
        Files.write(outPath, decrypted);
        
        System.out.println("已解密: " + inputPath + " -> " + outputPath);
    }
    
    /**
     * 批量加密目录下的所有词库文件
     * @param inputDir 输入目录
     * @param outputDir 输出目录
     * @throws IOException 读写异常
     */
    public static void encryptDirectory(String inputDir, String outputDir) throws IOException {
        Path inDir = Paths.get(inputDir);
        Path outDir = Paths.get(outputDir);
        
        // 确保输出目录存在
        if (!Files.exists(outDir)) {
            Files.createDirectories(outDir);
        }
        
        // 遍历目录下的所有txt文件
        try (var stream = Files.list(inDir)) {
            stream.filter(path -> path.toString().endsWith(".txt"))
                  .forEach(path -> {
                      try {
                          String fileName = path.getFileName().toString();
                          String encryptedFileName = fileName.replace(".txt", ENCRYPTED_SUFFIX);
                          encryptFile(path.toString(), outDir.resolve(encryptedFileName).toString());
                      } catch (IOException e) {
                          System.err.println("加密失败: " + path);
                          e.printStackTrace();
                      }
                  });
        }
        
        System.out.println("批量加密完成");
    }
    
    /**
     * 将词库文件内容转换为Base64编码的加密字符串
     * @param inputPath 输入文件路径
     * @return Base64编码的加密字符串
     * @throws IOException 读写异常
     */
    public static String encryptToBase64String(String inputPath) throws IOException {
        Path inPath = Paths.get(inputPath);
        byte[] content = Files.readAllBytes(inPath);
        byte[] encrypted = EncryptUtils.encrypt(content);
        return Base64.getEncoder().encodeToString(encrypted);
    }
    
    /**
     * 主方法，用于手动执行加密
     */
    public static void main(String[] args) {
        if (args.length < 2) {
            System.out.println("用法:");
            System.out.println("  加密单个文件: java VocabularyEncryptor encrypt <input> <output>");
            System.out.println("  解密单个文件: java VocabularyEncryptor decrypt <input> <output>");
            System.out.println("  批量加密目录: java VocabularyEncryptor encryptDir <inputDir> <outputDir>");
            System.out.println("  生成Base64: java VocabularyEncryptor base64 <input>");
            return;
        }
        
        try {
            String command = args[0];
            
            switch (command.toLowerCase()) {
                case "encrypt":
                    if (args.length >= 3) {
                        encryptFile(args[1], args[2]);
                    }
                    break;
                case "decrypt":
                    if (args.length >= 3) {
                        decryptFile(args[1], args[2]);
                    }
                    break;
                case "encryptdir":
                    if (args.length >= 3) {
                        encryptDirectory(args[1], args[2]);
                    }
                    break;
                case "base64":
                    if (args.length >= 2) {
                        String base64 = encryptToBase64String(args[1]);
                        System.out.println("Base64加密结果:");
                        System.out.println(base64);
                    }
                    break;
                default:
                    System.out.println("未知命令: " + command);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}