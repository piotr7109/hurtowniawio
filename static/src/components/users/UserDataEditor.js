import React from 'react';
import {Link} from 'react-router';
import RegisterForm from './../authentication/RegisterForm';
import {BasicInputControl, BasicSubmitControl} from './../forms/controls/BasicInputControl';
import UserUtils from './../../utils/UserUtils';

export default class UserDataEditor extends RegisterForm {

    formControls = [
        {name: 'login', text: 'Login', type: 'text', value: UserUtils.loggedUser.login},
        {name: 'password', text: 'Hasło', type: 'password', value: ''},
        {name: 'firstName', text: 'Imię', type: 'text', value: UserUtils.loggedUser.firstName},
        {name: 'lastName', text: 'Nazwisko', type: 'text', value: UserUtils.loggedUser.lastName},
        {name: 'address', text: 'Adres', type: 'text', value: UserUtils.loggedUser.address},
        {name: 'email', text: 'E-mail', type: 'email', value: UserUtils.loggedUser.email},
    ];

    constructor() {
        super();

        this.allowedUsers = [
            this.userTypes.rolnik,
            this.userTypes.hurtownik,
            this.userTypes.dostawca,
            this.userTypes.admin
        ];
    }

    handleSubmit(event) {
        this.handleFormEvents(event, '/updateUser', 'post').then((response) => {
            let data = response.data,
                newMode = data ? 1 : -1;

            if (data) {
                UserUtils.loggedUser = data;
            }

            this.setState({mode: newMode});
        });
    }

    getForm() {
        return (
            <form className="RegisterForm navbar-form" onSubmit={this.handleSubmit.bind(this)} role="register">
                <div className="form-group">
                    {this.formControls.map((item) => {
                        return (<BasicInputControl
                            name={item.name}
                            type={item.type}
                            text={item.text}
                            value={item.value}
                            key={item.name}/>);
                    })}
                </div>
                <BasicSubmitControl text="Edytuj"/>
            </form>
        );
    }

    getSuccessMessage() {
        return (
            <div>
                Dane zostały zmienione!
                <Link to="/">Wróć na stronę głóną</Link>
            </div>
        );
    }

}