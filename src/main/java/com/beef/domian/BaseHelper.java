package com.beef.domian;

import com.beef.core.hibernate.HibernateBase;

public class BaseHelper {
    protected static void create(Object object) {
        HibernateBase.createEntityManagers();
        HibernateBase.entityManager.getTransaction().begin();
        HibernateBase.entityManager.persist(object);
        HibernateBase.entityManager.getTransaction().commit();
        HibernateBase.closeEntityManagers();
    }
}
