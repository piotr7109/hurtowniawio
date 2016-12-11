import * as React from 'react';
import {BaseForm} from "../../BaseForm";
import {BasicInputControl} from "../../../partials/forms/controls/BasicInputControl";
import CustomSelect from "../../../partials/forms/controls/CustomSelect";
import JsonUtils from "../../../../utils/JsonUtils";

export default class AddAuctionForm extends BaseForm {

    postConstruct() {
        this.state = ({mode: -10});
        this.loadItems();
    }

    loadItems() {
        JsonUtils.getRestData('/getItems').then((response: any) => {
            let data = response.data;

            if (data) {
               /* data.map((item: any) => {
                    this.items.push({})
                });*/
                this.setState({mode: 0});
            }
        });
    }

    items: any [];

    allowedUsers = [
        this.userTypes.hurtownik
    ];

    formControls = [
        {name: 'title', text: 'Tytuł', type: 'text'},
        {name: 'amount', text: 'Ilość (kg)', type: 'text'},
        {name: 'dueDate', text: 'Data zakończenia', type: 'date'},
    ];

    descriptionField = {name: 'Description', text: 'Opis'};

    handleSubmit(event: any): any {
        return undefined;
    }

    getForm(): any {
        return (
            <form className="RegisterForm navbar-form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    {this.formControls.map((item) => {
                        return (<BasicInputControl
                            name={item.name}
                            type={item.type}
                            text={item.text}
                            key={item.name}
                            value=""/>);
                    })}
                </div>
            </form>
        );
    }

    getSuccessMessage(): any {
        return undefined;
    }

    getErrorMessage(): any {
        return null;
    }

}