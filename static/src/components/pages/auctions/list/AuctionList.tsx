import {BasePage, BaseStates, BaseProps} from "../../BasePage";
import * as React from 'react';
import AuctionListItem from "../../../partials/auction/AuctionListItem";
import UserUtils from "../../../../utils/UserUtils";
import JsonUtils from "../../../../utils/JsonUtils";

export default class AuctionList extends BasePage<BaseProps, BaseStates> {

    allowedUsers = [
        UserUtils.userTypes.dostawca,
        UserUtils.userTypes.hurtownik,
        UserUtils.userTypes.rolnik
    ];

    auctions: any;

    componentWillMount(): void {
        this.state = ({
            mode: this.modes.loading
        } as BaseStates);
        this.loadAuctions();
    }

    loadAuctions() {
        JsonUtils.handleGET('/getActiveAuctions')
            .then((response: any) => {
                let data: any = response.data,
                    newMode = data ? this.modes.ready : this.modes.fail;

                if (data) {
                    this.auctions = data;
                }

                this.updateMode(newMode);
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