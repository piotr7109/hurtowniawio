package com.beef.core.bootstrap;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class DatabaseCreation {
    public static void main(String[] args) {
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("hurtowniawioDatabaseCreate");
        EntityManager entityManager = entityManagerFactory.createEntityManager();

        entityManager.close();
        entityManagerFactory.close();
    }
}
