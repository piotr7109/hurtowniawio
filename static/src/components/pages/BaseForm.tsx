import * as React from 'react';
import * as axios from 'axios';
import {BasePage, BaseStates, BaseProps} from './BasePage';

interface IBaseForm {
    handleSubmit(event: any): any;
    getForm(): any;
    getSuccessMessage(): any;
    getErrorMessage(): any;
}

export abstract class BaseForm<P extends BaseProps, S extends BaseStates> extends BasePage<P, S> implements IBaseForm {

    public abstract handleSubmit(event: any): any;

    public abstract getForm(): any;

    public abstract getSuccessMessage(): any;

    public abstract getErrorMessage(): any;

    public handleFormEvents(event: any, url: any, method: any): any {
        event.preventDefault();

        let serialize = require('form-serialize'),
            target = event.target,
            data = serialize(target, {hash: true}),
            dataObject = {data: JSON.stringify(data)};

        return this.handleRequest(dataObject, url, method);
    }

    handlePostRequest(formData: FormData, url: any) {
        return axios.post(url, formData);
    }

    handleRequest(dataObject: any, url: any, method: any) {
        return axios({
            method: method,
            url: url,
            params: dataObject
        })
    }

    renderHTML() {
        switch (this.state.mode) {
            case 0:
                return (
                    <div>
                        {this.getForm()}
                    </div>
                );
            case 1:
                return this.getSuccessMessage();
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
