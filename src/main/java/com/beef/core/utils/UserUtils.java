package com.beef.core.utils;

import com.beef.domian.user.User;

import javax.servlet.http.HttpSession;

public class UserUtils {

    public static boolean isUserAuthenticated(HttpSession session) {
        User authenticatedUser = (User) session.getAttribute(Utils.sessionUserName);

        return authenticatedUser != null;
    }

    public static boolean checkUserType(HttpSession session, String type) {
        User authenticatedUser = (User) session.getAttribute(Utils.sessionUserName);

        if (authenticatedUser != null) {
            if(authenticatedUser.getType().equals(type) || authenticatedUser.getType().equals("admin")) {
                return true;
            }
        }

        return false;
    }

}
