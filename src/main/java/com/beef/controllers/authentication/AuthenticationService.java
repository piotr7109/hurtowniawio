package com.beef.controllers.authentication;


import com.beef.core.utils.Utils;
import com.beef.domian.user.User;
import com.beef.domian.user.UserHelper;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpSession;

public class AuthenticationService {

    public static User login(HttpSession session, User user) {
        if (UserHelper.isUserValid(user)) {
            user.setPassword("");
            session.setAttribute(Utils.sessionUserName, user);
            return user;
        } else {
            return null;
        }
    }

    public static boolean register(User user) {
        return UserHelper.createUser(user);
    }

}
