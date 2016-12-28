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
                            return <span>{field}</span>
                        })
                    }
                </div>
                {
                    this.auctions.map(item => {
                        let application = item.applications[0];

                        return (
                            <div className="list-row">
                                <span>{item.id}</span>
                                <span>{item.title}</span>
                                <span>{item.dueDate}</span>
                                <span>{item.item.name}</span>
                                <span>{item.amount}</span>
                                <span>{application.price}</span>
                                <span>{application.preferredAmount}</span>
                                <span><Link className="icon-zoom-in" to={"/auction/"+item.id} /></span>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}