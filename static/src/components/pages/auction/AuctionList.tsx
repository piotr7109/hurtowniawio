import {BasePage} from "../BasePage";
import * as React from 'react';
import Auction from "../../partials/auction/Auction";
import UserUtils from "../../../utils/UserUtils";
import * as axios from 'axios';

export default class AuctionList extends BasePage {

    allowedUsers = [
        UserUtils.userTypes.dostawca,
        UserUtils.userTypes.hurtownik,
        UserUtils.userTypes.rolnik
    ];

    auctions: any;

    postConstruct() {
        this.state = ({mode: -10});
        this.loadAuctions();
    }

    loadAuctions() {
        this.handleRequest().then((response: any) => {
            let data: any = response.data;

            if (data) {
                this.auctions = data;
                this.setState({mode: 0});
            } else {
                this.setState({mode: -1});
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
        if(this.state.mode === 0) {
            return (
                <div className="AuctionList">
                    {this.auctions.map((auction) => {
                        return (
                            <Auction auction={auction} key={auction.title}/>
                        );
                    })}
                </div>
            );
        } else if(this.state.mode === -10) {
            return <div>Loading</div>;
        }
    }
}