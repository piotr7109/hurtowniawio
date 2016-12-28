import * as React from 'react';
import {Link} from 'react-router';
import {BasePage, BaseStates, BaseProps} from "../BasePage";
import JsonUtils from "../../../utils/JsonUtils";

export default class FarmerReport extends BasePage<BaseProps, BaseStates> {

    fields: Array<string> = ['ID', 'Tytuł', 'Data', 'Przedmiot', 'Ilość', 'Cena', 'Sprzedana ilość', 'Szczegóły'];
    allowedUsers: any = [this.userTypes.rolnik];
    auctions: Array<any>;

    componentWillMount(): void {
        this.state = {mode: this.modes.loading} as BaseStates;
        this.loadAuctions();
    }

    loadAuctions() {
        JsonUtils.handleGET('/getFarmerWonAuctions')
            .then((response: any) => {
                this.auctions = response.data;

                return this.auctions ? this.modes.ready : this.modes.fail;
            })
            .then((newMode: number) => this.updateMode(newMode));
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
                {
                    this.auctions.map(auction => {
                        let application = auction.applications[0];

                        return (
                            <div className="list-row" key={auction.id}>
                                <span>{auction.id}</span>
                                <span>{auction.title}</span>
                                <span>{auction.dueDate}</span>
                                <span>{auction.item.name}</span>
                                <span>{auction.amount}</span>
                                <span>{application.price}</span>
                                <span>{application.preferredAmount}</span>
                                <span><Link className="icon-zoom-in" to={"/auction/"+auction.id} /></span>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}