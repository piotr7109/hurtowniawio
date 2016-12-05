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

            </div>
        );
    }
}