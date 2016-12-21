package com.beef.domian.auction;

import com.beef.core.hibernate.HibernateBase;
import com.beef.domian.BaseHelper;
import com.beef.domian.application.Application;

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

    public static boolean finishAuction(long auctionId, long applicationId) {
        Auction auction = HibernateBase.entityManager.find(Auction.class, auctionId);
        Application application = HibernateBase.entityManager.find(Application.class, applicationId);

        if (auction != null) {
            auction.setState("X");
            auction.setVictoriousApplication(application);
            persist(auction);
        }

        return auction != null;
    }

    public static boolean closeAuction(long auctionId) {
        Auction auction = HibernateBase.entityManager.find(Auction.class, auctionId);

        if (auction != null) {
            auction.setState("X");
            persist(auction);
        }

        return auction != null;
    }

    public static List<Auction> getActiveAuctions(boolean withApplications) {
        return getAuctions("A", withApplications);
    }

    public static List<Auction> getArchiveAuctions(boolean withApplications) {
        return getAuctions("X", withApplications);
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

    private static List<Auction> getUserAuctions(String queryValue, long userId) {
        List<Auction> auctions;
        TypedQuery<Auction> query = HibernateBase.entityManager.createQuery(queryValue, Auction.class);
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

    public static List<Auction> getWholersalerAuctions(long userId) {
        String query = "select a from Auction a where a.user.id =:userId";

        return getUserAuctions(query, userId);
    }

    public static List<Auction> getFarmerAuctions(long userId) {
        String query = "select a from Auction a inner join a.applications app where app.user.id =:userId and a.state = 'A'";

        return getUserAuctions(query, userId);
    }
 }
