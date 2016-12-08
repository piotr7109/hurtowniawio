import React from 'react';
import axios from 'axios';
import {BasicInputControl, BasicSubmitControl} from './../forms/controls/BasicInputControl';
import SimpleSelect from './../forms/controls/SimpleSelect';
import CustomSelect from '../forms/controls/CustomSelect';
import BaseForm from './../forms/BaseForm';
export default class RegisterForm extends BaseForm {

    formControls = [
        {name: 'login', text: 'Login', type: 'text'},
        {name: 'password', text: 'Hasło', type: 'password'},
        {name: 'firstName', text: 'Imię', type: 'text'},
        {name: 'lastName', text: 'Nazwisko', type: 'text'},
        {name: 'address', text: 'Adres', type: 'text'},
        {name: 'email', text: 'E-mail', type: 'email'},
    ];

    userTypes = [
        {value: 'rolnik', text: 'Rolnik'},
        {value: 'hurtownik', text: 'Hurtownik'},
        {value: 'dostawca', text: 'Dostawca'}
    ];

    getFormControls() {
        let controls = [];

        for (let item of this.formControls) {
            controls.push(<BasicInputControl
                name={item.name}
                type={item.type}
                text={item.text}
                key={item.name}/>);
        }

        return controls;
    }

    handleSubmit(event) {
        let serialize = require('form-serialize'),
            target = event.target,
            data = serialize(target, {hash: true});

        event.preventDefault();
        this.handleRequest(data).then(() => {

        });
    }

    getForm() {

    }

    getSuccessMessage() {

    }

    getErrorMessage() {

    }

    getUserTypes() {
        return this.userTypes;
    }

    render() {
        return (
            <form className="RegisterForm navbar-form" onSubmit={this.handleSubmit} role="register">
                <div className="form-group">
                    {this.getFormControls()}
                    <CustomSelect items={this.getUserTypes()}/>
                </div>
                <BasicSubmitControl text="Rejestruj"/>
            </form>
        );
    }
}