package com.cg;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;



@SpringBootApplication
public class JwtAuthenticationWithJpaApplication {

	public static void main(String[] args) {
		SpringApplication.run(JwtAuthenticationWithJpaApplication.class, args);
	}

}
