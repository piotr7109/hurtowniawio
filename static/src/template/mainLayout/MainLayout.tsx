import * as React from 'react';
import Menu from '../menu/Menu';
import CustomHeader from '../header/Header';

interface Props {
    location:any;
    children:any;
}

export default class MainLayout extends React.Component<Props, {}> {

    render() {
        return (
            <div className="page">
                <div className="header-wrapper">
                    <CustomHeader />
                </div>
                <div className="background-image">
                    <div className="image"></div>
                </div>
                <nav className="menu-wrapper">
                    <Menu path={this.props.location.pathname} />
                </nav>
                <div className="wrapper">
                    <section className="content">
                        <div className="content-wrapper">
                            {this.props.children}
                        </div>
                    </section>
                </div>
                <footer className="footer">
                    SELLEGRO &copy; since 2016
                </footer>
            </div>
        );
    }
}