package com.beef.domian.auction;

import com.beef.core.hibernate.HibernateBase;
import com.beef.domian.BaseHelper;
import com.beef.domian.application.Application;
import org.hibernate.Hibernate;

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
        auction.clearUser();
        return auction;
    }

    public static List<Auction> getActiveAuctions() {
        return getAuctions("A");
    }

    public static List<Auction> getAuctions(String state) {
        List<Auction> auctions;
        TypedQuery<Auction> query = HibernateBase.entityManager.createQuery("select a from Auction a where a.state = :state", Auction.class);
        query.setParameter("state", state);

        try {
            auctions = query.getResultList();
            auctions.forEach(auction -> auction.clearUser());
        } catch (Exception e) {
            auctions = null;
        }

        return auctions;
    }
}
