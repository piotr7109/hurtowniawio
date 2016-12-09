import React from 'react';

export class BasicInputControl extends React.Component {

    render() {
        let name = this.props.name,
            text = this.props.text,
            type = this.props.type,
            value = this.props.value;
        return (
            <div className="form-row">
                <label htmlFor={name} className="form-label">{text}</label>
                <input id={name} type={type} className="form-control" defaultValue={value} name={name} placeholder={text}/>
            </div>
        );
    }
}

export class BasicSubmitControl extends React.Component{
    render() {
        return <input type="submit" className="ButtonSubmit" value={this.props.text}/>;
    }
}