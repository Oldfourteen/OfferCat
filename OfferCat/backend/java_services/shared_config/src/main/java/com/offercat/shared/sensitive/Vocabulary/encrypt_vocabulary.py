#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
敏感词库加密工具
将明文词库文件加密为二进制格式，防止源码泄露

使用方法：
    python encrypt_vocabulary.py [input_dir] [output_dir]
    
    input_dir: 输入目录（包含明文词库文件）
    output_dir: 输出目录（存储加密后的文件）
    
    如果不提供参数，默认使用当前目录作为输入输出目录
"""

import os
import sys

# 基于项目特征生成的固定密钥（与Java端保持一致）
SEED = "OfferCatSensitiveWord2024"

def generate_key(seed: str) -> bytes:
    """根据字符串生成加密密钥"""
    # 使用SHA-256哈希生成密钥
    import hashlib
    hash_result = hashlib.sha256(seed.encode('utf-8')).digest()
    # 取前16字节作为密钥
    return hash_result[:16]

def xor_encrypt(data: bytes, key: bytes) -> bytes:
    """使用XOR算法加密数据"""
    result = bytearray()
    for i, byte in enumerate(data):
        result.append(byte ^ key[i % len(key)])
    return bytes(result)

def encrypt_file(input_path: str, output_path: str):
    """加密单个文件"""
    key = generate_key(SEED)
    
    try:
        # 读取原始文件内容
        with open(input_path, 'rb') as f:
            content = f.read()
        
        # 使用XOR加密
        encrypted = xor_encrypt(content, key)
        
        # 写入加密文件
        with open(output_path, 'wb') as f:
            f.write(encrypted)
        
        print(f"已加密: {input_path} -> {output_path}")
        return True
    except Exception as e:
        print(f"加密失败 {input_path}: {str(e)}")
        return False

def batch_encrypt(input_dir: str, output_dir: str):
    """批量加密目录下的所有词库文件"""
    # 确保输出目录存在
    os.makedirs(output_dir, exist_ok=True)
    
    # 遍历目录下的所有txt文件
    success_count = 0
    fail_count = 0
    
    for filename in os.listdir(input_dir):
        if filename.endswith('.txt'):
            input_path = os.path.join(input_dir, filename)
            # 将.txt后缀替换为.enc
            output_filename = filename[:-4] + '.enc'
            output_path = os.path.join(output_dir, output_filename)
            
            if encrypt_file(input_path, output_path):
                success_count += 1
            else:
                fail_count += 1
    
    print(f"\n批量加密完成")
    print(f"成功: {success_count} 个文件")
    print(f"失败: {fail_count} 个文件")

def decrypt_file(input_path: str, output_path: str):
    """解密单个文件（用于测试）"""
    key = generate_key(SEED)
    
    try:
        # 读取加密文件内容
        with open(input_path, 'rb') as f:
            encrypted = f.read()
        
        # 使用XOR解密（XOR加密可逆）
        decrypted = xor_encrypt(encrypted, key)
        
        # 写入解密文件
        with open(output_path, 'wb') as f:
            f.write(decrypted)
        
        print(f"已解密: {input_path} -> {output_path}")
        return True
    except Exception as e:
        print(f"解密失败 {input_path}: {str(e)}")
        return False

def test_encryption():
    """测试加密解密是否正常工作"""
    test_text = "测试敏感词\n色情\n暴力\n测试结束"
    key = generate_key(SEED)
    
    # 加密
    encrypted = xor_encrypt(test_text.encode('utf-8'), key)
    # 解密
    decrypted = xor_encrypt(encrypted, key)
    
    if decrypted.decode('utf-8') == test_text:
        print("✓ 加密解密测试通过")
        return True
    else:
        print("✗ 加密解密测试失败")
        return False

if __name__ == '__main__':
    print("=== 敏感词库加密工具 ===")
    print()
    
    # 先运行测试
    if not test_encryption():
        sys.exit(1)
    
    # 获取命令行参数
    if len(sys.argv) >= 3:
        input_dir = sys.argv[1]
        output_dir = sys.argv[2]
    else:
        # 默认使用Vocabulary目录作为输入输出
        input_dir = os.path.dirname(os.path.abspath(__file__))
        output_dir = input_dir
    
    print(f"输入目录: {input_dir}")
    print(f"输出目录: {output_dir}")
    print()
    
    batch_encrypt(input_dir, output_dir)
    
    print("\n=== 操作完成 ===")
    print("注意：加密后的文件为二进制格式，无法直接用文本编辑器查看")
    print("敏感词服务启动时会自动解密加载")