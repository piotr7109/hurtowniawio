package com.beef.controllers.user;

import com.beef.domian.user.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@RestController
public class UserController {

    @PostMapping("/updateUser")
    public User updateUser(HttpSession session, @RequestParam("data") String userData) throws IOException {
        User user = new ObjectMapper().readValue(userData, User.class);

        return UserService.updateUser(session, user);
    }

    @GetMapping("/getUsers")
    public List<User> getUsers(HttpSession session) {
        return UserService.getUsers(session);
    }

    @PostMapping("/deactivateUser")
    public void deactivateUser(HttpSession session, @RequestParam("userId") String id) throws IOException {
        UserService.changeUserStatus(session, id, "X");
    }

    @PostMapping("/activateUser")
    public void activateUser(HttpSession session, @RequestParam("userId") String id) throws IOException {
        UserService.changeUserStatus(session, id, "A");
    }

    @PostMapping("/getUserById")
    public User getUserById(HttpSession session, @RequestParam("userId") String id) {
        return UserService.getUserById(session, id);
    }

    @PostMapping("/updateUserByAdmin")
    public User updateUserByAdmin(HttpSession session,
                                  @RequestParam("data") String userData,
                                  @RequestParam("userId") String userId) throws IOException {
        User user = new ObjectMapper().readValue(userData, User.class);
        user.setId(Long.parseLong(userId));
        return UserService.updateUserByAdmin(session, user);
    }
}
