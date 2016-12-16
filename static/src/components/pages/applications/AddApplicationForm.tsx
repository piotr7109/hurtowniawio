import * as React from 'react';
import {BaseForm} from "../BaseForm";
import {BasicSubmitControl, BasicInputControl} from "../../partials/forms/controls/BasicInputControl";
import {BaseProps, BaseStates} from "../BasePage";
import ModalWindow from "../../partials/modalWindow/ModalWindow";
import JsonUtils from "../../../utils/JsonUtils";


interface AddApplicationFormProps extends BaseProps {
    hide: any;
    auctionId: number;
}

export default class AddApplicationForm extends BaseForm<AddApplicationFormProps, BaseStates> {

    allowedUsers = [
        this.userTypes.hurtownik
    ];

    formControls = [
        {name: 'preferredAmount', text: 'Ilość (kg)', type: 'number'},
        {name: 'price', text: 'Cena (zł)', type: 'number'}
    ];

    handleFormEvents(event: any) {
        event.preventDefault();

        let formData:FormData = this.getFormData(event, 'applicationData');

        formData.append('auctionId', this.props.auctionId);

        return JsonUtils.handlePOST('/addApplication', formData);
    }

    handleSubmit(event: any): any {
        this.handleFormEvents(event).then((response: any) => {
            let data = response.data;

            if (data) {
                this.updateMode(1);
                this.props.hide();
            } else {
                //this.setState({mode: -5});
            }
        });
    }

    getForm(): any {
        return (
            <form className="Form navbar-form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    <input type="hidden" value={(new Date()).toString()}/>
                    <input type="hidden" value="5"/>
                    {this.formControls.map((item) => {
                        return (<BasicInputControl
                            name={item.name}
                            type={item.type}
                            text={item.text}
                            key={item.name}
                            value=""/>);
                    })}
                    <BasicSubmitControl text='Dodaj aplikację'/>
                </div>
            </form>
        );
    }

    getSuccessMessage(): any {
        return (
            <div>
                Wziąłeś udział w przatargu!
            </div>
        );
    }

    getErrorMessage(): any {
        return (
            <div>
                Błąd!
            </div>
        );
    }

}