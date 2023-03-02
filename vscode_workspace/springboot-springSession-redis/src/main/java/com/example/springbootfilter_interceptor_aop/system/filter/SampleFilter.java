package com.example.springbootfilter_interceptor_aop.system.filter;

import java.io.IOException;
import java.util.Objects;

import org.springframework.data.redis.core.RedisTemplate;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SampleFilter implements Filter{

    @Override
    public void doFilter(
        ServletRequest request, 
        ServletResponse response, 
        FilterChain chain
    ) throws IOException, ServletException {
        // HttpServletRequest req = (HttpServletRequest) request;
		// HttpServletResponse res = (HttpServletResponse) response;

        chain.doFilter(request, response);
    }

    @Override
	public void destroy() {
		log.info("SampleFilter destory");
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		log.info("SampleFilter init");
	}
}
