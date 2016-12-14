package com.beef.controllers.authentication;

import com.beef.core.hibernate.HibernateBase;
import com.beef.core.utils.Utils;
import com.beef.domian.user.User;
import com.beef.domian.user.UserHelper;

import javax.servlet.http.HttpSession;

public class AuthenticationService {

    public static User login(HttpSession session, User user) {
        HibernateBase.closeEntityManagers();
        User result = null;
        User dbUser = UserHelper.isUserValid(user);

        if (dbUser != null) {
            session.setAttribute(Utils.sessionUserName, dbUser);
            result =  new User(dbUser);
        }

        return result;
    }

    public static boolean register(User user) {
        HibernateBase.closeEntityManagers();
        boolean result = UserHelper.createUser(user);
        return result;
    }

    public static User getLoggedUser(HttpSession session) {
        return new User((User) session.getAttribute(Utils.sessionUserName));
    }

}
