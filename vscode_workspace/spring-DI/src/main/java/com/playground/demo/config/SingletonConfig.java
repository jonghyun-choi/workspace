package com.playground.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.playground.demo.component.Company;

// https://www.baeldung.com/spring-bean-scopes
@Configuration
public class SingletonConfig {
    @Value("${lx.pantos.nm}") 
    private String pantosNm;
    @Value("${lx.pantos.loc}") 
    private String pantosLoc;

    @Value("${lx.intl.nm}") 
    private String intlNm;
    @Value("${lx.intl.loc}")
    private String intlLoc;
    
    @Bean(name="sgltn_pantos")
    @Scope(value=ConfigurableBeanFactory.SCOPE_SINGLETON)
    public Company getPantos() {
        return new Company(pantosNm, pantosLoc);
    }

    @Bean(name="sgltn_international")
    @Scope(value=ConfigurableBeanFactory.SCOPE_SINGLETON)
    public Company getIntl() {
        return new Company(intlNm, intlLoc);
    }
}
