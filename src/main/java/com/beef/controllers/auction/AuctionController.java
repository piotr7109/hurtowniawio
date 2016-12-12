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

    @GetMapping("/getActiveAuctions")
    public List<Auction> getActiveAuctions(HttpSession session) {
        return AuctionService.getActiveAuctions(session);
    }

    @PostMapping("/getAuctionById")
    public Auction getAuctionById(HttpSession session, @RequestParam("auctionId") String auctionId) {
        return AuctionService.getAuctionById(session, auctionId);
    }
}
