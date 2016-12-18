package com.beef.controllers.application;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.io.IOException;

@RestController
public class ApplicationController {

    @PostMapping("/addApplication")
    public boolean addApplication(HttpSession session,
                                  @RequestParam("applicationData") String applicationData,
                                  @RequestParam("auctionId") String auctionId) throws IOException {
        return ApplicationService.createApplication(session, applicationData, auctionId);
    }

    @PostMapping("removeApplication")
    public boolean removeApplication(HttpSession session, @RequestParam("applicationId") String applicationId) throws IOException {
        return ApplicationService.removeApplication(session, applicationId);
    }
}
