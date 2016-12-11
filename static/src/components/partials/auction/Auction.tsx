import * as React from 'react';

interface States {

}

interface Properties {
    auction:any;
}

export default class Auction extends React.Component<Properties, States> {

    render() {
        return (
            <article class="auction col-xs-12 col-lg-6">
                <header class="col-xs-12">
                    {this.props.auction.title}
                </header>
                <div class="content col-xs-12">
                    <div class="image col-xs-12 col-md-6">
                        <img alt="potatoes" src="public/uploads/images/potato.jpg" />
                    </div>
                    <div class="description col-xs-12 col-md-6">
                        <p>Szukana ilość: {this.props.auction.amount} kg</p>
                        <p>Data realizacji: {this.props.auction.dueDate}</p>
                        <div class="details">
                            Nazwa artykułu: {this.props.auction.item.name} <br/>
                            Odmiana: {this.props.auction.item.typeName}<br/>
                            Kraj pochodzenia: {this.props.auction.item.country}<br/>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}