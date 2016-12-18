import * as React from "react";
import {Link} from "react-router";
import UserUtils from "../../../utils/UserUtils";
import {BasicInputControl, BasicSubmitControl} from "../../partials/forms/controls/BasicInputControl";
import {BaseForm} from "../BaseForm";
import {BaseProps, BaseStates} from "../BasePage";
import {SuccessMessage, ErrorMessage} from "../../partials/forms/messages/Messages";

interface LoginFormProps extends BaseProps {
    hide: any;
}

export class LoginForm extends BaseForm<LoginFormProps, BaseStates> {

    handleSubmit(event: any) {
        this.handleFormEvents(event, '/login')
            .then((response: any) => {
                let data = response.data,
                    newMode = data ? this.modes.success : this.modes.fail;

                UserUtils.loggedUser = data;
                this.updateMode(newMode);
            });
    }

    getForm() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className="Form navbar-form">
                <div className="form-group">
                    <BasicInputControl text="Login" type="text" name="login" value=""/>
                    <BasicInputControl text="Hasło" type="password" name="password" value=""/>
                </div>
                <BasicSubmitControl text="Log in"/>
            </form>
        );
    }

    getSuccessMessage() {
        return (
            <div>
                <SuccessMessage>Zalogowałeś się!</SuccessMessage>
                <Link to="/" onClick={this.props.hide}>Idź do strony głównej</Link>
            </div>
        );
    }

    getErrorMessage() {
        return (
            <ErrorMessage>
                <div>Wprowadzono złe dane,</div>
            </ErrorMessage>
        );
    }
}