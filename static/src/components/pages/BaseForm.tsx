import * as React from 'react';
import * as Serialize from 'form-serialize';
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

        return JsonUtils.handlePOST(url, formData);
    }

    public getFormData(event: any, name: string): FormData {
        let target = event.target,
            data = Serialize(target, {hash: true}),
            formData: FormData = new FormData();

        formData.append(name, JSON.stringify(data));

        return formData;
    }

    renderHTML() {
        switch (this.state.mode) {
            case this.modes.ready:
                return (
                    <div>
                        {this.getForm()}
                    </div>
                );
            case this.modes.success:
                return this.getSuccessMessage();
            case this.modes.fail:
                return (
                    <div>
                        {this.getErrorMessage()}
                        {this.getForm()}
                    </div>
                );
        }
    }
}
