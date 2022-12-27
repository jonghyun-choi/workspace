package com.playground.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.playground.demo.component.Company;

@Configuration
public class ApplicationConfig {
    @Value("${lx.pantos.nm}") 
    private String pantosNm;
    @Value("${lx.pantos.loc}") 
    private String pantosLoc;

    @Value("${lx.intl.nm}") 
    private String intlNm;
    @Value("${lx.intl.loc}")
    private String intlLoc;
    
    @Bean
    public Company getPantos() {
        return new Company("test", "test");
    }

    @Bean
    public Company getIntl() {
        return new Company("test", "test");
    }
}
