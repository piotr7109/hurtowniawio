package com.beef.domian.user;

import com.beef.core.hibernate.HibernateBase;
import com.beef.domian.BaseHelper;

import javax.persistence.TypedQuery;
import java.util.List;

public class UserHelper extends BaseHelper {

    public static User isUserValid(User user) {
        HibernateBase.createEntityManagers();

        TypedQuery<User> query = HibernateBase.entityManager.createQuery("select u from User u where u.login=:login and u.password=:password and u.status = 'A'", User.class);
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
            user.setStatus("A");
            create(user);
        }

        return canCreate;
    }

    public static User updateUser(User oldUser, User user) {
        User dbUser = null;

        if (!isUserExisting(user)) {
            HibernateBase.createEntityManagers();
            HibernateBase.entityManager.getTransaction().begin();
            dbUser = HibernateBase.entityManager.find(User.class, oldUser.getId());
            dbUser.updateData(user);
            HibernateBase.entityManager.getTransaction().commit();
            HibernateBase.closeEntityManagers();
        }

        return dbUser;
    }

    public static void deactivateUser(long id) {
        HibernateBase.createEntityManagers();
        HibernateBase.entityManager.getTransaction().begin();
        User dbUser = HibernateBase.entityManager.find(User.class, id);
        dbUser.setStatus("X");
        HibernateBase.entityManager.persist(dbUser);
        HibernateBase.entityManager.getTransaction().commit();
        HibernateBase.closeEntityManagers();
    }

    public static List<User> getUsers() {
        HibernateBase.createEntityManagers();
        List<User> users;
        TypedQuery<User> query = HibernateBase.entityManager.createQuery("select u from User u", User.class);

        try {
            users = query.getResultList();
        } catch (Exception e) {
            users = null;
        }

        HibernateBase.closeEntityManagers();
        return users;
    }
}
