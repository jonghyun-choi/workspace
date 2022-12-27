package com.example.securingweb.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import com.example.securingweb.filter.ApiFilter;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    /*
     * SecurityFilterChain
     *  - which URLs should be secured and which are not
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(
            requests -> requests.requestMatchers("/", "/home", "/api/*")
            .permitAll()
            .anyRequest()
            .authenticated()
        )
        .formLogin(
            form -> form.loginPage("/login").permitAll()
        )
        .logout(
            logout -> logout.permitAll()
        );

        return http.build();
    }

    @Bean
    public FilterRegistrationBean<ApiFilter> apiFilterRegistrationBean() {
        FilterRegistrationBean<ApiFilter> bean = new FilterRegistrationBean<>();
        bean.setFilter(new ApiFilter());
        bean.addUrlPatterns("/api/*");
        bean.setName("ApiFilter");
        return bean;
    }

    @Bean
    public UserDetailsService UserDetailsService() {
        UserDetails user = User.withDefaultPasswordEncoder()
        .username("user")
        .password("password")
        .roles("USER")
        .build();

        return new InMemoryUserDetailsManager(user);
    }
}
