import * as React from 'react';
import UserUtils from "../../../../utils/UserUtils";
import AuctionList from "./AuctionList";

export default class UserAuctionList extends AuctionList {

    allowedUsers = [UserUtils.userTypes.hurtownik];

    protected requestPath = '/getUserAuctions';
}