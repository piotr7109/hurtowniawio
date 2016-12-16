import * as React from 'react';
import ErrorNonAuthenticatedUser from './error/Errors';
import UserUtils from '../../utils/UserUtils';
import {LoadingComponent} from "../partials/system/System";

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

    modes = {
        ready: 0,
        success: 1,
        fail: -1,
        loading: -10
    };

    componentWillMount(): void {
        this.state = {mode: this.modes.ready} as S;
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
        if (this.state.mode === this.modes.loading) {
            return <LoadingComponent />
        } else {
            if (this.isUserAuthenticated()) {
                return this.renderHTML();
            } else {
                return <ErrorNonAuthenticatedUser />;
            }
        }
    }

}