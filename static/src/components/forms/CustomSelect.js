import React from 'react';
import _ from 'underscore';

export default class CustomSelect extends React.Component {
    
    constructor() {
        super();

        this.state = {
            isExpanded: false
        };
    }


    getItem(item) {
        return (
            <div className="item" onClick={(event) => this.select(event)}>{item.text}</div>
        );
    }

    getList() {
        let outputList = [];
        let selected = this.state.selected ? this.state.selected : this.props.items[0];
        let listOfItems = _.without(this.props.items, selected);

        for (let item of listOfItems) {
            outputList.push(this.getItem(item));
        }

        return outputList;
    }

    toggle() {
        this.setState({isExpanded: !this.state.isExpanded});
    }

    select(event) {
        this.setState({
            selected: _.find(this.props.items, {text: event.currentTarget.textContent}),
            isExpanded: !this.state.isExpanded
        })
    }

    render() {
        let cssStyle = this.state.isExpanded ? null : {display: "none"};
        let list = this.getList();
        let selected = this.state.selected ? this.state.selected.text : this.props.items[0].text;

        return (
            <div className="CustomSelectWrapper">
                <div className="CustomSelect">
                    <div className="selected" onClick={() => this.toggle()}>{selected}</div>
                    <div className="list" style={cssStyle}>{list}</div>
                </div>
            </div>
        );
    }
}