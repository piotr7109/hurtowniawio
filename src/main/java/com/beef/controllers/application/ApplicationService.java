package com.beef.controllers.application;

import com.beef.core.hibernate.HibernateBase;
import com.beef.core.utils.UserUtils;
import com.beef.domian.application.Application;
import com.beef.domian.application.ApplicationHelper;
import com.beef.domian.auction.Auction;
import com.beef.domian.auction.AuctionHelper;
import com.beef.domian.user.User;
import com.beef.domian.user.UserHelper;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Date;

public class ApplicationService {

    public static boolean removeApplication(HttpSession session, String _auctionId) {
        HibernateBase.closeEntityManagers();

        if (UserUtils.checkUserType(session, "rolnik")) {
            long userId = UserUtils.getSessionUser(session).getId();
            long auctionId = Long.parseLong(_auctionId);
            return ApplicationHelper.removeApplication(auctionId, userId);
        }

        return false;
    }

    public static boolean createApplication(HttpSession session, String applicationData, String auctionId) throws IOException {
        boolean result = false;
        HibernateBase.closeEntityManagers();

        if (UserUtils.checkUserType(session, "rolnik")) {
            Auction auction = AuctionHelper.getAuctionById(Long.parseLong(auctionId));
            User user = UserHelper.getUserById(UserUtils.getSessionUser(session).getId());
            Application app = new ObjectMapper().readValue(applicationData, Application.class);

            if (!applicationExists(auction, user) && auction.getState().equals("A")) {
                app.setUser(user);
                app.setDate(new Date());
                auction.addApplication(app);
                ApplicationHelper.createApplication(app);
                result = true;
            }
        }
        return result;
    }

    private static boolean applicationExists(Auction auction, User user) {
        boolean result = false;
        for (Application app : auction.getApplications()) {
            if (app.getUser().getId() == user.getId()) {
                result = true;
            }
        }
        return result;
    }
}
