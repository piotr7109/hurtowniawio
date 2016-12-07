import React from 'react';

export default class BasicInputControl extends React.Component {

    render() {
        let name = this.props.name,
            text = this.props.text,
            type = this.props.type;
        return (
            <div>
                <label htmlFor={name}>{text}</label>
                <input id={name} type={type} className="form-control" name={name} placeholder={text}/>
            </div>
        );
    }
}