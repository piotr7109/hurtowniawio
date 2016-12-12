import * as React from 'react';
import {BaseForm} from "../BaseForm";

export default class AddApplicationForm extends BaseForm {


    handleFormEvents(event: any) {
        event.preventDefault();

        let serialize = require('form-serialize'),
            data = serialize(event.target, {hash: true}),
            formData: FormData = new FormData();

        formData.append('applicationData', data);
        formData.append('auctionId', 1);

        return this.handlePostRequest(formData, '/addApplication');
    }

    handleSubmit(event: any): any {
        this.handleFormEvents(event).then((response: any) => {
            let data = response.data;

            if (data) {

            } else {

            }
        });
    }

    getForm(): any {
        return undefined;
    }

    getSuccessMessage(): any {
        return undefined;
    }

    getErrorMessage(): any {
        return undefined;
    }

}