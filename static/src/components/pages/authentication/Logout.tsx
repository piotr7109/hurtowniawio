import * as React from 'react';
import {Link} from 'react-router';
import UserUtils from './../../../utils/UserUtils';
import {SuccessMessage} from "../../partials/forms/messages/Messages";

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
                    <SuccessMessage>Zostałeś wylogowany!</SuccessMessage>
                    <Link to="/">Wróć na stronę główną</Link>
                </div>
            );
        } else {
            return null;
        }
    }
}