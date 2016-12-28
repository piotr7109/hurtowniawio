package com.beef.controllers.user;

import com.beef.core.hibernate.HibernateBase;
import com.beef.core.utils.UserUtils;
import com.beef.core.utils.Utils;
import com.beef.domian.user.User;
import com.beef.domian.user.UserHelper;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

public class UserService {

    public static User updateUser(HttpSession session, User user) {
        HibernateBase.closeEntityManagers();
        User sessionUser = UserUtils.getSessionUser(session);
        User newUser = UserHelper.updateUser(sessionUser.getId(), user);
        if (newUser != null) {
            session.setAttribute(Utils.sessionUserName, newUser);
        }

        return newUser;
    }

    public static User updateUserByAdmin(HttpSession session, User userData) {
        HibernateBase.closeEntityManagers();

        if (UserUtils.checkUserType(session, "admin")) {
            return UserHelper.updateUser(userData.getId(), userData);
        }
        return null;
    }

    public static List<User> getUsers(HttpSession session) {
        HibernateBase.closeEntityManagers();
        List<User> result = null;

        if (UserUtils.checkUserType(session, "admin")) {
            result = UserHelper.getUsers();
        }

        return result;
    }

    public static void changeUserStatus(HttpSession session, String id, String status) {
        HibernateBase.closeEntityManagers();
        if (UserUtils.checkUserType(session, "admin")) {
            UserHelper.changeUserStatus(Long.parseLong(id), status);
        }
    }

    public static User getUserById(HttpSession session, String id) {
        HibernateBase.closeEntityManagers();
        long userId = Long.parseLong(id);

        if (UserUtils.checkUserType(session, "admin") ||
                UserUtils.checkUserType(session, "hurtownik") ||
                UserUtils.checkUserType(session, "dostawca")) {
            User user = UserHelper.getUserById(userId);
            user.setPassword("");

            return user;
        }

        return null;
    }
}
