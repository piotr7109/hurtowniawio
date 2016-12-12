package com.beef.controllers.authentication;

import com.beef.core.utils.Utils;
import com.beef.domian.user.User;
import com.beef.domian.user.UserHelper;

import javax.servlet.http.HttpSession;

public class AuthenticationService {

    public static User login(HttpSession session, User user) {
        User dbUser = UserHelper.isUserValid(user);
        System.out.print(dbUser);
        if (dbUser != null) {
            dbUser.setPassword("");
            session.setAttribute(Utils.sessionUserName, dbUser);
            return dbUser;
        } else {
            return null;
        }
    }

    public static boolean register(User user) {
        return UserHelper.createUser(user);
    }

}
