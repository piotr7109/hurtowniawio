package com.beef.controllers.user;

import com.beef.core.utils.Utils;
import com.beef.domian.user.User;
import com.beef.domian.user.UserHelper;

import javax.servlet.http.HttpSession;

public class UserService {

    public static User updateUser(HttpSession session, User user) {
        User newUser = UserHelper.updateUser((User) session.getAttribute(Utils.sessionUserName), user);
        if (newUser != null) {
            newUser.setPassword("");
            session.setAttribute(Utils.sessionUserName, newUser);
        }
        return newUser;
    }
}
