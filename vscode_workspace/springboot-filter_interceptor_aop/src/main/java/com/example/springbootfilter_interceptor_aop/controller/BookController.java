package com.example.springbootfilter_interceptor_aop.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookController {
    
    @GetMapping("/user/book/inqBookInfo")
    public void inqBookInfo() {

    }

    @PostMapping("/admin/book/addBookInfo")
    public void addBookInfo() {

    }

    @PostMapping("/admin/book/delBookInfo")
    public void delBookInfo() {

    }

    @PostMapping("/admin/book/updBookInfo")
    public void updBookInfo() {

    }
}
