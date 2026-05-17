package com.offercat.galaxy.common;

import lombok.Data;

@Data
public class ResponseResult<T> {
    private Integer code;
    private String msg;
    private T data;

    public static <T> ResponseResult<T> success(T data) {
        ResponseResult<T> r = new ResponseResult<>();
        r.setCode(200);
        r.setMsg("操作成功");
        r.setData(data);
        return r;
    }

    public static <T> ResponseResult<T> error(Integer code, String msg) {
        ResponseResult<T> r = new ResponseResult<>();
        r.setCode(code);
        r.setMsg(msg);
        return r;
    }
}
