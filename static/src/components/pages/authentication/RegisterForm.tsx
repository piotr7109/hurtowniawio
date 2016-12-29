import * as React from 'react';
import {BasicInputControl, BasicSubmitControl} from '../../partials/forms/controls/BasicInputControl';
import CustomSelect from './../../partials/forms/controls/CustomSelect';
import {BaseForm} from '../BaseForm';
import {BaseProps, BaseStates} from "../BasePage";
import {ErrorMessage, SuccessMessage} from "../../partials/forms/messages/Messages";

interface RegisterFormProps extends BaseProps {
    switchModals: any;
}

export class RegisterForm extends BaseForm<RegisterFormProps, BaseStates> {

    formControls = [
        {name: 'login', text: 'Login', type: 'text'},
        {name: 'password', text: 'Hasło', type: 'password'},
        {name: 'firstName', text: 'Imię', type: 'text'},
        {name: 'lastName', text: 'Nazwisko', type: 'text'},
        {name: 'address', text: 'Adres', type: 'text'},
        {name: 'email', text: 'E-mail', type: 'email'},
    ];

    userTypesArray = [
        {value: 'rolnik', text: 'Rolnik'},
        {value: 'hurtownik', text: 'Hurtownik'},
        {value: 'dostawca', text: 'Dostawca'}
    ];

    handleSubmit(event: any) {
        this.handleFormEvents(event, '/register')
            .then((response: any) => {
                let newMode = response.data ? this.modes.success : this.modes.fail;

                this.updateMode(newMode);
            });
    }

    getForm() {
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
                    <CustomSelect items={this.userTypesArray} name="type" labelText="Typ użytkownika"/>
                </div>
                <BasicSubmitControl text="Rejestruj"/>
            </form>
        );
    }

    getSuccessMessage() {
        return (
            <div>
                <SuccessMessage>Rejestracja przebiegła pomyślnie</SuccessMessage>
                <span onClick={this.props.switchModals(true, false)}>Zaloguj się</span>
            </div>
        );
    }

    getErrorMessage() {
        return (
            <ErrorMessage>
                Użytkownik już istnieje, użyj innego loginu
            </ErrorMessage>
        );
    }
}