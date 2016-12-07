import React from 'react';
import {Link} from 'react-router';
import Menu from '../../template/menu/Menu'
import CustomHeader from '../../template/header/Header';
import BaseComponent from "../BaseComponent";
import LoginForm from '../authentication/LoginForm'

export default class Hello extends BaseComponent {
    constructor() {
        super();
    }

    renderHTML() {
        return (
            <div className="hello">

                <LoginForm />
            </div>
        );
    }


}