import React from 'react';
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router'
import Error404 from './../error/Errors';
import Hello from './../hello/Hello';

export default class IndexComponent extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Hello}/>

                <Route path='/*' component={Error404}/>
            </Router>
        );
    }
}