import React from 'react';

export default class Header extends React.Component {

    render() {
        return (
            <header className="header">
                <h1 className="logo">
                    <a href="#" className="logo-link">SELLEGRO</a>
                    <img className="logo-image" src="public/uploads/images/logo-image.png"/>
                </h1>
                <div className="header-button-wrapper">
                    <button className="header-button">
                        Sign in
                    </button>
                    <button className="header-button">
                        Login
                    </button>
                </div>
            </header>
        );
    }
}