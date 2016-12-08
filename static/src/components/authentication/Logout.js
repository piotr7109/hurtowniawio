import React from 'react';
import {Link} from 'react-router';
import UserUtils from './../../utils/UserUtils';

export default class Logout extends React.Component {

    constructor() {
        super();
        this.state = ({successLogout: false});
        this.handleLogout();
    }

    handleLogout() {
        UserUtils.logout().then(() =>{
            this.setState({successLogout: true});
        });
    }

    render() {
        if(this.state.successLogout) {
            return (
                <div>
                    Zostałeś wylogowany!
                    <Link to="/">Wróć na stronę główną</Link>
                </div>
            );
        } else {
            return null;
        }
    }
}