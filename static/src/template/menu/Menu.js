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
                <Link to={item.path} onClick={() => this.handleRouteChange()} key={item.title}>
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

    render() {
        let loggedUserType = UserUtils.loggedUser ? UserUtils.loggedUser.type : 'unlogged';

        return (
            <div className="menu">
                { MenuUtils.menuData[loggedUserType].map((item) => {
                    return this.getMenuItem(item);
                })}
            </div>
        );
    }
}