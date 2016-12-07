package com.beef.domian.user;

import com.beef.core.hibernate.HibernateBase;

import javax.persistence.TypedQuery;

public class UserHelper {

    public static User isUserValid(User user) {
        HibernateBase.createEntityManagers();

        TypedQuery<User> query = HibernateBase.entityManager.createQuery("select u from User u where u.login=:login and u.password=:password", User.class);
        query.setParameter("login", user.getLogin());
        query.setParameter("password", user.getPassword());

        try {
            user = query.getSingleResult();
        } catch (Exception e) {
            user = null;
        }

        HibernateBase.closeEntityManagers();
        return user;
    }

    public static boolean isUserExisting(User user) {
        HibernateBase.createEntityManagers();

        TypedQuery<User> query = HibernateBase.entityManager.createQuery("select u from User u where u.login=:login", User.class);
        query.setParameter("login", user.getLogin());

        try {
            user = query.getSingleResult();
        } catch (Exception e) {
            user = null;
        }

        HibernateBase.closeEntityManagers();

        return user != null;
    }

    public static boolean createUser(User user) {
        boolean canCreate = !isUserExisting(user);

        if (canCreate) {
            HibernateBase.createEntityManagers();
            HibernateBase.entityManager.getTransaction().begin();
            HibernateBase.entityManager.persist(user);
            HibernateBase.entityManager.getTransaction().commit();
            HibernateBase.closeEntityManagers();
        }

        return canCreate;
    }
}
