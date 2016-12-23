import * as React from 'react';
import {Router, Route, hashHistory} from 'react-router'
import Error404 from "../pages/error/Errors";
import MainLayout from "../../template/mainLayout/MainLayout";
import {Logout} from '../pages/authentication/Logout';
import {EditUserDataForm} from '../pages/users/EditUserDataForm';
import AddItemForm from "../pages/items/AddItemForm";
import AddAuctionForm from "../pages/auctions/add/AddAuctionForm";
import UserList from "../pages/users/list/UserList";
import AuctionList from "../pages/auctions/list/AuctionList";
import Auction from "../pages/auctions/Auction";
import UserAuctionList from "../pages/auctions/list/UserAuctionList";
import ArchiveAuctionList from "../pages/auctions/list/ArchiveAuctionList";
import FarmerAuctionList from "../pages/auctions/list/FarmerAuctionList";
import ItemsList from "../pages/items/ItemsList";

export default class IndexComponent extends React.Component<{}, {}> {

    render() {
        return (
            <Router history={hashHistory}>
                <Route component={MainLayout}>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/editUser" component={EditUserDataForm}/>
                    <Route path="/addItem" component={AddItemForm}/>
                    <Route path="/addAuction" component={AddAuctionForm}/>
                    <Route path="/auctionList" component={AuctionList}/>
                    <Route path="/userList" component={UserList}/>
                    <Route path="/auction/:id" component={Auction}/>
                    <Route path="/userAuctions" component={UserAuctionList}/>
                    <Route path="/archiveAuctions" component={ArchiveAuctionList}/>
                    <Route path="/farmerAuctions" component={FarmerAuctionList}/>
                    <Route path="/itemsList" component={ItemsList}/>
                    <Route path='/*' component={Error404}/>
                </Route>
            </Router>
        );
    }
}