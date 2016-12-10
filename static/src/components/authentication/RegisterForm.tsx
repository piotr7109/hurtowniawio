import * as React from 'react';
import {Link} from 'react-router';
import {BasicInputControl, BasicSubmitControl} from './../forms/controls/BasicInputControl';
import CustomSelect from '../forms/controls/CustomSelect';
import {BaseForm} from './../forms/BaseForm';

export class RegisterForm extends BaseForm {

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
        this.handleFormEvents(event, '/register', 'post').then((response: any) => {
            let data = response.data,
                newMode = data ? 1 : -1;

            this.setState({mode: newMode});
        });
    }

    getForm() {
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
                    <CustomSelect items={this.userTypesArray} name="type"/>
                </div>
                <BasicSubmitControl text="Rejestruj"/>
            </form>
        );
    }

    getSuccessMessage() {
        return (
            <div>
                Rejestracja przebiegła pomyślnie
                <Link to="/login">Zaloguj się</Link>
            </div>
        );
    }

    getErrorMessage() {
        return (
            <div>
                Użytkownik już istnieje, użyj innego loginu
            </div>
        );
    }
}