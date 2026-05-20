package com.offercat.student.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * 存活探针。网关路由 /api/student/** 经 StripPrefix 后访问 /student/health。
 */
@RestController
@RequestMapping("/student")
public class StudentHealthController {

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "UP",
                "service", "student-service"));
    }
}
