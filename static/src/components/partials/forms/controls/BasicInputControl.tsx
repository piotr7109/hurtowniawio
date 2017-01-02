import * as React from 'react';

interface BasicInputControlProps {
    name:string;
    text:string;
    type:string;
    value:string;
}

export class BasicInputControl extends React.Component<BasicInputControlProps, {}> {

    render() {
        let name = this.props.name,
            text = this.props.text,
            type = this.props.type,
            value = this.props.value;
        return (
            <div className="form-row">
                <label htmlFor={name} className="form-label">{text}</label>
                <input id={name} required type={type} className="form-control form-input-control"
                       defaultValue={value} name={name} placeholder={text}/>
            </div>
        );
    }
}

interface BasicSubmitControlProps {
    text:string;
}

export class BasicSubmitControl extends React.Component<BasicSubmitControlProps, {}>{
    render() {
        return <input type="submit" className="buttonSubmit" value={this.props.text}/>;
    }
}