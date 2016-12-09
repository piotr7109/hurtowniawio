import axios from 'axios';

export default class UserUtils {
    static userTypes = {
        rolnik: 'rolnik',
        dostawca: 'dostawca',
        hurtownik: 'hurtownik',
        admin: 'admin'
    };

    static setLoggedUser() {
        return axios({
            method: 'get',
            url: '/getLoggedUser'
        }).then((user) => UserUtils.loggedUser = user.data);
    }

    static logout() {
        return axios({
            method: 'post',
            url: '/logout'
        }).then(() => UserUtils.loggedUser = null);
    }

    static loggedUser = null;
}