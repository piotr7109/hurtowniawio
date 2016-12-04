import React from 'react';
import {Link} from 'react-router';

import BaseComponent from './../BaseComponent';

export default class Hello extends BaseComponent {
    constructor() {
        super();
        this.allowedUsers = ['rolnik'];
    }

    renderHTML() {
        return (
            <div className="hello">
                <h1>HELLO</h1>
                <h2>BEEF INDUSTRY</h2>
                <div>FUCK ME IF IT'S WORKING</div>
                <Link to="/someLink">Link to some link</Link>
            </div>
        );
    }
}