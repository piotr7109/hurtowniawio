import * as React from 'react';
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router'
import Error404 from "../error/Errors";
import MainLayout from "../../template/mainLayout/MainLayout";
import {RegisterForm} from './../authentication/RegisterForm';
import {LoginForm} from './../authentication/LoginForm';
import {Logout} from './../authentication/Logout';
import {UserDataEditor} from './../users/UserDataEditor';


export default class IndexComponent extends React.Component<{}, {}> {

    render() {
         return (
            <Router history={hashHistory}>
                <Route component={MainLayout}>
                    <Route path="/login" component={LoginForm} />
                    <Route path="/register" component={RegisterForm} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/editUser" component={UserDataEditor} />
                    <Route path='/*' component={Error404}/>
                </Route>
            </Router>
        );
    }
}