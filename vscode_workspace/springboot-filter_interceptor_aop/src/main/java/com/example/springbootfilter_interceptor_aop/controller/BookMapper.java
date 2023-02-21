package com.example.springbootfilter_interceptor_aop.controller;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.example.springbootfilter_interceptor_aop.model.Book;

@Mapper
public interface BookMapper {

    @Select("SELECT * FROM books")
    List<Book> findAll();

    @Select("SELECT * FROM books WHERE id = #{id}")
    Book findById(Long id);

    @Insert("INSERT INTO books (title, author_id, published_date) VALUES (#{title}, #{authorId}, #{publishedDate})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    void insert(Book book);

    @Update("UPDATE books SET title = #{title}, author_id = #{authorId}, published_date = #{publishedDate} WHERE id = #{id}")
    void update(Book book);

    @Delete("DELETE FROM books WHERE id = #{id}")
    void delete(Long id);
}

