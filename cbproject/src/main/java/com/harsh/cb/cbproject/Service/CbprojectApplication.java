package com.harsh.cb.cbproject.Service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.harsh.cb.cbproject.Repository")
public class CbprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(CbprojectApplication.class, args);
	}

}
