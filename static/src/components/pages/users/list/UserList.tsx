import * as React from 'react';
import * as axios from 'axios';
import {Link} from 'react-router';
import {BasePage, BaseStates, BaseProps} from "../../BasePage";

export default class UserList extends BasePage<BaseProps, BaseStates> {

    users: any;

    componentWillMount(): void {
        this.state = ({mode: -10} as BaseStates);
        this.loadData();
    }

    loadData() {
        axios.get('/getUsers').then((response: any) => {
            let data = response.data;

            this.users = data;
            if (data) {
                this.setState({mode: 1});
            } else {
                this.setState({mode: -1});
            }
        });
    }

    deactivateUser(user: any) {
        let formData: FormData = new FormData();

        formData.append('userId', user.id);
        axios.post('/deactivateUser', formData);
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
        if (this.state.mode === 1) {
            return (
                <table className="UserList">
                    <tbody>
                    {this.users.map((user: any) => {
                        return this.getUserRow(user);
                    })}
                    </tbody>
                </table>
            );
        } else if (this.state.mode === -10) {
            return <div>Ładowanie</div>;
        }
    }
}