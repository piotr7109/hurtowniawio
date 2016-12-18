import * as React from 'react';

interface ApplicationListProps {
    items: any;
    refreshHandler: any;
}

export default class ApplicationList extends React.Component<ApplicationListProps,{}> {

    render() {
        return (
            <div className="ApplicationList">
                <div className="application-header">
                    <span>Użytkownik</span>
                    <span>Data</span>
                    <span>Stawka</span>
                    <span>Ilość</span>
                    <span>Operacje</span>
                </div>
                {this.props.items.map((item: any) => {
                    let userInfo = `${item.user.login} (${item.user.status})`;

                    return (
                        <div className="application-row">
                            <span>{userInfo}</span>
                            <span>{item.date}</span>
                            <span>{item.preferredAmount}</span>
                            <span>{item.price}</span>
                            <span>Przyjmij</span>
                        </div>
                    );
                })}
            </div>
        )
    }
}