import * as React from 'react';
import * as _ from 'underscore';

interface States {
    expanded:boolean;
}

interface Properties {
    items:any;
    name:string;
}

export default class CustomSelect extends React.Component<Properties, States> {

    state:States = {
        expanded: false
    };

    selected:any = null;

    getItem(item:any):any {
        return (
            <div className="item" onClick={(event) => this.select(event)} key={item.text}>{item.text}</div>
        );
    }

    getList() {
        let outputList:any = [],
            selected = this.selected || this.props.items[0],
            listOfItems = _.without(this.props.items, selected);

        for (let item of listOfItems) {
            outputList.push(this.getItem(item));
        }

        return outputList;
    }

    toggle() {
        this.setState({expanded: !this.state.expanded});
    }

    select(event:any) {
        let target = event.target;

        this.selected = _.find(this.props.items, {text: target.textContent});
        this.setState({expanded: !this.state.expanded});
    }

    render() {
        let cssStyle = this.state.expanded ? null : {display: "none"},
            iconCssClass = this.state.expanded ? "icon-up-dir" : "icon-down-dir",
            list = this.getList(),
            selected = this.selected ? this.selected.text : this.props.items[0].text;

        return (
            <div className="CustomSelectWrapper">
                <div className="CustomSelect">
                    <input type="hidden" className="form-control" name={this.props.name} value={selected}/>
                    <div tabIndex={0} className="selected" onClick={() => this.toggle()}>
                        {selected}
                        <span className={iconCssClass}/>
                    </div>
                    <div className="list" style={cssStyle}>
                        {list}
                    </div>
                </div>
            </div>
        );
    }
}