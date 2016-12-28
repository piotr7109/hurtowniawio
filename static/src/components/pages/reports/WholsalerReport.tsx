import * as React from 'react';
import {BasePage, BaseProps, BaseStates} from "../BasePage";
import {Link} from 'react-router';
import JsonUtils from "../../../utils/JsonUtils";
import * as _ from 'underscore';

export default class WholsalerReport extends BasePage<BaseProps, BaseStates> {

    fields: Array<string> = ['Przedmiot', 'Cena', 'Zakupiona ilość'];
    allowedUsers: any = [this.userTypes.hurtownik];
    auctions: Array<any>;
    items: Array<any>;

    componentWillMount(): void {
        this.state = {mode: this.modes.loading} as BaseStates;
        this.loadAuctions();
    }

    loadAuctions() {
        JsonUtils.handleGET('/getWholesalerFinishedAuctions')
            .then((response: any) => {
                this.auctions = response.data;

                return this.auctions ? this.modes.ready : this.modes.fail;
            })
            .then(() => this.loadItems())
            .then((newMode: number) => this.updateMode(newMode));
    }

    loadItems() {
        this.items = [];

        this.auctions.map(auction => {
            let item: any = _.findWhere(this.items, {id: auction.item.id});
            if (item) {
                item.price += auction.victoriousApplication.price;
                item.amount += auction.victoriousApplication.preferredAmount;
            }
            else {
                this.items.push({
                    id: auction.item.id,
                    name: auction.item.name,
                    price: auction.victoriousApplication.price,
                    amount: auction.victoriousApplication.preferredAmount
                });
            }
        })
    }

    renderHTML() {
        return (
            <div className="generic-list FarmerReport">
                <div className="list-header">
                    {
                        this.fields.map(field => {
                            return <span key={field}>{field}</span>
                        })
                    }
                </div>
                {this.items && this.items.map(item => {
                    return (
                        <div className="list-row" key={item.id}>
                            <span>{item.name}</span>
                            <span>{item.price}</span>
                            <span>{item.amount}</span>
                        </div>
                    )
                })
                }
            </div>
        );
    }
}