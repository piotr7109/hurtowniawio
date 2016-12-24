import * as React from 'react';
import {Link} from 'react-router';
import {BasePage, BaseStates, BaseProps} from "../BasePage";
import JsonUtils from "../../../utils/JsonUtils";

export default class FarmerReport extends BasePage<BaseProps, BaseStates> {

    fields: Array<string> = ['ID', 'Tytuł', 'Data', 'Przedmiot', 'Ilość', 'Szczegóły'];
    allowedUsers: any = [this.userTypes.rolnik];
    auctions: Array<any>;

    componentWillMount(): void {
        this.state = {mode: this.modes.loading} as BaseStates;
        this.loadAuctions();
    }

    loadAuctions() {
        JsonUtils.handleGET('/getFarmerWonAuctions')
            .then((response: any) => {
                let data: any = response.data;

                this.auctions = data;

                return data ? this.modes.ready : this.modes.fail;
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
                        return (
                            <div className="list-row">
                                <span>{item.id}</span>
                                <span>{item.title}</span>
                                <span>{item.dueDate}</span>
                                <span>{item.item.name}</span>
                                <span>{item.amount}</span>
                                <span><Link className="icon-zoom-in" to={"/auction/"+item.id}/></span>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}