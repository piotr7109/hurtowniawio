import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import Error404 from './../error/Errors';

export default class IndexComponent extends React.Component {


    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Home} />

                <Route path='/*' component={Error404} />
            </Router>
        );
    }
}

const Home = () => <h1></h1>;