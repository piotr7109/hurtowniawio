import * as React from 'react';
import JsonUtils from "../../../utils/JsonUtils";
import ModalWindow from "../system/modalWindow/ModalWindow";

interface ApplicationListProps {
    auction: any;
    refreshHandler: any;
}

interface States {
    modalVisible: boolean;
}

export default class ApplicationList extends React.Component<ApplicationListProps,States> {

    selectedItem: any;

    componentWillMount() {
        this.state = ({modalVisible: false});
    }

    acceptOffer(): any {
        this.handleRequest()
            .then((response: any) => {
                if (response.data) {
                    this.hideModalWindow();
                    this.props.refreshHandler();
                }
            });
    }

    handleRequest(): any {
        let applicationId: number = this.selectedItem.id,
            auctionId: number = this.props.auction.id,
            formData: FormData = new FormData();

        formData.append('auctionId', auctionId);
        formData.append('applicationId', applicationId);

        return JsonUtils.handlePOST('/finishAuction', formData);
    }

    showModalWindow(item: any) {
        this.selectedItem = item;
        this.setState({modalVisible: true});
    }

    hideModalWindow() {
        this.setState({modalVisible: false});
    }

    private isVictoriousApplication(item: any): any {
        let vApplication = this.props.auction.victoriousApplication;

        return vApplication && vApplication.id === item.id;
    }

    render() {
        let auctionFinished = this.props.auction.state === 'X';

        return (
            <div className="ApplicationList generic-list">
                <div className="list-header">
                    <span>Użytkownik</span>
                    <span>Data</span>
                    <span>Stawka</span>
                    <span>Ilość</span>
                    {!auctionFinished &&
                    <span>Przyjmij ofertę</span>}
                </div>
                {this.props.auction.applications.map((item: any) => {
                    let userInfo = `${item.user.login} (${item.user.status})`,
                        victoriousOfferCssClass = this.isVictoriousApplication(item) ? 'signed ' : '';

                    return (
                        <div className={victoriousOfferCssClass + "list-row"} key={item.id}>
                            <span>{userInfo}</span>
                            <span>{item.date}</span>
                            <span>{item.preferredAmount}</span>
                            <span>{item.price}</span>
                            {!auctionFinished &&
                            <span>
                                <i className="icon-ok"
                                   onClick={() => this.showModalWindow(item)}/>
                            </span>}
                        </div>
                    );
                })}
                {this.state.modalVisible &&
                <ModalWindow hide={() => this.hideModalWindow()}>
                    <div>Czy na pewno chcesz zamknąć przetarg?</div>
                    <button className="buttonSubmit" onClick={() => this.acceptOffer()}>Tak</button>
                    <button className="buttonSubmit" onClick={() =>this.hideModalWindow()}>Anuluj</button>
                </ModalWindow>
                }
            </div>
        )
    }


}