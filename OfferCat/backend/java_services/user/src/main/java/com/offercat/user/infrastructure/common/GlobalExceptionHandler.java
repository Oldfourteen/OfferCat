package com.offercat.user.infrastructure.common;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.stream.Collectors;

/**
 * 全局异常处理，确保所有校验错误返回给前端的格式都是 ResponseResult
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseResult<Void> handleValidationExceptions(MethodArgumentNotValidException ex) {
        String errorMsg = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getDefaultMessage())
                .collect(Collectors.joining(", "));
        return ResponseResult.badRequest(errorMsg);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseResult<Void> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseResult.badRequest(ex.getMessage() != null ? ex.getMessage() : "参数错误");
    }

    @ExceptionHandler(Exception.class)
    public ResponseResult<Void> handleException(Exception ex) {
        return ResponseResult.internalError("服务器异常：" + (ex.getMessage() != null ? ex.getMessage() : ex.getClass().getSimpleName()));
    }
}
