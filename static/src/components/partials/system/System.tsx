import * as React from 'react';

export class LoadingComponent extends React.Component<void, void> {

    render() {
        return (
            <div className="spin">
                <div className="icon-spin6" />
            </div>
        );
    }
}