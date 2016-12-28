import * as React from 'react';
import {BasePage, BaseStates, BaseProps} from "../../BasePage";
import JsonUtils from "../../../../utils/JsonUtils";
import UserUtils from "../../../../utils/UserUtils";

interface Props extends BaseProps {
    userId?: any;
}

export default class UserProfile extends BasePage<Props, BaseStates> {

    user: any;

    componentWillMount() {
        this.state = {mode: this.modes.loading} as BaseStates;
        this.loadData();
    }

    loadData() {
        let userId = this.props.params ? this.props.params.id : this.props.userId;

        if (UserUtils.loggedUser.type === UserUtils.userTypes.rolnik || !userId) {
            this.user = UserUtils.loggedUser;
            this.updateMode(this.modes.ready);
        } else {
            this.handleRequest(userId)
                .then((response: any) => {
                    this.user = response.data;

                    return this.user ? this.modes.ready : this.modes.fail;
                })
                .then((newMode: number) => this.updateMode(newMode));
        }
    }

    handleRequest(userId: number): any {
        let formData: FormData = new FormData();

        formData.append('userId', userId);

        return JsonUtils.handlePOST('/getUserById', formData);
    }

    renderHTML() {
        return (
            <div className="UserProfile">
                <div className="user-profile-header">
                    Dane użytkownika {this.user.firstName +' '+ this.user.lastName}
                </div>
                <div className="user-row">
                    <span>Login</span>
                    <span>{this.user.login}</span>
                </div>
                <div className="user-row">
                    <span>Imię</span>
                    <span>{this.user.firstName}</span>
                </div>
                <div className="user-row">
                    <span>Nazwisko</span>
                    <span>{this.user.lastName}</span>
                </div>
                <div className="user-row">
                    <span>E-mail</span>
                    <span>{this.user.email}</span>
                </div>
                <div className="user-row">
                    <span>Adres</span>
                    <span>{this.user.address}</span>
                </div>
                <div className="user-row">
                    <span>Typ konta</span>
                    <span>{this.user.type}</span>
                </div>
            </div>
        );
    }
}