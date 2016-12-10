import * as React from 'react';
import ErrorNonAuthenticatedUser from './error/Errors';
import UserUtils from '../utils/UserUtils';

interface States {
    mode: Number
}

export abstract class BaseComponent extends React.Component<{}, States> {

    constructor(public state: States, protected allowedUsers: Array<string>, protected userTypes: any) {
        super();

        this.state = {mode: 0};
        this.userTypes = UserUtils.userTypes;
        this.allowedUsers = [];
    }

    isUserAuthenticated() {
        return this.allowedUsers.indexOf(UserUtils.loggedUser.type) > -1
            || this.allowedUsers.length === 0;
    }

    renderHTML(): any {
        return null;
    }

    public render() {
        if (this.isUserAuthenticated()) {
            return this.renderHTML();
        } else {
            return <ErrorNonAuthenticatedUser />;
        }
    }

}