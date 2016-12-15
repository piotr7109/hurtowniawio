import * as React from 'react';
import * as axios from 'axios';
import {BaseForm} from "../../BaseForm";
import {BasicInputControl, BasicSubmitControl} from "../../../partials/forms/controls/BasicInputControl";
import CustomSelect from "../../../partials/forms/controls/CustomSelect";
import JsonUtils from "../../../../utils/JsonUtils";
import {BaseProps, BaseStates} from "../../BasePage";

export default class AddAuctionForm extends BaseForm<BaseProps, BaseStates> {

    componentWillMount():void {
        this.state = ({mode: -10});
        this.loadItems();
    }

    loadItems() {
        JsonUtils.getRestData('/getItems').then((response: any) => {
            let data = response.data;

            if (data) {
                data.map((item: any) => {
                    this.items.push({text: item.name, value: item.id})
                });

                this.setState({mode: 0});
            }
        });
    }

    items: any = [];

    allowedUsers = [
        this.userTypes.hurtownik
    ];

    formControls = [
        {name: 'title', text: 'Tytuł', type: 'text'},
        {name: 'amount', text: 'Ilość (kg)', type: 'text'},
        {name: 'dueDate', text: 'Data zakończenia', type: 'date'},
    ];

    descriptionField = {name: 'Description', text: 'Opis'};

    public handleFormEvents(event: any, url: any, method: any): any {
        event.preventDefault();

        let serialize = require('form-serialize'),
            target = event.target,
            data = serialize(target, {hash: true}),
            itemData = +data.item,
            auctionData,
            formData: FormData = new FormData();

        delete data.item;
        auctionData = JSON.stringify(data);

        formData.append('auctionData', auctionData);
        formData.append('itemData', itemData);

        return axios.post(url, formData);
    }

    handleSubmit(event: any): any {
        this.handleFormEvents(event, '/addAuction', 'post').then((response: any) => {
            let data = response.data;

            if (data) {
                this.setState({mode: 1});
            } else {
                this.setState({mode: -1});
            }
        });
    }

    getForm(): any {
        return (
            <form className="Form navbar-form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    {this.formControls.map((item) => {
                        return (<BasicInputControl
                            name={item.name}
                            type={item.type}
                            text={item.text}
                            key={item.name}
                            value=""/>);
                    })}
                    <CustomSelect labelText="Artykuł" name="item" items={this.items}/>
                    <BasicSubmitControl text='Dodaj przetarg'/>
                </div>
            </form>
        );
    }

    getSuccessMessage(): any {
        return (
            <div>
                Pomyślnie dodano nowy przetarg!
            </div>
        );
    }

    getErrorMessage(): any {
        return (
            <div>
                Coś poszło nie tak!
            </div>
        );
    }

}