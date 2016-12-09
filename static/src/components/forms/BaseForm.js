import React from 'react';
import axios from 'axios';
import BaseComponent from './../BaseComponent';

export default class BaseForm extends BaseComponent {

    constructor() {
        super();

        this.state = ({mode: 0});
    }

    handleFormEvents(event, url, method) {
        event.preventDefault();

        let serialize = require('form-serialize'),
            target = event.target,
            data = serialize(target, {hash: true}),
            dataObject = {data: JSON.stringify(data)};

        return this.handleRequest(dataObject, url, method);
    }

    handleRequest(dataObject, url, method) {
        return axios({
            method: method,
            url: url,
            params: dataObject
        })
    }

    handleSubmit(event) {
        //this.handleFormEvents()
    }

    getForm() {
        return null;
    }

    getSuccessMessage() {
        return null;
    }

    getErrorMessage() {
        return null;
    }

    renderHTML() {
        switch (this.state.mode) {
            case 0:
                return (
                    <div>
                        {this.getForm()}
                    </div>
                );
                break;
            case 1:
                return this.getSuccessMessage(this.state.mode);
                break;
            case -1:
                return (
                    <div>
                        {this.getErrorMessage()}
                        {this.getForm()}
                    </div>
                );
        }
    }
}
