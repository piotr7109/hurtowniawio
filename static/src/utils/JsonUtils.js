import axios from 'axios';

export default class JsonUtils {

    static getRestData(path) {
        return axios({
            method: 'get',
            url: path
        })
    }
}