package com.offercat.user.infrastructure.common;

import lombok.Data;

/**
 * 统一响应结果类
 * 用于封装API响应数据
 */
@Data
public class ResponseResult<T> {
    
    /**
     * 响应状态码
     */
    private int code;
    
    /**
     * 响应消息
     */
    private String message;
    
    /**
     * 响应数据
     */
    private T data;
    
    /**
     * 成功响应
     */
    public static <T> ResponseResult<T> success(T data) {
        ResponseResult<T> result = new ResponseResult<>();
        result.setCode(200);// 成功状态码
        result.setMessage("success");
        result.setData(data);
        return result;
    }
    
    /**
     * 成功响应（无数据）
     */
    public static <T> ResponseResult<T> success() {
        return success(null);
    }
    
    /**
     * 错误响应
     */
    public static <T> ResponseResult<T> error(int code, String message) {
        ResponseResult<T> result = new ResponseResult<>();
        result.setCode(code);
        result.setMessage(message);
        result.setData(null);
        return result;
    }

    /**
     * 错误响应 (默认状态码 500)
     */
    public static <T> ResponseResult<T> error(String message) {
        return error(500, message);
    }
    
    /**
     * 参数错误响应
     */
    public static <T> ResponseResult<T> badRequest(String message) {
        return error(400, message);
    }
    
    /**
     * 未找到资源响应
     */
    public static <T> ResponseResult<T> notFound(String message) {
        return error(404, message);
    }
    
    /**
     * 服务器内部错误响应
     */
    public static <T> ResponseResult<T> internalError(String message) {
        return error(500, message);
    }
}