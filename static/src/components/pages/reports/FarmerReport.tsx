import * as React from 'react';
import {Link} from 'react-router';
import {BasePage, BaseStates, BaseProps} from "../BasePage";
import JsonUtils from "../../../utils/JsonUtils";
import {EmptyPage} from "../../partials/system/System";

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
        let auctionsEmpty: boolean = this.auctions.length === 0;

        return (
            <div className="generic-list FarmerReport">
                <div className="list-header">
                    {
                        !auctionsEmpty && this.fields.map(field => {
                            return <span key={field}>{field}</span>
                        })
                    }
                </div>
                {
                    this.auctions.map(auction => {
                        let application = auction.victoriousApplication;

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
                {auctionsEmpty && <EmptyPage />}
            </div>
        );
    }
}