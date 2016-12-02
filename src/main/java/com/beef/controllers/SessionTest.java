package com.beef.controllers;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import javax.websocket.Session;

@RestController
@RequestMapping("/session")
public class SessionTest {

    @GetMapping("/save")
    public String saveSession(HttpSession session) {
        session.setAttribute("sessionObject", "dupa");

        return (String)session.getAttribute("sessionObject");
    }

    @GetMapping("/read")
    public String readAndDestroySession(HttpSession session, @RequestParam("text") String text) {

        String sessionText = (String)session.getAttribute("sessionObject");

        session.invalidate();

        return text + "   "+ sessionText;
    }

}
