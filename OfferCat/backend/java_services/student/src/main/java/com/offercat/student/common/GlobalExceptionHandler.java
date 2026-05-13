package com.offercat.student.common;

import java.util.stream.Collectors;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 与用户服务对齐的全局异常：隐藏 SQL 细节，连接池/DB 不可达时返回 503 便于客户端提示与重试。
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseResult<Void> handleValidation(MethodArgumentNotValidException ex) {
        String msg = ex.getBindingResult().getFieldErrors().stream()
                .map(err -> err.getDefaultMessage())
                .collect(Collectors.joining(", "));
        return ResponseResult.error(400, msg);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseResult<Void> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseResult.error(400, ex.getMessage() != null ? ex.getMessage() : "参数错误");
    }

    @ExceptionHandler(CannotGetJdbcConnectionException.class)
    public ResponseEntity<ResponseResult<Void>> handleJdbcUnavailable(CannotGetJdbcConnectionException ex) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(ResponseResult.error(503,
                        "数据服务暂时不可用，请稍后重试。（常见原因：数据库未启动、网络不通、连接池占满）"));
    }

    @ExceptionHandler({java.sql.SQLException.class, DataAccessException.class})
    public ResponseResult<Void> handleDatabase(Exception ex) {
        return ResponseResult.error(500, "服务器繁忙，请稍后再试");
    }

    @ExceptionHandler(Exception.class)
    public ResponseResult<Void> handleOther(Exception ex) {
        return ResponseResult.error(500, "服务器繁忙，请稍后再试");
    }
}
