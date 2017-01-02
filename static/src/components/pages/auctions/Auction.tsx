import * as React from 'react';
import {Link} from "react-router";
import {BasePage, BaseStates, BaseProps} from "../BasePage";
import UserUtils from "../../../utils/UserUtils";
import JsonUtils from "../../../utils/JsonUtils";
import AuctionHelper from "./AuctionHelper";

export interface AuctionStates extends BaseStates {
    modalVisible: boolean;
}

export default class Auction extends BasePage<BaseProps, AuctionStates> {

    auction: any;

    hasUserParticipated = false;

    allowedUsers = [
        UserUtils.userTypes.dostawca,
        UserUtils.userTypes.hurtownik,
        UserUtils.userTypes.rolnik
    ];

    componentWillMount(): void {
        this.state = ({
            mode: this.modes.loading,
            modalVisible: false
        } as AuctionStates);
        AuctionHelper.setAuction(this);
        this.loadAuction();
    }

    private loadAuction() {
        let formData: FormData = new FormData(),
            auctionId = this.props.params.id;

        formData.append('auctionId', auctionId);
        return JsonUtils.handlePOST('/getAuctionById', formData)
            .then((response: any) => {
                let data: any = response.data,
                    newMode: number = data ? this.modes.ready : this.modes.fail;

                if (data) {
                    this.auction = data;
                }

                return newMode;
            })
            .then((newMode: number) => {
                if (newMode === this.modes.fail) {
                    return newMode;
                } else {
                    let formData: FormData = new FormData();

                    formData.append('auctionId', this.auction.id);
                    return JsonUtils.handlePOST('/hasUserParticipated', formData)
                        .then((response: any) => {
                            this.hasUserParticipated = response.data;
                            return newMode;
                        });
                }
            })
            .then((newMode: number) => {
                this.updateMode(newMode);
            });
    }

    public refreshHandler() {
        this.updateMode(this.modes.loading);
        return this.loadAuction();
    }

    renderHTML() {
        if (this.state.mode === this.modes.fail) {
            return <div><Link to="/">Wróc na stroną główną</Link></div>;
        } else {
            let auctionFinished = this.auction.state === 'X',
                auctionCssClass = auctionFinished ? 'Auction finished' : 'Auction ',
                isFarmer = UserUtils.checkUserType(UserUtils.userTypes.rolnik),
                isWholesaler = UserUtils.checkUserType(UserUtils.userTypes.hurtownik),
                isDeliver = UserUtils.checkUserType(UserUtils.userTypes.dostawca),
                isAdmin = UserUtils.checkUserType(UserUtils.userTypes.admin);

            return (
                <div className={auctionCssClass}>
                    <div className="header">
                        {this.auction.title}
                        <div className="finished-auction">Zakończona</div>
                    </div>
                    <div className="content">
                        <div className="left-panel">
                            <div className="image">
                                <img src={this.auction.item.imagePath}/>
                            </div>
                        </div>
                        <div className="right-panel">
                            <div className="attributes">
                                <p>Szukana ilość: {this.auction.amount} kg</p>
                                <p>Data realizacji: {this.auction.dueDate}</p>
                                <p className="details">
                                    <span>Nazwa artykułu: {this.auction.item.name} </span>
                                    <span>Odmiana: {this.auction.item.typeName}</span>
                                    <span>Kraj pochodzenia: {this.auction.item.country}</span>
                                </p>
                            </div>
                            <div className="description-wrapper">
                                <p className="description">
                                    <span>Opis:</span>
                                    <span>{this.auction.description}</span>
                                </p>
                                <div className="buttons-wrapper">
                                    {isWholesaler && !auctionFinished && AuctionHelper.getWholesalerControls()}
                                    {isFarmer && !auctionFinished && AuctionHelper.getFarmerControls()}
                                    {isDeliver && auctionFinished && AuctionHelper.getDeliverControls(this.auction.deliveryState)}
                                    {isAdmin && AuctionHelper.getAdminControls()}
                                </div>
                            </div>
                        </div>
                    </div>
                    {(isWholesaler || isDeliver) && AuctionHelper.getApplicationList()}
                    {AuctionHelper.getModalWindow()}
                </div>
            );
        }
    }
}