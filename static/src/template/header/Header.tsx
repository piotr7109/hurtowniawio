import * as React from 'react';
import {Link} from 'react-router';
import UserUtils from '../../utils/UserUtils';
import ModalWindow from "../../components/partials/system/modalWindow/ModalWindow";
import {LoginForm} from "../../components/pages/authentication/LoginForm";
import {RegisterForm} from "../../components/pages/authentication/RegisterForm";

interface HeaderStates {
    modalLoginVisible: boolean;
    modalRegisterVisible: boolean;
}

export default class Header extends React.Component<{}, HeaderStates> {

    componentWillMount() {
        this.setState({
            modalLoginVisible: false,
            modalRegisterVisible: false
        } as HeaderStates);
    }

    switchModalWindows(modalLoginVisible: boolean,
                       modalRegisterVisible: boolean) {
        this.setState({
            modalLoginVisible: modalLoginVisible,
            modalRegisterVisible: modalRegisterVisible
        } as HeaderStates);
    }

    hideWindows() {
        this.switchModalWindows(false, false);
    }

    getAuthButtons() {
        if (UserUtils.isUserLogged()) {
            return (
                <Link to="/logout">
                    <button className="header-button">
                        Wyloguj
                    </button>
                </Link>
            );
        } else {
            return (
                <div>
                    <button className="header-button" onClick={() => {this.switchModalWindows(true, false)}}>
                        Logowanie
                    </button>
                    <button className="header-button" onClick={() => {this.switchModalWindows(false, true)}}>
                        Rejestracja
                    </button>
                </div>
            );
        }
    }

    render() {
        return (
            <header className="header">
                <h1 className="logo">
                    <a href="#" className="logo-link">SELLEGRO</a>
                    <img className="logo-image" src="public/uploads/images/logo-image.png"/>
                </h1>
                <div className="header-button-wrapper">
                    {this.getAuthButtons()}
                </div>
                {this.state.modalLoginVisible &&
                <ModalWindow hide={this.hideWindows.bind(this)}>
                    <LoginForm hide={this.hideWindows.bind(this)}/>
                </ModalWindow>}
                {this.state.modalRegisterVisible &&
                <ModalWindow hide={this.hideWindows.bind(this)}>
                    <RegisterForm switchModals={this.switchModalWindows.bind(this)}/>
                </ModalWindow>}
            </header>
        );
    }
}