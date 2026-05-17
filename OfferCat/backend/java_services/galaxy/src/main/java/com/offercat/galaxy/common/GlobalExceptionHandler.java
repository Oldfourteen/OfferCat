package com.offercat.galaxy.common;

import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

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
        log.error("[galaxy-service] 数据库连接不可用", ex);
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(ResponseResult.error(503, "数据服务暂时不可用，请确认 MySQL 与 galaxy-service 配置"));
    }

    @ExceptionHandler({java.sql.SQLException.class, DataAccessException.class})
    public ResponseResult<Void> handleDatabase(Exception ex) {
        log.error("[galaxy-service] 数据库访问异常", ex);
        String hint = ex.getMessage() != null && ex.getMessage().contains("is_enabled")
                ? "题库表缺少 is_enabled 列，请执行 starlit_question_bank.sql 建表或升级表结构"
                : "数据库查询失败，请确认已导入 starlit_pack / starlit_question 表";
        return ResponseResult.error(500, hint);
    }

    @ExceptionHandler(Exception.class)
    public ResponseResult<Void> handleOther(Exception ex) {
        log.error("[galaxy-service] 未处理异常", ex);
        String msg = ex.getMessage() != null ? ex.getMessage() : "服务器内部错误";
        return ResponseResult.error(500, msg);
    }
}
