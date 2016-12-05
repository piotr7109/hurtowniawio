import axios from 'axios';

export default class UserUtils {
    static getLoggedUser() {
        return axios({
            method: 'post',
            url: '/getLoggedUser'
        });
    }

    static loggedUser = null;
}