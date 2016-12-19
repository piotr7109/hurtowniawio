import * as React from 'react';

interface ApplicationListProps {
    auctionId: number;
    items: any;
    refreshHandler: any;
}

export default class ApplicationList extends React.Component<ApplicationListProps,{}> {

    acceptOffer(item: any): any {
        let applicationId: number = item.id,
            auctionId: number = this.props.auctionId;

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
                                <button className="buttonSubmit" onClick={() => this.acceptOffer(item)}>X</button>
                            </span>
                        </div>
                    );
                })}
            </div>
        )
    }
}