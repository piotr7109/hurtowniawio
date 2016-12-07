import React from 'react';
import UserUtils from './../../utils/UserUtils';

export default class Header extends React.Component {

    getAuthButtons() {
        return (
            <div>
                <button className="header-button">
                    Sign in
                </button>
                <button className="header-button">
                    Login
                </button>
            </div>
        );
    }

    render() {
        return (
            <header className="header">
                <h1 className="logo">
                    <a href="#" className="logo-link">SELLEGRO</a>
                    <img className="logo-image" src="public/uploads/images/logo-image.png"/>
                </h1>
                <div className="header-button-wrapper">
                    {UserUtils.loggedUser != null ? this.getAuthButtons: ''}
                </div>
            </header>
        );
    }
}