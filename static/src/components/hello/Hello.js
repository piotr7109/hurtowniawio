import React from 'react';
import {Link} from 'react-router';
import Menu from '../../template/menu/Menu'
import CustomHeader from '../../template/header/Header';
import BaseComponent from "../BaseComponent";

export default class Hello extends BaseComponent {
    constructor() {
        super();
    }

    renderHTML() {
        return (
            <div className="hello">
                <h1>HELLO</h1>
                <h2>BEEF INDUSTRY</h2>
                <div>FUCK ME IF IT'S WORKING</div>
                <Link to="/moje_sellegro">Link to some link</Link>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="firstName" />
                    <input type="text" name="lastName" />
                    <input type="submit" value="Submit" />
                </form>

            </div>
        );
    }

    handleSubmit(event) {
        let serialize = require('form-serialize'),
            target = event.target;

        console.log(serialize(target, { hash: true }));
        event.preventDefault();
    }
}