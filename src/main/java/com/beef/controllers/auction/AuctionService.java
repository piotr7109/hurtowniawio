package com.beef.controllers.auction;

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

        if (UserUtils.checkUserType(session, "hurtownik")) {
            Auction auction = new ObjectMapper().readValue(auctionData, Auction.class);
            long itemId = Long.parseLong(itemData);
            User user = (User) session.getAttribute(Utils.sessionUserName);

            auction.setItem(ItemHelper.getItemById(itemId));
            auction.setUser(user);

            AuctionHelper.createAuction(auction);

            return auction;
        }

        return null;
    }

    protected static List<Auction> getActiveAuctions(HttpSession session) {
        if (UserUtils.isUserAuthenticated(session)) {
            return AuctionHelper.getActiveAuctions();
        }

        return null;
    }

    protected static Auction getAuctionById(HttpSession session, String auctionId) {
        if (UserUtils.isUserAuthenticated(session)) {
            return AuctionHelper.getAuctionById(Long.parseLong(auctionId));
        }
        return null;
    }
}
