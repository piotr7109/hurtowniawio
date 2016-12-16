import JsonUtils from './JsonUtils';

export default class MenuUtils {

    static setMenuData() {
        let JSONPath = '/src/datasources/menuData.json';

        return JsonUtils.handleGET(JSONPath).then((menuData: any) => MenuUtils.menuData = menuData.data);
    }

    static menuData: any = null;

}