import React from 'react';

export default class SimpleSelect extends React.Component {

    getItems() {
        let options = [];

        for(let item of this.props.values) {
            options.push(<option value={item.value}>{item.text}</option>);
        }

        return options;
    }

    render() {
        return (
            <div>
                <select className="selectpicker" name={this.props.name}>
                    {this.getItems()}
                </select>
            </div>
        );
    }
}