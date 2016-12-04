package com.beef.controllers.authentication;

import com.beef.core.utils.Utils;
import com.beef.domian.user.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.IOException;

@RestController
public class AuthenticationController {

    @PostMapping("/login")
    public User login(HttpSession session, @RequestParam("userData") String userData) throws IOException {
        User user = new ObjectMapper().readValue(userData, User.class);

        return AuthenticationService.login(session, user);
    }

    @PostMapping("/register")
    public boolean regiser(@RequestParam("userData") String userData) throws IOException {
        User user = new ObjectMapper().readValue(userData, User.class);

        return AuthenticationService.register(user);
    }

    @RequestMapping("/getLoggedUser")
    public User getLoggedUser(HttpSession session) {
        return (User) session.getAttribute(Utils.sessionUserName);
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }

}
