import * as React from 'react';
import {BaseForm} from "../BaseForm";

export default class AddItemForm extends BaseForm {

    allowedUsers = [
        this.userTypes.hurtownik
    ];

    handleSubmit(event: any): any {
        return undefined;
    }

    getForm(): any {
        return (
            <form className="AddItemForm navbar-form" onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                </div>
            </form>
        );
    }

    getSuccessMessage(): any {
        return undefined;
    }

    getErrorMessage(): any {
        return undefined;
    }

}