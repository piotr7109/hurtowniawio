import * as React from 'react';
import {Link} from 'react-router';

interface Props {
    items: any;
    header: string;
    routeChangeEvent: any;
}

interface States {
    expanded: boolean;
}

export default class Dropdown extends React.Component<Props,States> {

    componentWillMount() {
        this.state = {expanded: false};
        this.bindUIEvents();
    }

    bindUIEvents() {
        document.addEventListener('click', (event: any) => {
            if (event.target.id !== this.props.header) {
                this.setState({expanded: false});
            }
        });
    }

    toggle() {
        this.setState({expanded: !this.state.expanded});
    }

    getLink(item: any): any {
        return (
            <div className="item">
                <Link className="menu-item-link" to={item.path}
                      onClick={() => this.props.routeChangeEvent()}
                      key={item.title}>
                    {item.title}
                </Link>
            </div>
        );
    }

    render() {
        let dropdownListCssClasses = this.state.expanded ? 'dropdown-list expanded ' : 'dropdown-list';

        return (
            <div className="Dropdown">
                <div className="dropdown-heading" onClick={() => this.toggle()} id={this.props.header}>
                    {this.props.header}
                </div>
                <div className={dropdownListCssClasses}>
                    {this.props.items.map((item: any) => {
                        return this.getLink(item);
                    })}
                </div>
            </div>
        );
    }

}