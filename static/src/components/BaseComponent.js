import React from 'react';
import ErrorNonAuthenticatedUser from './error/Errors';
import UserUtils from './../utils/UserUtils';

export default class BaseComponent extends React.Component {
    constructor() {
        super();
        this.allowedUsers = [];
    }

    isUserAuthenticated() {
        return this.allowedUsers.indexOf(UserUtils.loggedUser) > -1
            || this.allowedUsers.length === 0;
    }

    renderHTML() {
        return null;
    }

    render() {
        if (this.isUserAuthenticated()) {
            return this.renderHTML();
        } else {
            return <ErrorNonAuthenticatedUser />;
        }
    }

}