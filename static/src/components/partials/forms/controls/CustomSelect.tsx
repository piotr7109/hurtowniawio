import * as React from 'react';
import * as _ from 'underscore';

interface States {
    expanded: boolean;
}

interface Properties {
    items: any;
    name: string;
    labelText: string;
}

export default class CustomSelect extends React.Component<Properties, States> {

    state: States = {
        expanded: false
    };

    selected: any = null;

    getItem(item: any): any {
        return (
            <div className="item" onClick={(event) => this.select(event)} key={item.text}>{item.text}</div>
        );
    }

    getList() {
        let outputList: any = [],
            selected = this.selected || this.props.items[0],
            listOfItems = _.without(this.props.items, selected);

        listOfItems.map(item => outputList.push(this.getItem(item)));

        return outputList;
    }

    toggle() {
        this.setState({expanded: !this.state.expanded});
    }

    select(event: any) {
        let target = event.target;

        this.selected = _.find(this.props.items, {text: target.textContent});
        this.setState({expanded: !this.state.expanded});
    }

    render() {
        let iconCssClass = this.state.expanded ? " icon-up-dir" : " icon-down-dir",
            expandedItemCssClass = this.state.expanded ? " expanded" : "",
            list = this.getList(),
            selected = this.selected ? this.selected : this.props.items[0];

        return (
            <div className="CustomSelect form-row">
                <input type="hidden" className="form-input-control" name={this.props.name} value={selected.value}/>
                <label htmlFor={this.props.name} className="form-label">{this.props.labelText}</label>
                <div className={"dropdown form-input-control " + expandedItemCssClass}>
                    <div className="selected" tabIndex={0} onClick={() => this.toggle()}>
                        <span className="selectText">{selected.text}</span>
                        <span className={'icon' + iconCssClass}/>
                    </div>
                    <div className="list">
                        {list}
                    </div>
                </div>
            </div>
        );
    }
}