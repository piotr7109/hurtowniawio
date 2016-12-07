import React from 'react';

export default class LoginForm extends React.Component {


    handleSubmit(event) {
        let serialize = require('form-serialize'),
            target = event.target;
        console.log(serialize(target, {hash: true}));
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="navbar-form navbar-left">
                <div className="form-group">
                    <input className="form-control" type="text" name="login"/>
                    <input className="form-control" type="password" name="password"/>
                </div>
                <input type="submit" value="Log in" className="ButtonSubmit" />
            </form>
        );
    }
}