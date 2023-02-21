package com.example.springbootfilter_interceptor_aop.model;

import java.time.LocalDate;

import lombok.Data;

@Data
public class Book {
    private Long id;
    private String title;
    private Long authorId;
    private LocalDate publishedDate;
}
