import * as React from 'react';
import {BasePage, BaseStates, BaseProps} from "../BasePage";
import * as axios from 'axios';
import UserUtils from "../../../utils/UserUtils";
import AddApplicationForm from "../applications/AddApplicationForm";
import ModalWindow from "../../partials/modalWindow/ModalWindow";

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
            mode: -10,
            modalVisible: false
        } as AuctionStates);
        this.loadAuction();
    }

    loadAuction() {
        let formData: FormData = new FormData(),
            auctionId = this.props.params.id;

        formData.append('auctionId', auctionId);
        axios.post('/getAuctionById', formData).then((response: any) => {
            let data: any = response.data;

            if (data) {
                this.auction = data;
                this.updateMode(0);
            } else {
                this.updateMode(-1);
            }
        });
    }

    showModalWindow() {
        this.setState({modalVisible: true} as AuctionStates);
    }

    hideModalWindow() {
        this.setState({modalVisible: false} as AuctionStates);
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
                        <button onClick={() => {this.showModalWindow()}}>Dodaj aplikację</button>
                    </div>
                </div>
                {this.state.modalVisible &&
                <ModalWindow hide={this.hideModalWindow.bind(this)}>
                    <AddApplicationForm hide={this.hideModalWindow.bind(this)}/>
                </ModalWindow>}
            </div>
        );
    }
}



