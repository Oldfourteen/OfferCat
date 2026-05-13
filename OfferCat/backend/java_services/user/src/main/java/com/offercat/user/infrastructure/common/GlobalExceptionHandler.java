package com.offercat.user.infrastructure.common;

import java.util.stream.Collectors;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常处理，确保所有校验错误返回给前端的格式都是 ResponseResult
 * 【安全规范】隐藏原生 SQL 异常信息，避免将数据库结构/字段/SQL 细节暴露给前端
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
    /**
     * 处理方法参数校验异常
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseResult<Void> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errorMsg = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getDefaultMessage())
                .collect(Collectors.joining(", "));
        return ResponseResult.badRequest(errorMsg);
    }
    /**
     * 处理 IllegalArgumentException 异常
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseResult<Void> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseResult.badRequest(ex.getMessage() != null ? ex.getMessage() : "参数错误");
    }

    /**
     * 无法从连接池取得数据库连接或 DB 暂不可达：HTTP 503，便于网关/前端识别为短时不可用并进行重试或友好提示。
     */
    @ExceptionHandler(CannotGetJdbcConnectionException.class)
    public ResponseEntity<ResponseResult<Void>> handleJdbcUnavailable(CannotGetJdbcConnectionException ex) {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(ResponseResult.error(503,
                        "数据服务暂时不可用，请稍后重试。（常见原因：数据库未启动、与本机网络不通、连接池占满或被防火墙阻断）"));
    }

    /**
     * 【安全规范】处理数据库异常，隐藏原生 SQL 错误信息（不含「无法连接」场景，已由 {@link CannotGetJdbcConnectionException} 承接）
     */
    @ExceptionHandler({java.sql.SQLException.class, DataAccessException.class})
    public ResponseResult<Void> handleDatabaseException(Exception ex) {
        return ResponseResult.internalError("服务器繁忙，请稍后再试");
    }

    /**
     * 【安全规范】处理其他异常，避免把系统内部信息暴露给客户端
     */ 
    @ExceptionHandler(Exception.class)
    public ResponseResult<Void> handleException(Exception ex) {
        return ResponseResult.internalError("服务器繁忙，请稍后再试");
    }
}
