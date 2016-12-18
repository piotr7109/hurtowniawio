import * as React from 'react';

abstract class Message extends React.Component<{}, {}> {

    abstract cssClass: string;

    render() {
        return (
            <div className={'alert ' + this.cssClass}>
                {this.props.children}
            </div>
        );
    }
}

export class SuccessMessage extends Message {
    cssClass = 'alert-success';
}

export class ErrorMessage extends Message {
    cssClass = 'alert-danger';
}