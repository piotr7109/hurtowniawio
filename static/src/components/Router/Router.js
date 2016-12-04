import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

export default class Router extends React.Component {


    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Home} />

                <Route path='*' component={NotFound} />
            </Router>
        );
    }
}

const Home = () => <h1></h1>

const NotFound = () => (
    <h1>404.. This page is not found!</h1>)