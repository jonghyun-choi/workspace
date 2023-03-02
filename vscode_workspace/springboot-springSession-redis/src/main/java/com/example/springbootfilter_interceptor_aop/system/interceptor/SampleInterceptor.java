package com.example.springbootfilter_interceptor_aop.system.interceptor;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Spliterator;
import java.util.Spliterators;
import java.util.stream.StreamSupport;

import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class SampleInterceptor implements HandlerInterceptor {
    final static private String ATTRIBUTE_NAME = "testValue";

    private RedisTemplate<String, Object> redisTemplate;

    public SampleInterceptor(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    @Override
    public boolean preHandle(
        HttpServletRequest request,
        HttpServletResponse response,
        Object Handler
    ) throws Exception {
        HttpSession session = request.getSession(false);
        if(Objects.isNull(session))
            return false;
/*
        // redisTemplate.opsForValue().get(ses);
        // session.getId();
        ScanOptions scanOptions = ScanOptions.scanOptions().match("spring:session:sessions:*").build();
        StringRedisSerializer serializer = new StringRedisSerializer();
        try(Cursor<byte[]> cursor = redisTemplate.getConnectionFactory().getConnection().scan(scanOptions)) {
            StreamSupport.stream(Spliterators.spliteratorUnknownSize(cursor, Spliterator.ORDERED), false)
            .map(serializer::deserialize)
            .map(redisTemplate.opsForValue()::get)
            .filter(value -> value != null && value.equals("myValue"))
            .forEach(match -> System.out.println("Key: " + match.getKey() + ", Value: " + match.getValue()));
        }
*/
        return true;
    }
    
}
