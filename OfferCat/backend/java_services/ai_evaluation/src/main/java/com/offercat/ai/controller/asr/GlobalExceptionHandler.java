package com.offercat.ai.controller.asr;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * @author: Ofteen
 * @data: 2026/4/23 - 09:14
 * @mail: oldfourteen41@gmail.com
 * @info: 简单的异常处理，让前端拿到明确的错误信息
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String,Object>> handleBadRequest(IllegalArgumentException e){
        String msg = e.getMessage();
        return ResponseEntity.badRequest().body(Map.of(
                "error", msg != null ? msg : "参数错误"
        ));
    }

    @ExceptionHandler(CannotGetJdbcConnectionException.class)
    public ResponseEntity<Map<String,Object>> handleJdbcUnavailable(CannotGetJdbcConnectionException e) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(Map.of(
                "error", "数据服务暂时不可用，请稍后重试。（常见原因：数据库未启动、网络不通、连接池占满）"
        ));
    }

    /**
     * 处理其他异常
     * 输入：异常对象
     * 输出：服务器异常响应
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String,Object>> handleServerError(Exception e){
        String msg = e.getMessage();
        return ResponseEntity.internalServerError().body(Map.of(
                "error", "服务器异常：" + (msg != null ? msg : e.getClass().getSimpleName())
        ));
    }
}
