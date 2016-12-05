import JsonUtils from './JsonUtils';

export default class MenuUtils {

    static setMenuData() {
        let JSONPath = '/src/template/menu/menuData.json';

        return JsonUtils.getRestData(JSONPath).then((menuData) => MenuUtils.menuData = menuData.data);
    }

    static menuData = null;

}