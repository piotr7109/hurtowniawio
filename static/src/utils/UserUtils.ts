import * as axios from 'axios';

export default class UserUtils {
    public static userTypes:any = {
        rolnik: 'rolnik',
        dostawca: 'dostawca',
        hurtownik: 'hurtownik',
        admin: 'admin'
    };

    public static setLoggedUser() {
        return axios({
            method: 'get',
            url: '/getLoggedUser'
        }).then((user) => UserUtils.loggedUser = user.data);
    }

    public static logout() {
        return axios({
            method: 'post',
            url: '/logout'
        }).then(() => UserUtils.loggedUser = null);
    }

    public static loggedUser:any = null;
}