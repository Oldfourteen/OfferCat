package com.offercat.shared.sensitive;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class EncryptUtils {
    
    private static final byte[] DEFAULT_KEY = generateKey("OfferCatSensitiveWord2024");
    
    private static byte[] generateKey(String seed) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(seed.getBytes(StandardCharsets.UTF_8));
            byte[] key = new byte[16];
            System.arraycopy(hash, 0, key, 0, Math.min(hash.length, 16));
            return key;
        } catch (NoSuchAlgorithmException e) {
            return new byte[]{(byte)0x12, (byte)0x34, (byte)0x56, (byte)0x78,
                             (byte)0x90, (byte)0xAB, (byte)0xCD, (byte)0xEF,
                             (byte)0xFE, (byte)0xDC, (byte)0xBA, (byte)0x09,
                             (byte)0x87, (byte)0x65, (byte)0x43, (byte)0x21};
        }
    }
    
    public static byte[] encrypt(byte[] data) {
        if (data == null || data.length == 0) {
            return data;
        }
        
        byte[] result = new byte[data.length];
        for (int i = 0; i < data.length; i++) {
            result[i] = (byte) (data[i] ^ DEFAULT_KEY[i % DEFAULT_KEY.length]);
        }
        return result;
    }
    
    public static byte[] decrypt(byte[] data) {
        return encrypt(data);
    }
    
    public static String encryptToBase64(String text) {
        if (text == null || text.isEmpty()) {
            return text;
        }
        byte[] data = text.getBytes(StandardCharsets.UTF_8);
        byte[] encrypted = encrypt(data);
        return Base64.getEncoder().encodeToString(encrypted);
    }
    
    public static String decryptFromBase64(String base64Text) {
        if (base64Text == null || base64Text.isEmpty()) {
            return base64Text;
        }
        try {
            byte[] encrypted = Base64.getDecoder().decode(base64Text);
            byte[] decrypted = decrypt(encrypted);
            return new String(decrypted, StandardCharsets.UTF_8);
        } catch (Exception e) {
            return base64Text;
        }
    }
    
    public static String encryptBytesToBase64(byte[] data) {
        if (data == null || data.length == 0) {
            return "";
        }
        byte[] encrypted = encrypt(data);
        return Base64.getEncoder().encodeToString(encrypted);
    }
    
    public static byte[] decryptBase64ToBytes(String base64Text) {
        if (base64Text == null || base64Text.isEmpty()) {
            return new byte[0];
        }
        try {
            byte[] encrypted = Base64.getDecoder().decode(base64Text);
            return decrypt(encrypted);
        } catch (Exception e) {
            return base64Text.getBytes(StandardCharsets.UTF_8);
        }
    }
}