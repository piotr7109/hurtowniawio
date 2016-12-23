import * as React from 'react';
import {Link} from 'react-router';
import {EditUserDataForm} from "./EditUserDataForm";
import JsonUtils from "../../../utils/JsonUtils";
import {BaseStates} from "../BasePage";
import {SuccessMessage} from "../../partials/forms/messages/Messages";

export default class EditUserDataAdminForm extends EditUserDataForm {
    user: any = {};

    allowedUsers = [this.userTypes.admin];

    componentWillMount(): void {
        this.state = {mode: this.modes.loading} as BaseStates;
        this.loadUser();
    }

    loadUser() {
        let formData: FormData = new FormData(),
            userId: number = this.props.params.id;

        formData.append('userId', userId);
        JsonUtils.handlePOST('/getUserById',formData)
            .then((response: any) => {
                let data: any = response.data,
                    newMode = data ? this.modes.ready : this.modes.fail;

                this.user = data;
                this.setFormControls();
                this.updateMode(newMode);
            });
    }

    setFormControls() {
        this.formControls = [
            {name: 'login', text: 'Login', type: 'text', value: this.user.login},
            {name: 'firstName', text: 'Imię', type: 'text', value: this.user.firstName},
            {name: 'lastName', text: 'Nazwisko', type: 'text', value: this.user.lastName},
            {name: 'address', text: 'Adres', type: 'text', value: this.user.address},
            {name: 'email', text: 'E-mail', type: 'email', value: this.user.email}
        ];
    }

    handleSubmit(event: any) {
        this.handleFormEvents(event, '/updateUserByAdmin')
            .then((response: any) => {
                let newMode = response.data ? this.modes.success : this.modes.fail;

                this.updateMode(newMode);
            });
    }

    public handleFormEvents(event: any, url: any): any {
        event.preventDefault();

        let formData: FormData = this.getFormData(event, 'data');

        formData.append('userId', this.user.id);
        return JsonUtils.handlePOST(url, formData);
    }

    getSuccessMessage() {
        return (
            <div>
                <SuccessMessage>Dane zostały zmienione!</SuccessMessage>
                <Link to="/userList">Wróć</Link>
            </div>
        );
    }
}