import * as React from 'react';
import {Link} from 'react-router';
import {BaseForm} from '../BaseForm';
import {BasicInputControl, BasicSubmitControl} from '../../partials/forms/controls/BasicInputControl';
import {BaseProps, BaseStates} from "../BasePage";
import JsonUtils from "../../../utils/JsonUtils";
import {SuccessMessage, ErrorMessage} from "../../partials/forms/messages/Messages";


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

    public handleFormEvents(event: any, url: any): any {
        event.preventDefault();

        let formData: FormData = this.getFormData(event, 'data'),
            imageData = document.getElementById(this.formControls[3].name).files[0];

        formData.append('image', imageData);

        return JsonUtils.handlePOST(url, formData);
    }

    handleSubmit(event: any): any {
        this.handleFormEvents(event, '/addItem').then((response: any) => {
            let newMode: number = response.data ? this.modes.success : this.modes.fail;

            this.updateMode(newMode);
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
                <SuccessMessage>
                    Przedmiot został dodany do bazy przedmiotów
                </SuccessMessage>
                <Link to='/'>Powrót na stronę główną</Link>
            </div>
        );
    }

    getErrorMessage(): any {
        return (
            <ErrorMessage>
                Błąd, ale nie wiem ;____;
            </ErrorMessage>
        );
    }

}