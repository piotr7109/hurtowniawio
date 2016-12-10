import * as axios from 'axios';

export default class JsonUtils {

    static getRestData(path:any) {
        return axios({
            method: 'get',
            url: path
        })
    }
}