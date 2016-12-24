package com.beef.controllers.auction;

import com.beef.domian.auction.Auction;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@RestController
public class AuctionController {

    @PostMapping("/addAuction")
    public Auction addAuction(HttpSession session, @RequestParam("auctionData") String auctionData,
                              @RequestParam("itemData") String itemData) throws IOException {
        return AuctionService.addAuction(session, auctionData, itemData);
    }

    @PostMapping("/finishAuction")
    public boolean finishAuction(HttpSession session,
                                 @RequestParam("auctionId") String auctionId,
                                 @RequestParam("applicationId") String applicationId) {
        return AuctionService.finishAuction(session, auctionId, applicationId);
    }

    @PostMapping("/closeAuction")
    public boolean closeAuction(HttpSession session, @RequestParam("auctionId") String auctionId) {
        return AuctionService.closeAuction(session, auctionId);
    }

    @PostMapping("/startDelivery")
    public boolean startDelivery(HttpSession session, @RequestParam("auctionId") String auctionId) {
        return AuctionService.changeDeliveryStatus(session, auctionId, "A");
    }

    @PostMapping("/finishDelivery")
    public boolean finishDelivery(HttpSession session, @RequestParam("auctionId") String auctionId) {
        return AuctionService.changeDeliveryStatus(session, auctionId, "X");
    }


    @GetMapping("/getActiveAuctions")
    public List<Auction> getActiveAuctions(HttpSession session) {
        return AuctionService.getActiveAuctions(session);
    }

    @GetMapping("/getFinishedAuctions")
    public List<Auction> getFinishedAuctions(HttpSession session) {
        return AuctionService.getFinishedAuctions(session);
    }

    @GetMapping("/getUnfinishedDeliveries")
    public List<Auction> getUnfinishedDeliveries(HttpSession session) {
        return AuctionService.getUnfinishedDeliveries(session);
    }

    @PostMapping("/getAuctionById")
    public Auction getAuctionById(HttpSession session, @RequestParam("auctionId") String auctionId) {
        return AuctionService.getAuctionById(session, auctionId);
    }

    @GetMapping("/getUserAuctions")
    public List<Auction> getWholesalerAuctions(HttpSession session) {
        return AuctionService.getWholesalerAuctions(session);
    }


    @GetMapping("/getFarmerAuctions")
    public List<Auction> getFarmerAuctions(HttpSession session) {
        return AuctionService.getFarmerAuctions(session);
    }

    @PostMapping("/hasUserParticipated")
    public boolean hasUserParticipated(HttpSession session, @RequestParam("auctionId") String auctionId) {
        return AuctionService.hasUserParticipated(session, auctionId);
    }

    @PostMapping("/removeAuction")
    public void removeAuction(HttpSession session, @RequestParam("auctionId") String auctionId) {
        AuctionService.removeAuction(session, auctionId);
    }

    @GetMapping("/getFarmerWonAuctions")
    public List<Auction> getFarmerWonAuctions(HttpSession session) {
        return AuctionService.getFarmerWonAuctions(session);
    }

}
