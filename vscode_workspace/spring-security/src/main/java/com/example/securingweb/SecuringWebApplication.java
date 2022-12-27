package com.example.securingweb;

import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SecuringWebApplication {

	public static void main(String[] args) throws Throwable {
		SpringApplication app = new SpringApplication(SecuringWebApplication.class);
		app.setDefaultProperties(Collections.singletonMap("server.port", "8082"));
		app.run(args);
	}

}
