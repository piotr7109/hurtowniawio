package com.beef.domian;

import com.beef.core.hibernate.HibernateBase;

public class BaseHelper {
    public static void persist(Object object) {
        HibernateBase.entityManager.getTransaction().begin();
        HibernateBase.entityManager.persist(object);
        HibernateBase.entityManager.getTransaction().commit();
    }
}
