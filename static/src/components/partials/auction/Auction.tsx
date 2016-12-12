import * as React from 'react';
import {BasePage} from "../../pages/BasePage";
import * as axios from 'axios';
import UserUtils from "../../../utils/UserUtils";


export default class Auction extends BasePage {

    auction: any;

    allowedUsers = [
        UserUtils.userTypes.dostawca,
        UserUtils.userTypes.hurtownik,
        UserUtils.userTypes.rolnik
    ];

    postConstruct() {
        this.state = ({mode: -10});
    }

    loadAuction() {
        let formData: FormData = new FormData(),
            auctionId = this.props.params.id;

        formData.append('auctionId', auctionId);
        axios.post('/getAuctionById', formData).then((response: any) => {
            let data: any = response.data;

            if (data) {
                this.auction = data;
                this.setState({mode: 0});
            } else {
                this.setState({mode: -1});
            }
        });
    }

    renderHTML() {
        if (this.state.mode === -10) {
            this.loadAuction();
            return null;
        }
        else {
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
                        </div>
                    </div>
                </div>
            );
        }
    }
}