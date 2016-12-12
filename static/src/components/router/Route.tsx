import * as React from 'react';
import {Router, Route, hashHistory} from 'react-router'
import Error404 from "../pages/error/Errors";
import MainLayout from "../../template/mainLayout/MainLayout";
import {RegisterForm} from '../pages/authentication/RegisterForm';
import {LoginForm} from '../pages/authentication/LoginForm';
import {Logout} from '../pages/authentication/Logout';
import {EditUserDataForm} from '../pages/users/EditUserDataForm';
import AddItemForm from "../pages/items/AddItemForm";
import AddAuctionForm from "../pages/auctions/add/AddAuctionForm";
import UserList from "../pages/users/list/UserList";
import AuctionList from "../pages/auctions/list/AuctionList";
import Auction from "../pages/auctions/Auction";


export default class IndexComponent extends React.Component<{}, {}> {

    render() {
        return (
            <Router history={hashHistory}>
                <Route component={MainLayout}>
                    <Route path="/login" component={LoginForm} />
                    <Route path="/register" component={RegisterForm} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/editUser" component={EditUserDataForm} />
                    <Route path="/addItem" component={AddItemForm} />
                    <Route path="/addAuction" component={AddAuctionForm} />
                    <Route path="/auctionList" component={AuctionList} />
                    <Route path="/userList" component={UserList} />
                    <Route path="/auction/:id" component={Auction} />
                    <Route path='/*' component={Error404} />
                </Route>
            </Router>
        );
    }
}