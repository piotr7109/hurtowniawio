import * as React from 'react';
import {Link} from 'react-router';
import UserUtils from "../../../../utils/UserUtils";
import AuctionList from "./AuctionList";
import {BaseStates} from "../../BasePage";
import UserProfile from "../../users/userProfile/UserProfile";
import ModalWindow from "../../../partials/system/modalWindow/ModalWindow";
import JsonUtils from "../../../../utils/JsonUtils";
import {EmptyPage} from "../../../partials/system/System";

interface States extends BaseStates {
    modalVisible: boolean;
}

export default class DelivererReport extends AuctionList<States> {

    allowedUsers = [UserUtils.userTypes.dostawca];
    protected requestPath = '/getUnfinishedDeliveries';

    fields: Array<string> = ['ID', 'Tytuł', 'Data', 'Artykuł', 'Ilość', 'Użytkownik', 'Operacje'];
    selectedUserId: any;

    componentWillMount(): void {
        this.state = ({
            mode: this.modes.loading,
            modalVisible: false
        } as States);
        this.loadAuctions();
    }

    deliverPackage(auctionId: number) {
        let formData: FormData = new FormData();

        this.updateMode(this.modes.loading);
        formData.append('auctionId', auctionId);
        JsonUtils.handlePOST('/finishDelivery', formData)
            .then(() => this.loadAuctions());
    }

    showModal(userId: number) {
        this.switchModal();
        this.selectedUserId = userId;
    }

    switchModal() {
        this.setState({modalVisible: !this.state.modalVisible} as States);
    }

    renderHTML() {
        let auctionsEmpty: boolean = this.auctions.length === 0;

        return (
            <div className="AuctionList generic-list">
                <div className="list-header">
                    {
                        !auctionsEmpty && this.fields.map(field => {
                            return <span>{field}</span>
                        })
                    }
                </div>
                {this.auctions.map((item: any) => {
                    let victoriousUser = item.victoriousApplication.user;
                    return (
                        <div className="list-row">
                            <span>{item.id}</span>
                            <span>{item.title}</span>
                            <span>{item.dueDate}</span>
                            <span>{item.item.name}</span>
                            <span>{item.amount}</span>
                            <span>
                                <span className="icon-zoom-in" onClick={() => this.showModal(victoriousUser.id)}>
                                    {victoriousUser.login}
                                </span>
                            </span>
                            <span>
                                <Link className="icon-zoom-in" to={"/auction/"+item.id}/>
                                <i className="icon-truck" onClick={() => this.deliverPackage(item.id)}/>
                            </span>
                        </div>
                    );
                })}
                {auctionsEmpty && <EmptyPage />}
                {this.state.modalVisible &&
                <ModalWindow hide={this.switchModal.bind(this)}>
                    <UserProfile userId={this.selectedUserId}/>
                </ModalWindow>}
            </div>
        );
    }
}