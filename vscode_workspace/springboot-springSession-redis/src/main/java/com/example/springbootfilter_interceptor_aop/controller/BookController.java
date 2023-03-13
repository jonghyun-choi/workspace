package com.example.springbootfilter_interceptor_aop.controller;

import java.net.http.HttpRequest;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.springbootfilter_interceptor_aop.model.Book;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class BookController {

    @Autowired
    BookMapper bookMapper;
    
    @GetMapping("/user/book/inqBookInfo")
    public ResponseEntity<String> inqBookInfo(HttpServletRequest request) {
        String message = "inqBookInfo!";
        List<Book> books = bookMapper.findAll();
        log.info("BookController >>> returning {}", message);
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
