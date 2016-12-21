import * as React from 'react';
import UserUtils from "../../../../utils/UserUtils";
import AuctionList from "./AuctionList";

export default class FarmerAuctionList extends AuctionList {

    allowedUsers = [UserUtils.userTypes.rolnik];

    protected requestPath = '/getFarmerAuctions';
}