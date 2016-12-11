import * as React from 'react';
import {Link} from 'react-router';
import UserUtils from '../../utils/UserUtils';

export default class Header extends React.Component<{}, {}> {

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
                    <Link to="/login">
                        <button className="header-button">
                            Logowanie
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="header-button">
                            Rejestracja
                        </button>
                    </Link>
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
            </header>
        );
    }
}