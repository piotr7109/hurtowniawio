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
        HibernateBase.closeEntityManagers();
        Auction resultAuction = null;

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
        HibernateBase.closeEntityManagers();

        if (UserUtils.checkUserType(session, "hurtownik")) {
            long auctionId = Long.parseLong(_auctionId);
            long applicationId = Long.parseLong(_applicationId);

            return AuctionHelper.finishAuction(auctionId, applicationId);
        }
        return false;
    }

    protected static boolean closeAuction(HttpSession session, String _auctionId) {
        HibernateBase.closeEntityManagers();

        if (UserUtils.checkUserType(session, "hurtownik")) {
            long auctionId = Long.parseLong(_auctionId);

            return AuctionHelper.closeAuction(auctionId);
        }
        return false;
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

    protected static List<Auction> getFinishedAuctions(HttpSession session) {
        HibernateBase.closeEntityManagers();

        if (UserUtils.checkUserType(session, "hurtownik")) {
            return AuctionHelper.getFinishedAuctions(true);
        }

        return null;
    }


    protected static Auction getAuctionById(HttpSession session, String auctionId) {
        HibernateBase.closeEntityManagers();

        if (UserUtils.isUserAuthenticated(session)) {
            return AuctionHelper.getAuctionById(Long.parseLong(auctionId));
        }

        return null;
    }

    protected static List<Auction> getWholesalerAuctions(HttpSession session) {
        HibernateBase.closeEntityManagers();

        if (UserUtils.isUserAuthenticated(session)) {
            long userId = UserUtils.getSessionUser(session).getId();
            return AuctionHelper.getWholersalerAuctions(userId);
        }
        return null;
    }

    protected static List<Auction> getFarmerAuctions(HttpSession session) {
        HibernateBase.closeEntityManagers();

        if (UserUtils.isUserAuthenticated(session)) {
            long userId = UserUtils.getSessionUser(session).getId();
            return AuctionHelper.getFarmerAuctions(userId);
        }
        return null;
    }

    public static boolean hasUserParticipated(HttpSession session, String _auctionId) {
        List<Auction> auctions = getFarmerAuctions(session);

        if (auctions != null) {
            long auctionId = Long.parseLong(_auctionId);
            for (Auction auction : auctions) {
                if (auction.getId() == auctionId) {
                    return true;
                }
            }
        }

        return false;
    }
}
