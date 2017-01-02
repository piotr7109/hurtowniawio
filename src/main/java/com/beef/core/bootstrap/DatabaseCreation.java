package com.beef.core.bootstrap;

import com.beef.domian.user.User;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class DatabaseCreation {
    public static void main(String[] args) {
        EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("hurtowniawioDatabaseCreate");
        EntityManager entityManager = entityManagerFactory.createEntityManager();

        entityManager.getTransaction().begin();
        entityManager.persist(getDefaultAdminUser());
        entityManager.getTransaction().commit();

        entityManager.close();
        entityManagerFactory.close();
    }

    private static User getDefaultAdminUser() {
        User user = new User();
        user.setLogin("admin");
        user.setPassword("admin");
        user.setFirstName("admin");
        user.setLastName("admin");
        user.setAddress("admin address");
        user.setEmail("admin@admin.pl");
        user.setStatus("A");
        user.setType("admin");

        return user;
    }
}

