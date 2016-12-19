package com.beef.controllers.auction;

import com.beef.core.hibernate.HibernateBase;
import com.beef.core.utils.UserUtils;
import com.beef.core.utils.Utils;
import com.beef.domian.auction.Auction;
import com.beef.domian.auction.AuctionHelper;
import com.beef.domian.item.ItemHelper;
import com.beef.domian.user.User;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

public class AuctionService {

    protected static Auction addAuction(HttpSession session, String auctionData, String itemData) throws IOException {
        Auction resultAuction = null;
        HibernateBase.closeEntityManagers();

        if (UserUtils.checkUserType(session, "hurtownik")) {
            Auction auction = new ObjectMapper().readValue(auctionData, Auction.class);
            long itemId = Long.parseLong(itemData);
            User user = (User) session.getAttribute(Utils.sessionUserName);

            auction.setItem(ItemHelper.getItemById(itemId));
            auction.setUser(user);

            AuctionHelper.createAuction(auction);

            resultAuction = auction;
        }
        return resultAuction;
    }

    protected static boolean finishAuction(HttpSession session, String _auctionId, String _applicationId) {
        boolean result = false;
        HibernateBase.closeEntityManagers();

        if (UserUtils.checkUserType(session, "hurtownik")) {
            long auctionId = Long.parseLong(_auctionId);
            long applicationId = Long.parseLong(_applicationId);

            result = AuctionHelper.finishAuction(auctionId, applicationId);
        }
        return result;
    }

    protected static List<Auction> getActiveAuctions(HttpSession session) {
        HibernateBase.closeEntityManagers();
        List<Auction> auctions = null;

        if (UserUtils.checkUserType(session, "hurtownik")) {
            auctions = AuctionHelper.getActiveAuctions(true);
        } else if (UserUtils.checkUserType(session, "rolnik")) {
            auctions = AuctionHelper.getActiveAuctions(false);
        }

        return auctions;
    }
    protected static List<Auction> getArchiveAuctions(HttpSession session) {
        HibernateBase.closeEntityManagers();
        List<Auction> auctions = null;

        if (UserUtils.checkUserType(session, "hurtownik")) {
            auctions = AuctionHelper.getArchiveAuctions(true);
        }

        return auctions;
    }


    protected static Auction getAuctionById(HttpSession session, String auctionId) {
        HibernateBase.closeEntityManagers();
        Auction resultAuction = null;

        if (UserUtils.isUserAuthenticated(session)) {
            resultAuction = AuctionHelper.getAuctionById(Long.parseLong(auctionId));
        }

        return resultAuction;
    }

    protected static List<Auction> getUserAuctions(HttpSession session) {
        HibernateBase.closeEntityManagers();
        List<Auction> resultAuction = null;
        long userId = UserUtils.getSessionUser(session).getId();

        if (UserUtils.isUserAuthenticated(session)) {
            resultAuction = AuctionHelper.getUserAuctions(userId);
        }

        return resultAuction;

    }
}
