import { ApiPostMethods, IApi } from "../../types";
import { API_URL } from "../../utils/constants";
import { Api } from "../base/Api";

export class ApiResponse {

    constructor(protected _api: IApi) {

    }

    get(url:string = '/product/') {
        const response = this._api.get(url);

        return response

    }

    post(url: string = '/order/', data: object, method: ApiPostMethods = 'POST') {
        const answer = this._api.post(url, data, method)

    }
}