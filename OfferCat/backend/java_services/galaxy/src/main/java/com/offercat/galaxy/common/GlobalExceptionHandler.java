package com.offercat.galaxy.common;

import java.util.stream.Collectors;
import org.apache.ibatis.exceptions.PersistenceException;
import org.mybatis.spring.MyBatisSystemException;
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
        String rootMsg = unwrapCauseMessage(ex);
        String hint = rootMsg != null && rootMsg.contains("is_enabled")
                ? "题库表缺少 is_enabled 列，请执行 starlit_question_bank.sql 建表或升级表结构"
                : "数据库查询失败，请确认已导入 starlit_pack、starlit_question、user_personal_galaxy、user_starlit_progress 等表且连接配置正确";
        if (rootMsg != null && (rootMsg.contains("Unknown column") || rootMsg.contains("doesn't exist"))) {
            hint = "数据库结构与当前服务不一致: " + rootMsg;
        }
        return ResponseResult.error(500, hint);
    }

    @ExceptionHandler({MyBatisSystemException.class, PersistenceException.class})
    public ResponseResult<Void> handleMyBatis(RuntimeException ex) {
        Throwable cause = ex.getCause() != null ? ex.getCause() : ex;
        log.error("[galaxy-service] MyBatis 访问异常", ex);
        if (cause instanceof java.sql.SQLException sqlEx) {
            return handleDatabase(sqlEx);
        }
        if (cause instanceof DataAccessException dae) {
            return handleDatabase(dae);
        }
        String msg = cause.getMessage() != null ? cause.getMessage() : "数据访问失败";
        return ResponseResult.error(500, msg);
    }

    @ExceptionHandler(Exception.class)
    public ResponseResult<Void> handleOther(Exception ex) {
        log.error("[galaxy-service] 未处理异常", ex);
        String msg = unwrapCauseMessage(ex);
        if (msg == null || msg.isBlank()) {
            msg = "服务器内部错误";
        }
        return ResponseResult.error(500, msg);
    }

    private static String unwrapCauseMessage(Throwable ex) {
        if (ex == null) {
            return null;
        }
        Throwable cur = ex;
        for (int i = 0; i < 8 && cur.getCause() != null && cur.getCause() != cur; i++) {
            cur = cur.getCause();
        }
        String m = cur.getMessage();
        return m != null ? m : ex.getMessage();
    }
}
