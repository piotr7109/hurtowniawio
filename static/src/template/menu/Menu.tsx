import * as React from 'react';
import {Link} from 'react-router';
import MenuUtils from '../../utils/MenuUtils';
import UserUtils from '../../utils/UserUtils';

interface Properties {
    path: string
}

export default class Menu extends React.Component<Properties, {}> {

    handleRouteChange() {
        this.forceUpdate();
    }

    getMenuItem(item: any) {
        if (item.hasOwnProperty('path') && item.hasOwnProperty('title')) {
            return (
                <Link className="menu-item-link" to={item.path} onClick={() => this.handleRouteChange()} key={item.title}>
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
        return (
            <div className="menu">
                { MenuUtils.menuData[UserUtils.loggedUser.type].map((item: any) => {
                    return this.getMenuItem(item);
                })}
            </div>
        );
    }
}