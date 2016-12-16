import * as React from 'react';

interface ModalWindowProps {
    hide: any;
    showOtherModal?: any;
}

export default class ModalWindow extends React.Component<ModalWindowProps, {}> {

    render() {
        return (
            <div className="ModalWindow">
                <div className="background"></div>
                <div className="modal-container">
                    <span className="close-window icon-cancel-1" onClick={this.props.hide}/>
                    <div className="modal-window-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}