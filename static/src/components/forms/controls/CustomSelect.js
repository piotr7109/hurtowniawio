import React from 'react';
import _ from 'underscore';

export default class CustomSelect extends React.Component {

    constructor() {
        super();

        this.state = {
            expanded: false
        };
    }

    getItem(item) {
        return (
            <div className="item" onClick={(event) => this.select(event)} key={item.text}>{item.text}</div>
        );
    }

    getList() {
        let outputList = [],
            selected = this.state.selected || this.props.items[0],
            listOfItems = _.without(this.props.items, selected);

        for (let item of listOfItems) {
            outputList.push(this.getItem(item));
        }

        return outputList;
    }

    toggle() {
        this.setState({expanded: !this.state.expanded});
    }

    select(event) {
        let target = event.target;

        this.setState({
            selected: _.find(this.props.items, {text: target.textContent}),
            expanded: !this.state.expanded
        })
    }

    render() {
        let cssStyle = this.state.expanded ? null : {display: "none"},
            iconCssClass = this.state.expanded ? "icon-up-dir" : "icon-down-dir",
            list = this.getList(),
            selected = this.state.selected ? this.state.selected.text : this.props.items[0].text;

        return (
            <div className="CustomSelectWrapper">
                <div className="CustomSelect">
                    <div tabIndex="0" className="selected" onClick={() => this.toggle()}>
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