import React from 'react';

export default class Error404 extends React.Component {
    render() {
        return (
            <div>ERROR 404</div>
        );
    }
}

export class ErrorNonAuthenticatedUser extends React.Component {
    render() {
        return (
            <div>You shall not pass!!</div>
        )
    }
}