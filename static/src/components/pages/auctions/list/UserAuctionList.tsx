import * as React from 'react';
import UserUtils from "../../../../utils/UserUtils";
import AuctionList from "./AuctionList";
import {BaseStates} from "../../BasePage";

export default class UserAuctionList extends AuctionList<BaseStates> {

    allowedUsers = [UserUtils.userTypes.hurtownik];

    protected requestPath = '/getUserAuctions';
}