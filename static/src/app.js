import React from 'react';
import ReactDOM from 'react-dom';
import IndexComponent from './components/router/IndexComponent';
import UserUtils from './utils/UserUtils';

let appWrapper = '.app-wrapper';

UserUtils.setLoggedUser()
    .then(() => {
        ReactDOM.render( <IndexComponent />, document.querySelector(appWrapper));
    });
