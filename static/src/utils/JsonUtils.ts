import * as axios from 'axios';

export default class JsonUtils {

    static handleGET(url: any): any {
        return axios.get(url);
    }

    static handlePOST(url: any, formData: FormData): any {
        return axios.post(url, formData);
    }
}