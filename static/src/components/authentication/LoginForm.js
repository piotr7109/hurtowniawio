import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
import UserUtils from './../../utils/UserUtils';

export default class LoginForm extends React.Component {

    handleSubmit(event) {
        let serialize = require('form-serialize'),
            target = event.target,
            data = serialize(target, {hash: true});

        event.preventDefault();
        console.log('dupa');
        axios({
            method: 'post',
            url: '/login',
            params: {userData: JSON.stringify(data)}
        }).then((response) => {
            let data = response.data;
            UserUtils.loggedUser = data;
            browserHistory.push('/');
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="navbar-form navbar-left">
                <div className="form-group">
                    <input className="form-control" type="text" name="login"/>
                    <input className="form-control" type="password" name="password"/>
                </div>
                <input type="submit" className="ButtonSubmit" value="Log in"/>
            </form>
        );
    }
}