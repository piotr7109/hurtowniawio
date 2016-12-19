package com.beef.domian.auction;

import com.beef.core.hibernate.HibernateBase;
import com.beef.domian.BaseHelper;

import javax.persistence.TypedQuery;
import java.util.Date;
import java.util.List;

public class AuctionHelper extends BaseHelper {

    public static void createAuction(Auction auction) {
        auction.setCreationDate(new Date());
        auction.setState("A");
        persist(auction);
    }

    public static Auction getAuctionById(long id) {
        Auction auction = HibernateBase.entityManager.find(Auction.class, id);
        auction.getApplications().forEach((app) -> app.getUser().setPassword(""));
        return auction;
    }

    public static boolean finishAuction(long id) {
        Auction auction = HibernateBase.entityManager.find(Auction.class, id);

        if (auction != null) {
            auction.setState("X");
            persist(auction);

            return true;
        }

        return false;
    }

    public static List<Auction> getActiveAuctions(boolean widthApplications) {
        return getAuctions("A", widthApplications);
    }

    public static List<Auction> getAuctions(String state, boolean withApplications) {
        List<Auction> auctions;
        TypedQuery<Auction> query = HibernateBase.entityManager.createQuery("select a from Auction a where a.state = :state", Auction.class);
        query.setParameter("state", state);

        try {
            auctions = query.getResultList();
            auctions.forEach(auction -> {
                auction.clearUser();
                if (!withApplications) {
                    auction.setApplications(null);
                }
            });
        } catch (Exception e) {
            auctions = null;
        }

        return auctions;
    }

    public static List<Auction> getUserAuctions(long userId) {
        List<Auction> auctions;
        TypedQuery<Auction> query = HibernateBase.entityManager.createQuery("select a from Auction a where a.user.id =:userId", Auction.class);
        query.setParameter("userId", userId);

        try {
            auctions = query.getResultList();
            auctions.forEach(auction -> {
                auction.clearUser();
                auction.setApplications(null);
            });
        }
        catch (Exception e) {
            auctions = null;
        }

        return auctions;
    }
}
