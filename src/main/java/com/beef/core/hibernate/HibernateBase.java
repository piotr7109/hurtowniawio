package com.beef.core.hibernate;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class HibernateBase {

    private EntityManagerFactory entityManagerFactory;

    private EntityManager entityManager;

    public HibernateBase() {
        entityManagerFactory = Persistence.createEntityManagerFactory("myDatabase");
        entityManager = entityManagerFactory.createEntityManager();
    }

    public EntityManager getEntityManager() {
        return entityManager;
    }

    public void closeEntityManagers() {
        entityManager.close();
        entityManagerFactory.close();
    }
}
