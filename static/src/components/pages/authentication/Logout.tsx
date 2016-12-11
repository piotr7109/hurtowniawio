import * as React from 'react';
import {Link} from 'react-router';
import UserUtils from './../../../utils/UserUtils';

interface States {
    successLogout: boolean;
}

export class Logout extends React.Component<{}, States> {

    state: States = {successLogout: false};

    constructor() {
        super();
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