package com.example.springbootfilter_interceptor_aop.system.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;

import com.example.springbootfilter_interceptor_aop.system.filter.SampleFilter;

import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
public class FilterConfig {
    /*
    @Bean
	public ServletRegistrationBean<DefaultRequestDispatcher> wqServletRegistrationBean() {
		ServletRegistrationBean<DefaultRequestDispatcher> bean = new ServletRegistrationBean<>();

		bean.setServlet(new DefaultRequestDispatcher());
		bean.addUrlMappings("*.wq");

		bean.setName("WQRequestDispatcher");
		log.info(">>> WQRequestDispatcher Init");
		return bean;
	}
    */

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Bean
	public FilterRegistrationBean<SampleFilter> sampleFilterRegistrationBean(RedisTemplate<String, String> redisTemplate) {
		FilterRegistrationBean<SampleFilter> bean = new FilterRegistrationBean<>();

		// bean.setFilter(new SampleFilter(redisTemplate));
        bean.setFilter(new SampleFilter());
		bean.addUrlPatterns("/*");
		bean.addUrlPatterns("/user/book/inqBookInfo");
		bean.setName("SampleFilter");
		log.info(">>> SampleFilter Init");
		return bean;
	}
}
