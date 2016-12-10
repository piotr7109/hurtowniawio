import * as React from 'react';
import {Link} from 'react-router';
import {BaseForm} from '../BaseForm';
import {BasicInputControl} from '../../partials/forms/controls/BasicInputControl';

export default class AddItemForm extends BaseForm {

    formControls = [
        {name: 'name', text: 'Nazwa', type: 'text'},
        {name: 'country', text: 'Kraj pochodzenia', type: 'text'},
        {name: 'typeName', text: 'Odmiana', type: 'text'}
    ];

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
                    {this.formControls.map((item) => {
                        return (<BasicInputControl
                            name={item.name}
                            type={item.type}
                            text={item.text}
                            key={item.name}
                            value=""/>);
                    })}
                </div>
            </form>
        );
    }

    getSuccessMessage(): any {
        return (
            <div>
                Przedmiot został dodany do bazy przedmiotów
                <Link to="/">Powrót na stronę główną</Link>
            </div>
        );
    }

    getErrorMessage(): any {
        return (
            <div>
                Błąd, ale nie wiem ;____;
            </div>
        );
    }

}