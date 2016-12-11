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
                <div>JEAJ</div>

            );
        }
    }
}