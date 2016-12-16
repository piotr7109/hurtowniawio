import JsonUtils from "./JsonUtils";

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
        JsonUtils.handleGET('/getLoggedUser')
            .then((user: any) => {
                UserUtils.loggedUser = user.data || {type: UserUtils.userTypes.unlogged};
            });
    }

    public static logout() {
        JsonUtils.handlePOST('/logout', null)
            .then(() => {
                UserUtils.loggedUser = {type: UserUtils.userTypes.unlogged};
            });
    }

    public static isUserLogged() {
        return UserUtils.loggedUser.type != UserUtils.userTypes.unlogged;
    }

    public static deactivateUser(id: number) {
        let formData: FormData = new FormData();

        formData.append('userId', id);
        return JsonUtils.handlePOST('/deactivateUser', formData);
    }

    public static loggedUser: any = {type: UserUtils.userTypes.unlogged};
}