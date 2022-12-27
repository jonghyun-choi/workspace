package com.javainuse;

import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootHelloWorldApplication {
	// https://www.javainuse.com/spring/boot-jwt

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(SpringBootHelloWorldApplication.class);
		app.setDefaultProperties(Collections.singletonMap("server.port", "8082"));
		app.run(args);
	}
}