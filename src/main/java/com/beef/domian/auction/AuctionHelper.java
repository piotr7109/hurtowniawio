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
        create(auction);
    }

    public static List<Auction> getActiveAuctions() {
        return getAuctions("A");
    }


    public static List<Auction> getAuctions(String state) {
        HibernateBase.createEntityManagers();
        List<Auction> auctions;
        TypedQuery<Auction> query = HibernateBase.entityManager.createQuery("select a from Auction a where a.state = :state", Auction.class);
        query.setParameter("state", state);

        try {
            auctions = query.getResultList();
        } catch (Exception e) {
            auctions = null;
        }

        HibernateBase.closeEntityManagers();
        return auctions;
    }
}
