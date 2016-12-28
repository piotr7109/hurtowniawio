import * as React from 'react';
import {Link} from 'react-router';
import UserUtils from "../../../../utils/UserUtils";
import AuctionList from "./AuctionList";
import {BaseStates} from "../../BasePage";
import UserProfile from "../../users/userProfile/UserProfile";
import ModalWindow from "../../../partials/system/modalWindow/ModalWindow";

interface States extends BaseStates {
    modalVisible: boolean;
}

export default class DeliverAuctions extends AuctionList<States> {

    allowedUsers = [UserUtils.userTypes.dostawca];
    protected requestPath = '/getUnfinishedDeliveries';

    fields: Array<string> = ['ID', 'Tytuł', 'Data', 'Artykuł', 'Ilość', 'Użytkownik', 'Szczegóły'];
    selectedUserId: any;

    componentWillMount(): void {
        this.state = ({
            mode: this.modes.loading,
            modalVisible: false
        } as States);
        this.loadAuctions();
    }

    showModal(userId: number) {
        this.switchModal();
        this.selectedUserId = userId;
    }

    switchModal() {
        this.setState({modalVisible: !this.state.modalVisible} as States);
    }

    renderHTML() {
        return (
            <div className="AuctionList generic-list">
                <div className="list-header">
                    {
                        this.fields.map(field => {
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
                            <span><Link className="icon-zoom-in" to={"/auction/"+item.id}/></span>
                        </div>
                    );
                })}
                {this.state.modalVisible &&
                <ModalWindow hide={this.switchModal.bind(this)}>
                    <UserProfile params userId={this.selectedUserId}/>
                </ModalWindow>}
            </div>
        );
    }
}