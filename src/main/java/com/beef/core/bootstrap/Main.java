package com.beef.core.bootstrap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

@SpringBootApplication
@ComponentScan("com.beef")
public class Main {
	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}
}
