import { ApiPostMethods, AplResponseList, IProduct } from "../../types";
import { Api } from "../base/Api";


export class ApiClient extends Api {

    constructor(baseurl: string, options?: RequestInit) {
        super(baseurl, options)
    }


    async getProductCards(url:string = '/product'): Promise<IProduct[]> {
        const response: AplResponseList<IProduct> = await this.get(url)

        if (!response.items|| !Array.isArray(response.items)) {
            throw new Error("Неккоректный формат ответа, отсутсвует поле items")
        }

        return response.items;

    }

    async postOrder(url: string = '/order', data: object, method: ApiPostMethods = 'POST') {
        return this.post(url, data, method);
    }
}