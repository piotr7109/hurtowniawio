import {BasePage, BaseStates, BaseProps} from "../../BasePage";
import * as React from 'react';
import AuctionListItem from "../../../partials/auction/AuctionListItem";
import UserUtils from "../../../../utils/UserUtils";
import * as axios from 'axios';

export default class AuctionList extends BasePage<BaseProps, BaseStates> {

    allowedUsers = [
        UserUtils.userTypes.dostawca,
        UserUtils.userTypes.hurtownik,
        UserUtils.userTypes.rolnik
    ];

    auctions: any;

    componentWillMount(): void {
        this.state = ({
            mode: -10
        } as BaseStates);
        this.loadAuctions();
    }

    loadAuctions() {
        this.handleRequest().then((response: any) => {
            let data: any = response.data;

            if (data) {
                this.auctions = data;
                this.updateMode(0);
            } else {
                this.updateMode(-1);
            }
        });
    }

    handleRequest(): any {
        return axios({
            method: "get",
            url: "/getActiveAuctions"
        });
    }

    renderHTML() {
            return (
                <div className="AuctionList">
                    {this.auctions.map((auction: any) => {
                        return (
                            <AuctionListItem auction={auction} key={auction.title}/>
                        );
                    })}
                </div>
            );
    }
}