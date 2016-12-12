package com.beef.controllers.user;

import com.beef.core.utils.UserUtils;
import com.beef.core.utils.Utils;
import com.beef.domian.user.User;
import com.beef.domian.user.UserHelper;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

public class UserService {

    public static User updateUser(HttpSession session, User user) {
        User newUser = UserHelper.updateUser((User) session.getAttribute(Utils.sessionUserName), user);
        if (newUser != null) {
            newUser.setPassword("");
            session.setAttribute(Utils.sessionUserName, newUser);
        }
        return newUser;
    }

    public static List<User> getUsers(HttpSession session) {
        if (UserUtils.checkUserType(session, "admin")) {
            return UserHelper.getUsers();
        }
        return null;
    }

    public static void deactivateUser(HttpSession session, String id) throws IOException {
        if (UserUtils.checkUserType(session, "admin")) {
            UserHelper.deactivateUser(Long.parseLong(id));
        }
    }
}
