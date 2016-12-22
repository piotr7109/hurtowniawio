package com.beef.domian.application;

import com.beef.core.hibernate.HibernateBase;
import com.beef.domian.BaseHelper;

import javax.persistence.TypedQuery;

public class ApplicationHelper extends BaseHelper {

    public static void createApplication(Application app) {
        persist(app);
    }

    public static boolean removeApplication(long auctionId, long userId) {
        String queryValue = "select app from Auction a inner join a.applications app where app.user.id = :userId and a.id = :auctionId";
        TypedQuery<Application> query = HibernateBase.entityManager.createQuery(queryValue, Application.class);
        query.setParameter("userId", userId);
        query.setParameter("auctionId", auctionId);

        try {
            Application app = query.getSingleResult();
            HibernateBase.entityManager.getTransaction().begin();
            HibernateBase.entityManager.remove(app);
            HibernateBase.entityManager.getTransaction().commit();

            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
