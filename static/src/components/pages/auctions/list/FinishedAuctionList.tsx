import * as React from 'react';
import UserUtils from "../../../../utils/UserUtils";
import AuctionList from "./AuctionList";

export default class FinishedAuctionList extends AuctionList {

    allowedUsers = [
        UserUtils.userTypes.hurtownik,
        UserUtils.userTypes.dostawca
    ];

    protected requestPath = '/getFinishedAuctions';
}