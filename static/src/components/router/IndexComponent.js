import React from 'react';
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router'
import MenuUtils from './../../utils/MenuUtils';
import UserUtils from './../../utils/UserUtils';
import Error404 from "../error/Errors";
import Hello from "../hello/Hello";
import MainLayout from "../../template/MainLayout";

export default class IndexComponent extends React.Component {

    render() {
        console.log(UserUtils.loggedUser);
        console.log(MenuUtils.menuData);
        let links = new Set();
        for (let i = 0; i < MenuUtils.menuData; i++) {
            for (let j = 0; j < MenuUtils.menuData[i]; j++) {
                links.add(MenuUtils.menuData[i]);
            }
        }

        return (
            <Router  history={hashHistory}>
                <Route component={MainLayout}>
                    <Route path='/' component={Hello}/>
                    <Route path='/moje_sellegro' component={Hello}/>
                    <Route path='/lista_przetargow' component={Hello}/>
                    <Route path='/kontakt' component={Hello}/>

                    <Route path='/*' component={Error404}/>
                </Route>
            </Router>
        );
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