package com.beef.core.utils;

import com.beef.domian.user.User;

import javax.servlet.http.HttpSession;

public class UserUtils {

    public static boolean isUserAuthenticated(HttpSession session) {
        return getSessionUser(session) != null;
    }

    public static boolean checkUserType(HttpSession session, String type) {
        User authenticatedUser = getSessionUser(session);

        if (authenticatedUser != null) {
            if (authenticatedUser.getType().equals(type) || authenticatedUser.getType().equals("admin")) {
                return true;
            }
        }

        return false;
    }

    public static User getSessionUser(HttpSession session) {
        return (User) session.getAttribute(Utils.sessionUserName);
    }

}
