import axios from 'axios';

export default class UserUtils {
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