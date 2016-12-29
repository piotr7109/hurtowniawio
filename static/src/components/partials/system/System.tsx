import * as React from 'react';

export class LoadingComponent extends React.Component<{}, {}> {

    render() {
        return (
            <div className="spin">
                <div className="icon-spin6" />
            </div>
        );
    }
}

export class EmptyPage extends React.Component<{}, {}> {

    render() {
        return (
          <div className="EmptyPage">
              {this.props.children}
              {!this.props.children && 'Brak zawartości do pokazania.'}
          </div>
        );
    }
}