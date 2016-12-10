import JsonUtils from './JsonUtils';

export default class MenuUtils {

    static setMenuData() {
        let JSONPath = '/src/template/menu/menuData.json';

        return JsonUtils.getRestData(JSONPath).then((menuData:any) => MenuUtils.menuData = menuData.data);
    }

    static menuData:any = null;

}