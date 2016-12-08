import React from 'react';
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router'
import MenuUtils from './../../utils/MenuUtils';
import Error404 from "../error/Errors";
import Hello from "./../hello/Hello";
import RegisterForm from './../authentication/RegisterForm';
import LoginForm from './../authentication/LoginForm';
import Logout from './../authentication/Logout';
import MainLayout from "../../template/mainLayout/MainLayout";

export default class IndexComponent extends React.Component {

    render() {
        let links = new Set();
        for (let i = 0; i < MenuUtils.menuData; i++) {
            for (let j = 0; j < MenuUtils.menuData[i]; j++) {
                links.add(MenuUtils.menuData[i]);
            }
        }

        return (
            <Router history={hashHistory}>
                <Route component={MainLayout}>
                    <Route path='/' component={Hello}/>
                    <Route path='/login' component={LoginForm}/>
                    <Route path='/register' component={RegisterForm}/>
                    <Route path='/kontakt' component={RegisterForm}/>
                    <Route path='/logout' component={Logout}/>

                    <Route path='/*' component={Error404}/>
                </Route>
            </Router>
        );
    }
}