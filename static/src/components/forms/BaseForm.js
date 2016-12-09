import React from 'react';
import axios from 'axios';

export default class BaseForm extends React.Component {

    constructor() {
        super();

        this.state = ({mode: 0});
    }

    handleFormEvents(event, url, method) {
        event.preventDefault();

        let serialize = require('form-serialize'),
            target = event.target,
            data = serialize(target, {hash: true}),
            dataObject = this.getDataObject(data);

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

    getDataObject(data) {
        return null; //{userData: JSON.stringify(data)}
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

    render() {
        switch (this.state.mode) {
            case 0:
                return this.getForm();
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
