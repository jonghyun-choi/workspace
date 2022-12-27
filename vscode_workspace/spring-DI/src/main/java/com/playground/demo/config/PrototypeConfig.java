package com.playground.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import com.playground.demo.component.Company;

@Configuration
public class PrototypeConfig {
    @Value("${lx.pantos.nm}") 
    private String pantosNm;
    @Value("${lx.pantos.loc}") 
    private String pantosLoc;

    @Value("${lx.intl.nm}") 
    private String intlNm;
    @Value("${lx.intl.loc}")
    private String intlLoc;
    
    @Bean(name="proto_pantos")
    @Scope(value=ConfigurableBeanFactory.SCOPE_PROTOTYPE)
    public Company getPantos() {
        return new Company(pantosNm, pantosLoc);
    }

    @Bean(name="proto_international")
    @Scope(value=ConfigurableBeanFactory.SCOPE_PROTOTYPE)
    public Company getIntl() {
        return new Company(intlNm, intlLoc);
    }
}
