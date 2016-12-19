import * as React from 'react';
import JsonUtils from "../../../utils/JsonUtils";
import ModalWindow from "../system/modalWindow/ModalWindow";

interface ApplicationListProps {
    auctionId: number;
    items: any;
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
            .them((response: any) => {
                let data = response.data;

                if (data) {
                    this.props.refreshHandler();
                }
            });

    }

    handleRequest(): any {
        let applicationId: number = this.selectedItem.id,
            auctionId: number = this.props.auctionId,
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

    render() {
        return (
            <div className="ApplicationList">
                <div className="application-header">
                    <span>Użytkownik</span>
                    <span>Data</span>
                    <span>Stawka</span>
                    <span>Ilość</span>
                    <span>Przyjmij ofertę</span>
                </div>
                {this.props.items.map((item: any) => {
                    let userInfo = `${item.user.login} (${item.user.status})`;

                    return (
                        <div className="application-row">
                            <span>{userInfo}</span>
                            <span>{item.date}</span>
                            <span>{item.preferredAmount}</span>
                            <span>{item.price}</span>
                            <span>
                                <i className="icon-ok"
                                   onClick={() => this.showModalWindow(item)}/>
                            </span>
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