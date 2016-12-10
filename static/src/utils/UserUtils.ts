import * as axios from 'axios';

export default class UserUtils {
    public static userTypes: any = {
        rolnik: 'rolnik',
        dostawca: 'dostawca',
        hurtownik: 'hurtownik',
        admin: 'admin',
        unlogged: 'unlogged'
    };

    public static isLoggedUserAdmin(): boolean {
        if (UserUtils.loggedUser) {
            return UserUtils.loggedUser.type === UserUtils.userTypes.admin
        }

        return false;
    }

    public static setLoggedUser() {
        return axios({
            method: 'get',
            url: '/getLoggedUser'
        }).then((user) => {
            UserUtils.loggedUser = user.data || {type: UserUtils.userTypes.unlogged};
        });
    }

    public static logout() {
        return axios({
            method: 'post',
            url: '/logout'
        }).then(() => {
            UserUtils.loggedUser = {type: UserUtils.userTypes.unlogged};
        });
    }

    public static loggedUser: any = {type: UserUtils.userTypes.unlogged};
}