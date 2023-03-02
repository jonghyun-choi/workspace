package com.example.springbootfilter_interceptor_aop.controller;

import java.net.http.HttpRequest;
import java.util.Objects;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class BookController {
    
    @GetMapping("/user/book/inqBookInfo")
    public ResponseEntity<String> inqBookInfo(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(Objects.isNull(session)) {
            session = request.getSession();
        }
        
        session.setAttribute("testKey", "testValue");
        String message = "inqBookInfo!";
        return ResponseEntity.ok().body(message);
    }

    @PostMapping("/admin/book/addBookInfo")
    public ResponseEntity<String> addBookInfo() {
        String message = "addBookInfo!";
        log.info("BookController >>> returning {}", message);
        return ResponseEntity.ok().body(message);
    }

    @PostMapping("/admin/book/delBookInfo")
    public ResponseEntity<String> delBookInfo() {
        String message = "delBookInfo!";
        return ResponseEntity.ok().body(message);
    }

    @PostMapping("/admin/book/updBookInfo")
    public ResponseEntity<String> updBookInfo() {
        String message = "updBookInfo!";
        return ResponseEntity.ok().body(message);
    }

}
