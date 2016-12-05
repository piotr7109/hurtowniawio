import React from 'react';
import ReactDOM from 'react-dom';
import IndexComponent from './components/router/IndexComponent';
import UserUtils from './utils/UserUtils';
import MenuUtils from './utils/MenuUtils';

let wrappers = {
    body: 'body.app'
};

UserUtils.setLoggedUser()
    .then(() =>  {
        return MenuUtils.setMenuData();
    })
    .then(() => {
        ReactDOM.render( <IndexComponent />, document.querySelector(wrappers.body));
    });