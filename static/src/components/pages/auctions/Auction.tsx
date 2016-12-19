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
        this.setState({mode: -10} as AuctionStates);
        this.loadAuction();
    }

    renderHTML() {
        return (
            <div className="Auction">
                <div className="header">
                    {this.auction.title}
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
                            UserUtils.checkUserType(UserUtils.userTypes.rolnik) &&
                            <button className="buttonSubmit" onClick={() => {this.showModalWindow()}}>
                                Dodaj aplikację
                            </button>
                        }
                    </div>
                </div>
                {
                    UserUtils.checkUserType(UserUtils.userTypes.hurtownik) &&
                    this.auction.applications.length > 0 &&
                    <ApplicationList auctionId={this.auction.id}
                                     items={this.auction.applications}
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