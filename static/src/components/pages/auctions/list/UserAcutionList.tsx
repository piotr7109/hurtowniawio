import * as React from 'react';
import {BasePage, BaseProps, BaseStates} from "../../BasePage";
import UserUtils from "../../../../utils/UserUtils";
import JsonUtils from "../../../../utils/JsonUtils";
import AuctionListItem from "../../../partials/auction/AuctionListItem";

export default class UserAuctionList extends BasePage<BaseProps, BaseStates> {

    allowedUsers = [
        UserUtils.userTypes.hurtownik
    ];

    auctions: any;

    componentWillMount(): void {
        this.state = ({
            mode: this.modes.loading
        } as BaseStates);
        this.loadAuctions();
    }

    loadAuctions() {
        JsonUtils.handleGET('/getUserAuctions')
            .then((response: any) => {
                let data: any = response.data,
                    newMode = data ? this.modes.ready : this.modes.fail;

                if (data) {
                    this.auctions = data;
                }

                this.updateMode(newMode);
            });
    }

    refreshHandler() {
        this.setState({mode: -10} as BaseStates);
        this.loadAuctions();
    }

    renderHTML() {
        return (
            <div className="AuctionList">
                {this.auctions.map((auction: any) => {
                    return (
                        <AuctionListItem auction={auction} key={auction.title} />
                    );
                })}
            </div>
        );
    }

}