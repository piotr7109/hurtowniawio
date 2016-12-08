import React from 'react';
import {Link} from 'react-router';
import MenuUtils from './../../utils/MenuUtils';
import UserUtils from './../../utils/UserUtils';

export default class Menu extends React.Component {

    handleRouteChange() {
        this.forceUpdate();
    }

    getMenuItem(item) {
        if (item.hasOwnProperty('path') && item.hasOwnProperty('title')) {
            return (
                <Link to={item.path} onClick={() => this.handleRouteChange()}>
                    <div className="menu-item">
                        {item.title}
                    </div>
                </Link>
            );
        }
        else {
            return null;
        }
    }

    getMenuItems() {
        let items = [],
            loggedUserType = UserUtils.loggedUser ? UserUtils.loggedUser.type : 'unlogged';

        for (let item of MenuUtils.menuData[loggedUserType]) {
            items.push(this.getMenuItem(item));
        }
        return items;
    }

    render() {
        return <div className="menu">{this.getMenuItems()}</div>;
    }
}