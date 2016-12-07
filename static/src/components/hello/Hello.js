import React from 'react';
import {Link} from 'react-router';
import Menu from '../../template/menu/Menu';
import CustomHeader from '../../template/header/Header';
import BaseComponent from "../BaseComponent";
import LoginForm from '../authentication/LoginForm';
import CustomSelect from '../forms/CustomSelect';

export default class Hello extends BaseComponent {
    constructor() {
        super();
    }

    renderHTML() {
        let values = [
            {text: 'pierwszy', value: 'aaaa'},
            {text: 'drugi', value: 'bbbb'},
            {text: 'trzeci', value: 'cccc'},
            {text: 'czwarty', value: 'dddd'},
            {text: 'piaty', value: 'eeee'}
        ];

        return (
            <div className="hello">
                <CustomSelect items={values} />
                <LoginForm />
            </div>
        );
    }


}