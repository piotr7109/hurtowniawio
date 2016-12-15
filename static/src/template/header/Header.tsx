import * as React from 'react';
import {Link} from 'react-router';
import UserUtils from '../../utils/UserUtils';
import ModalWindow from "../../components/partials/modalWindow/ModalWindow";
import {LoginForm} from "../../components/pages/authentication/LoginForm";
import {RegisterForm} from "../../components/pages/authentication/RegisterForm";

interface HeaderStates {
    modalLoginVisible:boolean;
    modalRegisterVisible:boolean;
}

export default class Header extends React.Component<{}, HeaderStates> {

    constructor() {
        super();

    }

    componentWillMount() {
        this.setState({
            modalLoginVisible: false,
            modalRegisterVisible: false
        } as HeaderStates);
    }

    showLoginWindow() {
        this.setState({modalLoginVisible: true} as HeaderStates);
    }

    showRegisterWindow() {
        this.setState({modalRegisterVisible: true} as HeaderStates);
    }


    hideModalWindows() {
        this.setState({
            modalLoginVisible: false,
            modalRegisterVisible: false
        } as HeaderStates);
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
                    <button className="header-button" onClick={() => {this.showLoginWindow()}}>
                        Logowanie
                    </button>
                    <button className="header-button" onClick={() => {this.showRegisterWindow()}}>
                        Rejestracja
                    </button>
                </div>
            );
        }
    }

    render() {
        console.log("login",this.state.modalLoginVisible)
        console.log("register",this.state.modalRegisterVisible)
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
                <ModalWindow hide={this.hideModalWindows.bind(this)}>
                    <LoginForm />
                </ModalWindow>}
                {this.state.modalRegisterVisible &&
                <ModalWindow hode={this.hideModalWindows.bind(this)}>
                    <RegisterForm />
                </ModalWindow>}
            </header>
        );
    }
}