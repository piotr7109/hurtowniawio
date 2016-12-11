import * as React from 'react';


interface Properties {
    auction:any;
}

export default class Auction extends React.Component<Properties, {}> {

    render() {
        return (
            <article className="Auction col-xs-12 col-lg-6">
                <header className="col-xs-12">
                    {this.props.auction.title}
                </header>
                <div className="content col-xs-12">
                    <div className="image col-xs-12 col-md-6">
                        <img alt="potatoes" src="/public/uploads/uploaded_images/Tulips.jpg" />
                    </div>
                    <div className="description col-xs-12 col-md-6">
                        <p>Szukana ilość: {this.props.auction.amount} kg</p>
                        <p>Data realizacji: {this.props.auction.dueDate}</p>
                        <div className="details">
                            <span>Nazwa artykułu: {this.props.auction.item.name} </span>
                            <span>Odmiana: {this.props.auction.item.typeName}</span>
                            <span>Kraj pochodzenia: {this.props.auction.item.country}</span>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}