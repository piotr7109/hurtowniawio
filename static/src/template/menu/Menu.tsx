import * as React from 'react';
import MenuUtils from '../../utils/MenuUtils';
import UserUtils from '../../utils/UserUtils';
import Dropdown from "../../components/partials/dropdown/Dropdown";

interface Properties {
    path: string
}

export default class Menu extends React.Component<Properties, {}> {

    handleRouteChange() {
        this.forceUpdate();
    }

    getMenuItems(item: any) {
        for (let property in item) {
            if (item.hasOwnProperty(property)) {
                let itemList = item[property];

                return (
                    <div className="menu-item" key={property}>
                        <Dropdown items={itemList} header={property}
                                  routeChangeEvent={this.handleRouteChange.bind(this)}/>
                    </div>
                );
            }
        }

        return null;
    }

    render() {
        return (
            <div className="menu">
                { MenuUtils.menuData[UserUtils.loggedUser.type].map((item: any) => {
                    return this.getMenuItems(item);
                })}
            </div>
        );
    }
}