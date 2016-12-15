import * as React from 'react';
import ErrorNonAuthenticatedUser from './error/Errors';
import UserUtils from '../../utils/UserUtils';

export interface BaseStates {
    mode: number
}

export interface BaseProps {

}

export abstract class BasePage<P extends BaseProps, S extends BaseStates> extends React.Component<P, S> {

    constructor(public state: S, protected allowedUsers: Array<string>, protected userTypes: any) {
        super();

        this.userTypes = UserUtils.userTypes;
        this.allowedUsers = [];
    }

    componentWillMount():void {
        this.state = { mode: 0 } as S;
    }

    updateMode(mode: number) {
        this.setState({mode: mode} as S);
    }

    isUserAuthenticated() {
        return this.allowedUsers.indexOf(UserUtils.loggedUser.type) > -1
            || this.allowedUsers.length === 0
            || UserUtils.isLoggedUserAdmin();
    }

    renderHTML(): any {
        return null;
    }

    public render() {
        if(this.state.mode === -10) {
            return <div>Ładowanie</div>
        } else {
            if (this.isUserAuthenticated()) {
                return this.renderHTML();
            } else {
                return <ErrorNonAuthenticatedUser />;
            }
        }
    }

}