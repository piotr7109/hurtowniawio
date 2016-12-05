import axios from 'axios';
import React from 'react';
import {Link} from 'react-router';
import MenuUtils from './../../utils/MenuUtils';
import UserUtils from './../../utils/UserUtils';

export default class Menu extends React.Component {

    constructor() {
        super();
    }

    getMenuItem(item) {
        if (item.hasOwnProperty('path') && item.hasOwnProperty('title')) {
            console.log(item.path)
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

    getMenuItems() {
        let items = [];
        for (let item of MenuUtils.menuData[UserUtils.loggedUser.type]) {
            items.push(this.getMenuItem(item));
        }
        return items;
    }

    render() {
        return (
            <div className="menu">
                {this.getMenuItems()}
            </div>

        );
    }
}