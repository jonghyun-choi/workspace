package com.playground.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.web.context.WebApplicationContext;

import com.playground.demo.component.Company;

@Configuration
public class WebsocketConfig {
    @Value("${lx.pantos.nm}") 
    private String pantosNm;
    @Value("${lx.pantos.loc}") 
    private String pantosLoc;

    @Value("${lx.intl.nm}") 
    private String intlNm;
    @Value("${lx.intl.loc}")
    private String intlLoc;
    
    @Bean(name="websocket_pantos")
    @Scope(scopeName="websocket", proxyMode=ScopedProxyMode.TARGET_CLASS)
    public Company getPantos() {
        return new Company(pantosNm, pantosLoc);
    }

    @Bean(name="websocket_international")
    @Scope(scopeName="websocket", proxyMode=ScopedProxyMode.TARGET_CLASS)
    public Company getIntl() {
        return new Company(intlNm, intlLoc);
    }
}
