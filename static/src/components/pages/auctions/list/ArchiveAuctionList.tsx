import * as React from 'react';
import UserUtils from "../../../../utils/UserUtils";
import AuctionList from "./AuctionList";

export default class ArchiveAuctionList extends AuctionList {

    allowedUsers = [UserUtils.userTypes.hurtownik];

    protected requestPath = '/getArchiveAuctions';
}