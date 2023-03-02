package com.example.springbootfilter_interceptor_aop.system.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.springbootfilter_interceptor_aop.system.interceptor.SampleInterceptor;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    
    @Override
    public void addInterceptors(InterceptorRegistry interceptorRegistry) {
        interceptorRegistry.addInterceptor(new SampleInterceptor(redisTemplate))
        .order(1)
        .addPathPatterns("/user/book/inqBookInfo")
        .addPathPatterns("/*")
        ;
    }
}
