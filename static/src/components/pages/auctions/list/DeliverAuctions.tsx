import * as React from 'react';
import UserUtils from "../../../../utils/UserUtils";
import AuctionList from "./AuctionList";

export default class DeliverAuctions extends AuctionList {

    allowedUsers = [UserUtils.userTypes.dostawca];

    protected requestPath = '/getUnfinishedDeliveries';
}