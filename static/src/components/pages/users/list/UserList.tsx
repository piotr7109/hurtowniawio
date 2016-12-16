import * as React from 'react';
import {BasePage, BaseStates, BaseProps} from "../../BasePage";
import UserUtils from "../../../../utils/UserUtils";
import JsonUtils from "../../../../utils/JsonUtils";

export default class UserList extends BasePage<BaseProps, BaseStates> {

    users: any;
    fields: Array<string> = ['ID', 'Login', 'Typ', 'Imię', 'Nazwisko', 'Adres', 'Email', 'Status', 'Operacje'];

    allowedUsers = [UserUtils.userTypes.admin];

    componentWillMount(): void {
        this.state = ({mode: this.modes.loading} as BaseStates);
        this.loadData();
    }

    loadData() {
        return JsonUtils.handleGET('/getUsers')
            .then((response: any) => {
                let data = response.data;

                this.users = data;
                if (data) {
                    this.updateMode(this.modes.ready);
                } else {
                    this.updateMode(this.modes.fail);
                }
            });
    }

    deactivateUser(user: any) {
        UserUtils.deactivateUser(user.id)
            .then((response: any) => {
                this.updateMode(this.modes.loading);
                return this.loadData()
            })
            .then(() => this.updateMode(this.modes.ready));
    }

    getUserRow(user: any) {
        return (
            <tr className="user-row">
                <td>{user.id}</td>
                <td>{user.login}</td>
                <td>{user.type}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.address}</td>
                <td>{user.email}</td>
                <td>{user.status}</td>
                <td>
                    <button className="buttonSubmit" onClick={() =>this.deactivateUser(user)}>
                        Usuń
                    </button>
                </td>
            </tr>
        );
    }

    renderHTML() {
        return (
            <table className="UserList">
                <thead>
                <tr>
                    {this.fields.map(field => {
                        return <th>{field}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                {this.users.map((user: any) => {
                    return this.getUserRow(user);
                })}
                </tbody>
            </table>
        );
    }
}