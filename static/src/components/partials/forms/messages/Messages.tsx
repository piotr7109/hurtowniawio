import * as React from 'react';

abstract class Message extends React.Component<{}, {}> {

    abstract cssClass: string;

    render() {
        return (
            <div className={'Message ' + this.cssClass}>
                {this.props.children}
            </div>
        );
    }
}

export class SuccessMessage extends Message {
    cssClass = 'SuccessMessage';
}

export class ErrorMessage extends Message {
    cssClass = 'ErrorMessage';
}