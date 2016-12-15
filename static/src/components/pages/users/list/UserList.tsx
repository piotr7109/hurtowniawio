import * as React from 'react';
import * as axios from 'axios';
import {Link} from 'react-router';
import {BasePage} from "../../BasePage";

export default class UserList extends BasePage {

    users: any;
    fields: Array<string> = ['ID', 'Login', 'Typ', 'Imię', 'Nazwisko', 'Adres', 'Email', 'Status', 'Operacje'];

    postConstruct() {
        this.state = {mode: -10};
        this.loadData();
    }

    loadData() {
        return axios.get('/getUsers').then((response: any) => {
            let data = response.data;

            this.users = data;
            if (data) {
                this.setState({mode: 0});
            } else {
                this.setState({mode: -1});
            }
        });
    }

    deactivateUser(user: any) {
        let formData: FormData = new FormData();

        formData.append('userId', user.id);
        axios.post('/deactivateUser', formData)
            .then((response: any) => {
                return this.loadData()
            })
            .then(() => this.forceUpdate());
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
        if (this.state.mode === 0) {
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
        } else if (this.state.mode === -10) {
            return <div>Ładowanie</div>;
        }
    }
}