import axios from 'axios';
import React from 'react';
import {Link} from 'react-router';

export default class Menu extends React.Component {

    constructor() {
        super();
        this.state = {menuData: null};
        this.allowedUsers = ['rolnik'];
        this.getMenuData();
    }


    getMenuData() {
        let JSONPath = '/src/template/menu/menuData.json';

        return axios({
            method: 'get',
            url: JSONPath
        }).then((menuData) => {
            this.setState({menuData: menuData.data});
        });
    }

    getMenuItem(item) {
        if (item.hasOwnProperty('path') && item.hasOwnProperty('title')) {
            return (
                <Link to={item.path}>
                    <div className="menu-item">
                        {item.title}
                    </div>
                </Link>
            );
        }
        else return null;
    }

    getMenu() {
        if (this.state.menuData.hasOwnProperty(this.state.loggedUser)) {
            let userProperties = this.state.menuData[this.state.loggedUser];
            if (userProperties) {
                let menuItems = [];
                for (let i = 0; i < userProperties.length; i++) {
                    menuItems.push(this.getMenuItem(userProperties[i]));
                }
                return (menuItems);
            }
            else return null;
        }
        else return null;
    }

    renderHTML() {

        if (this.state.menuData) {
            return (
                <div className="menu-wrapper">
                    <div className="menu">
                        {this.getMenu()}
                    </div>
                </div>
            );
        }
        else return null;
    }
}