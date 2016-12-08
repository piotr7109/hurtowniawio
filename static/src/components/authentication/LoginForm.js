import React from 'react';
import axios from 'axios';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import UserUtils from './../../utils/UserUtils';
import {BasicInputControl, BasicSubmitControl} from './../forms/BasicInputControl';

export default class LoginForm extends React.Component {

    constructor() {
        super();

        this.state = {mode: 0};
    }

    handleSubmit(event) {
        let serialize = require('form-serialize'),
            target = event.target,
            data = serialize(target, {hash: true});

        event.preventDefault();
        axios({
            method: 'post',
            url: '/login',
            params: {userData: JSON.stringify(data)}
        }).then((response) => {
            let data = response.data,
                newMode = data ? 1 : -1;

            UserUtils.loggedUser = data;
            this.setState({mode: newMode});
        });
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

    render() {
        switch (this.state.mode) {
            case 0:
                return this.getForm();
                break;
            case 1:
                return this.getSuccessMessage(this.state.mode);
                break;
            case -1:
                return (
                    <div>
                        <div>Złę danę</div>
                        {this.getForm()}
                    </div>
                );
        }
    }
}