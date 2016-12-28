import * as React from 'react';
import Auction from "./Auction";
import ModalWindow from "../../partials/system/modalWindow/ModalWindow";
import AddApplicationForm from "../applications/AddApplicationForm";
import ApplicationList from "../../partials/application/ApplicationList";
import {AuctionStates} from "./Auction";
import JsonUtils from "../../../utils/JsonUtils";

export default class AuctionHelper {

    private static auction: Auction;

    public static setAuction(auction: Auction) {
        this.auction = auction;
    }

    public static getFarmerControls() {
        if (!this.auction.hasUserParticipated) {
            return (
                <button className="buttonSubmit" onClick={() => {AuctionHelper.showModalWindow()}}>
                    Weź udział
                </button>
            );
        } else {
            return (
                <button className="buttonSubmit" onClick={() => {AuctionHelper.cancelOffer()}}>
                    ZrezyGNÓJ
                </button>
            );
        }
    }

    public static getModalWindow() {
        return (
            this.auction.state.modalVisible &&
            <ModalWindow hide={AuctionHelper.hideModalWindow.bind(this.auction)}>
                <AddApplicationForm auctionId={this.auction.auction.id}
                                    hide={AuctionHelper.hideModalWindow.bind(this.auction)}/>
            </ModalWindow>
        );
    }

    public static getApplicationList() {
        return (
            this.auction.auction.applications.length > 0 &&
            <ApplicationList auction={this.auction.auction}
                             refreshHandler={this.auction.refreshHandler.bind(this.auction)}/>
        );
    }

    public static getWholesalerControls() {
        return (
            <button className="buttonSubmit" onClick={() => {this.removeAuction()}}>
                Anuluj przetarg
            </button>
        );
    }

    public static getDeliverControls(deliveryState: string) {
        if (deliveryState === null) {
            return (
                <button className="buttonSubmit" onClick={() => {this.changeDeliveryStatus('/startDelivery')}}>
                    Rozpocznij przewóz
                </button>
            );
        } else if (deliveryState === 'A') {
            return (
                <button className="buttonSubmit" onClick={() => {this.changeDeliveryStatus('/finishDelivery')}}>
                    Zakończ przewóz
                </button>
            );
        }
    }

    public static getAdminControls() {
        return (
            <button className="buttonSubmit" onClick={() => {this.removeAuction()}}>
                Usuń przetarg (bezpowrotne!)
            </button>
        );
    }

    private static changeDeliveryStatus(url: any) {
        this.sendData(url);
    }

    private static removeAuction() {
        this.sendData('/removeAuction');
    }

    private static cancelOffer() {
        this.sendData('/removeApplication');
    }

    private static sendData(url: any) {
        let formData: FormData = new FormData();

        formData.append('auctionId', this.auction.auction.id);
        return JsonUtils.handlePOST(url, formData)
            .then(() => this.auction.refreshHandler())
    }

    private static showModalWindow() {
        AuctionHelper.auction.setState({modalVisible: true} as AuctionStates);
    }

    private static hideModalWindow() {
        AuctionHelper.auction.refreshHandler()
            .then(() => AuctionHelper.auction.setState({modalVisible: false} as AuctionStates));
    }
}