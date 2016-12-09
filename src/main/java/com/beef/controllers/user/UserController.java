package com.beef.controllers.user;

import com.beef.domian.user.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.io.IOException;

@RestController
public class UserController {

    @PostMapping("/updateUser")
    public User updateUser(HttpSession session, @RequestParam("data") String userData) throws IOException {
        User user = new ObjectMapper().readValue(userData, User.class);

        return UserService.updateUser(session, user);
    }
}
