package com.beef.core.bootstrap;

import com.beef.core.hibernate.HibernateBase;
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

        HibernateBase.createEntityManagers();
        SpringApplication.run(Main.class, args);
    }
}
