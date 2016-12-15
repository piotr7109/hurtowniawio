import * as React from 'react';
import {Link} from 'react-router';
import * as axios from 'axios';
import {BaseForm} from '../BaseForm';
import {BasicInputControl, BasicSubmitControl} from '../../partials/forms/controls/BasicInputControl';
import {BaseProps, BaseStates} from "../BasePage";


export default class AddItemForm extends BaseForm<BaseProps, BaseStates> {

    formControls = [
        {name: 'name', text: 'Nazwa', type: 'text'},
        {name: 'country', text: 'Kraj pochodzenia', type: 'text'},
        {name: 'typeName', text: 'Odmiana', type: 'text'},
        {name: 'image', text: 'Zdjęcie', type: 'file'}
    ];

    allowedUsers = [
        this.userTypes.hurtownik
    ];

    public handleFormEvents(event: any, url: any, method: any): any {
        event.preventDefault();

        let serialize = require('form-serialize'),
            target = event.target,
            formData = JSON.stringify(serialize(target, {hash: true})),
            imageData = document.getElementById(this.formControls[3].name).files[0],
            data: FormData = new FormData();

        data.append('data', formData);
        data.append('image', imageData);

        return axios.post(url, data);
    }

    handleSubmit(event: any): any {
        this.handleFormEvents(event, '/addItem', 'post').then((reponse: any) => {
            if (reponse.data) {
                this.updateMode(1);
            } else {
                this.updateMode(-1);
            }
        });
    }

    getForm(): any {
        return (
            <form encType='multipart/form-data' className='Form navbar-form'
                  onSubmit={this.handleSubmit.bind(this)}>
                <div className='form-group'>
                    {this.formControls.map((item) => {
                        return (<BasicInputControl
                            name={item.name}
                            type={item.type}
                            text={item.text}
                            key={item.name}
                            value=''/>);
                    })}
                    <BasicSubmitControl text='Dodaj'/>
                </div>
            </form>
        );
    }

    getSuccessMessage(): any {
        return (
            <div>
                Przedmiot został dodany do bazy przedmiotów
                <Link to='/'>Powrót na stronę główną</Link>
            </div>
        );
    }

    getErrorMessage(): any {
        return (
            <div>
                Błąd, ale nie wiem ;____;
            </div>
        );
    }

}