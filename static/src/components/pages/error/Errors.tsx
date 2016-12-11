import * as React from 'react';

export default class Error404 extends React.Component<null,null> {
    render() {
        return (
            <div>ERROR 404</div>
        );
    }
}

export class ErrorNonAuthenticatedUser extends React.Component<null,null> {
    render() {
        return (
            <div>You shall not pass!!</div>
        )
    }
}