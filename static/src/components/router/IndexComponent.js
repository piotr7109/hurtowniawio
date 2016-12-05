import React from 'react';
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router'

import Error404 from './../error/Errors';
import Hello from './../hello/Hello';

import UserUtils from './../../utils/UserUtils';

export default class IndexComponent extends React.Component {

    render() {
        console.log(UserUtils.loggedUser);
        return null;
        /*if (this.isComponentReady()) {
         if (this.isUserAuthenticated()) {
         return this.renderHTML();
         } else {
         /* render Errors*/


        /*
         return (

         <Router history={hashHistory}>
         <Route path='/' component={Hello}/>

         <Route path='/*' component={Error404}/>
         </Router>
         );*/
    }
}