import React from 'react';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import UserUtils from './../../utils/UserUtils';
import {BasicInputControl, BasicSubmitControl} from './../forms/controls/BasicInputControl';

import BaseForm from './../forms/BaseForm';

export default class LoginForm extends BaseForm {

    handleSubmit(event) {
        this.handleFormEvents(event, '/login', 'post').then((response) => {
            let data = response.data,
                newMode = data ? 1 : -1;

            UserUtils.loggedUser = data;
            this.setState({mode: newMode});
        });
    }

    getDataObject(data) {
        return {userData: JSON.stringify(data)}
    }

    getForm() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className="navbar-form navbar-left">
                <div className="form-group">
                    <BasicInputControl text="Login" type="text" name="login"/>
                    <BasicInputControl text="Hasło" type="password" name="password"/>
                </div>
                <BasicSubmitControl text="Log in"/>
            </form>
        );
    }

    getSuccessMessage() {
        return (
            <div>
                Zalogowałeś się!
                <Link to="/kontakt">idź gdzieś (teraz to /kontakt)</Link>
            </div>
        );
    }

    getErrorMessage() {
        return <div>Złę danę</div>;
    }
}