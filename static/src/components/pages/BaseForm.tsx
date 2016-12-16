import * as React from 'react';
import {BasePage, BaseStates, BaseProps} from './BasePage';
import JsonUtils from '../../utils/JsonUtils'

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

    public handleFormEvents(event: any, url: any): any {
        event.preventDefault();

        let formData: FormData = this.getFormData(event, 'data');

        console.log(formData);

        return JsonUtils.handlePOST(url, formData);
    }

    public getFormData(event: any, name: string): FormData {
        let serialize = require('form-serialize'),
            target = event.target,
            data = serialize(target, {hash: true}),
            formData: FormData = new FormData();

        formData.append(name, JSON.stringify(data));

        return formData;
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
