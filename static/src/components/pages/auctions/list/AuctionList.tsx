import {BasePage, BaseStates, BaseProps} from "../../BasePage";
import * as React from 'react';
import AuctionListItem from "../../../partials/auction/AuctionListItem";
import UserUtils from "../../../../utils/UserUtils";
import JsonUtils from "../../../../utils/JsonUtils";
import Utils from "../../../../utils/Utils";

export default class AuctionList<S extends BaseStates> extends BasePage<BaseProps, S> {

    allowedUsers = [
        UserUtils.userTypes.dostawca,
        UserUtils.userTypes.hurtownik,
        UserUtils.userTypes.rolnik
    ];

    protected auctions: any;

    protected requestPath = '/getActiveAuctions';

    componentWillMount(): void {
        this.state = ({mode: this.modes.loading} as S);
        this.loadAuctions();
    }

    loadAuctions() {
        return JsonUtils.handleGET(this.requestPath)
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
                        <AuctionListItem auction={auction} key={Utils.getTimeStamp()}/>
                    );
                })}
            </div>
        );
    }
}