import * as React from 'react';
import {Link} from 'react-router';
import {RegisterForm} from '../authentication/RegisterForm';
import {BasicInputControl, BasicSubmitControl} from '../../partials/forms/controls/BasicInputControl';
import UserUtils from '../../../utils/UserUtils';
import {SuccessMessage} from "../../partials/forms/messages/Messages";

export class EditUserDataForm extends RegisterForm {

    formControls = [
        {name: 'login', text: 'Login', type: 'text', value: UserUtils.loggedUser.login},
        {name: 'password', text: 'Hasło', type: 'password', value: ''},
        {name: 'firstName', text: 'Imię', type: 'text', value: UserUtils.loggedUser.firstName},
        {name: 'lastName', text: 'Nazwisko', type: 'text', value: UserUtils.loggedUser.lastName},
        {name: 'address', text: 'Adres', type: 'text', value: UserUtils.loggedUser.address},
        {name: 'email', text: 'E-mail', type: 'email', value: UserUtils.loggedUser.email},
    ];

    allowedUsers = [
        this.userTypes.rolnik,
        this.userTypes.hurtownik,
        this.userTypes.dostawca
    ];

    handleSubmit(event: any) {
        this.handleFormEvents(event, '/updateUser')
            .then((response: any) => {
                let data = response.data,
                    newMode = data ? this.modes.success : this.modes.fail;

                if (data) {
                    UserUtils.loggedUser = data;
                }

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
                <SuccessMessage>Dane zostały zmienione!</SuccessMessage>
                <Link to="/">Wróć na stronę głóną</Link>
            </div>
        );
    }

}