import * as React from 'react';
import {BasePage, BaseStates, BaseProps} from "../BasePage";
import UserUtils from "../../../utils/UserUtils";
import AddApplicationForm from "../applications/AddApplicationForm";
import ModalWindow from "../../partials/system/modalWindow/ModalWindow";
import JsonUtils from "../../../utils/JsonUtils";
import ApplicationList from "../../partials/application/ApplicationList";

interface AuctionStates extends BaseStates {
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
        this.loadAuction();
    }

    loadAuction() {
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
                let formData: FormData = new FormData();

                formData.append('auctionId', this.auction.id);
                return JsonUtils.handlePOST('/hasUserParticipated', formData)
                    .then((response: any) => {
                        let data = response.data;

                        this.hasUserParticipated = data;
                        return newMode = data && newMode ? this.modes.success : this.modes.fail;
                    });
            })
            .then((newMode: number) => {
                this.updateMode(newMode);
            });
    }

    showModalWindow() {
        this.setState({modalVisible: true} as AuctionStates);
    }

    hideModalWindow() {
        this.loadAuction()
            .then(() => this.setState({modalVisible: false} as AuctionStates));
    }

    refreshHandler() {
        this.setState({mode: this.modes.loading} as AuctionStates);
        this.loadAuction();
    }

    private closeAuction() {
        let formData: FormData = new FormData();

        formData.append('auctionId', this.auction.id);
        JsonUtils.handlePOST('/closeAuction', formData)
            .then(() => this.refreshHandler());
    }

    private cancelOffer() {
        let formData: FormData = new FormData();

        formData.append('auctionId', this.auction.id);
        JsonUtils.handlePOST('/removeApplication', formData) //TODO
            .then(() => this.refreshHandler());
    }

    private getFarmerControls(auctionFinished: boolean) {
        if (!auctionFinished) {
            if (!this.hasUserParticipated) {
                return (
                    <button className="buttonSubmit" onClick={() => {this.showModalWindow()}}>
                        Weź udział
                    </button>
                );
            } else {
                return (
                    <button className="buttonSubmit" onClick={() => {this.cancelOffer()}}>
                        ZrezyGNÓJ
                    </button>
                );
            }
        } else {
            return null;
        }
    }

    renderHTML() {
        let auctionFinished = this.auction.state === 'X',
            auctionCssClass = auctionFinished ? 'Auction finished' : 'Auction ',
            isFarmer = UserUtils.checkUserType(UserUtils.userTypes.rolnik),
            isWholesaler = UserUtils.checkUserType(UserUtils.userTypes.hurtownik);

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
                        <p className="description">
                            <span>Opis:</span>
                            <span>{this.auction.description}</span>
                        </p>
                        {
                            isWholesaler && !auctionFinished &&
                            <button className="buttonSubmit" onClick={() => {this.closeAuction()}}>
                                Zamknij przetarg
                            </button>
                        }
                        {isFarmer && this.getFarmerControls(auctionFinished)}
                    </div>
                </div>
                {
                    isWholesaler &&
                    this.auction.applications.length > 0 &&
                    <ApplicationList auction={this.auction}
                                     refreshHandler={this.refreshHandler.bind(this)}/>
                }
                {
                    this.state.modalVisible &&
                    <ModalWindow hide={this.hideModalWindow.bind(this)}>
                        <AddApplicationForm auctionId={this.auction.id} hide={this.hideModalWindow.bind(this)}/>
                    </ModalWindow>
                }
            </div>
        );
    }
}