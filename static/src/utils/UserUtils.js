import axios from 'axios';

export default class UserUtils {
    static setLoggedUser() {
        return axios({
            method: 'post',
            url: '/getLoggedUser'
        }).then((user) => UserUtils.loggedUser = user.data);
    }

    static loggedUser = null;
}