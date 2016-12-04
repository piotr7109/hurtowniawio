import React from 'react';
import Error from './error/Error';

export default class BaseComponent extends React.Component {

    constructor() {
        super();
        this.allowedUsers = [];
    }

    isUserAuthenticated() {
        let loggedUser = 'rolnik';

        return this.allowedUsers.indexOf(loggedUser) > -1;
    }

    renderHTML() {
        return (
            <div>This is main base component</div>
        );
    }

    render() {
        if(this.isUserAuthenticated()) {
            return this.renderHTML();
        } else {
            return Error.getErrorMessage();
        }
    }
}