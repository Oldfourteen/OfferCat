package com.offercat.student.common;

import lombok.Data;

/**
 * 响应结果类
 * 功能：封装 API 响应结果，包含状态码、消息、数据
 * @param <T> 响应数据类型
 */
@Data
public class ResponseResult<T> {
    /**
     * 状态码
     */
    private Integer code;
    /**
     * 消息
     */
    private String msg;
    /**
     * 数据
     */
    private T data;

    public static <T> ResponseResult<T> success(T data) {
        ResponseResult<T> result = new ResponseResult<>();
        result.setCode(200);
        result.setMsg("操作成功");
        result.setData(data);
        return result;
    }
    /**
     * 成功响应，不包含数据
     * @return 成功响应结果
     */
    public static <T> ResponseResult<T> success() {
        return success(null);
    }
    /**
     * 成功响应，包含数据
     * @param data 数据
     * @return 成功响应结果
     */
    public static <T> ResponseResult<T> error(Integer code, String msg) {
        ResponseResult<T> result = new ResponseResult<>();
        result.setCode(code);
        result.setMsg(msg);
        return result;
    }
    /**
     * 错误响应，包含状态码和消息
     * @param code 状态码
     * @param msg 消息
     * @return 错误响应结果
     */
    public static <T> ResponseResult<T> error(String msg) {
        return error(500, msg);
    }
}
