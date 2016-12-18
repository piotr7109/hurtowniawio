package com.beef.domian.application;

import com.beef.core.hibernate.HibernateBase;
import com.beef.domian.BaseHelper;

public class ApplicationHelper extends BaseHelper {

    public static void createApplication(Application app) {
        persist(app);
    }

    public static boolean removeApplication(long applicationId, long userId) {
        Application app = HibernateBase.entityManager.find(Application.class, applicationId);

        if (app != null) {
            if (app.getUser().getId() == userId) {
                HibernateBase.entityManager.getTransaction().begin();
                HibernateBase.entityManager.remove(app);
                HibernateBase.entityManager.getTransaction().commit();
                return true;
            }
        }

        return false;
    }
}
