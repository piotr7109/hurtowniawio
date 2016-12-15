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

    postConstruct() {
        this.loadAuctions();
    }

    componentWillMount(): BaseStates {
        return ({
            mode: -10
        } as BaseStates);
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
        if (this.state.mode === 0) {
            return (
                <div className="AuctionList">
                    {this.auctions.map((auction: any) => {
                        return (
                            <AuctionListItem auction={auction} key={auction.title}/>
                        );
                    })}
                </div>
            );
        } else if (this.state.mode === -10) {
            return <div>Loading</div>;
        }
    }
}