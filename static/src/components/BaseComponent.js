import React from 'react';
import axios from 'axios';
import Error from './error/Error';

export default class BaseComponent extends React.Component {

    constructor() {
        super();
        this.setLoggedUser();
        this.state = {loggedUser: 'undefined'};
        this.allowedUsers = [];
    }

    isUserAuthenticated() {
        return this.allowedUsers.indexOf(this.state.loggedUser) > -1;
    }

    setLoggedUser() {
        return axios({
            method: 'post',
            url: '/getLoggedUser'
        }).then(() => this.setState({loggedUser: 'rolnik'}));
    }

    renderHTML() {
        return (
            <div>This is main base component</div>
        );
    }

    isComponentReady() {
        return this.state.loggedUser != 'undefined';
    }

    render() {
        if (this.isComponentReady()) {
            if (this.isUserAuthenticated()) {
                return this.renderHTML();
            } else {
                return Error.getErrorMessage();
            }
        } else {
            return null;
        }

    }
}