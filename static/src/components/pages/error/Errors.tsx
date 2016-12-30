import * as React from 'react';
import {Link} from 'react-router';

export default class Error404 extends React.Component<void, void> {
    render() {
        return (
            <div className="Error404">
                <div className="error-code">404</div>
                <div className="error-message">
                    Strona nie istnieje, zapraszamy na <Link to="/">stronę główną!</Link>
                </div>
            </div>
        );
    }
}

export class ErrorNonAuthenticatedUser extends React.Component<void, void> {
    render() {
        return (
            <div>You shall not pass!!</div>
        )
    }
}