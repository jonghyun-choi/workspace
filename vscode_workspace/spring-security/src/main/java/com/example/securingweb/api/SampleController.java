package com.example.securingweb.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
public class SampleController {
    
    @GetMapping("sample")
    public String sample() {
        String test = "this is sample";
        return test;
    }
}
