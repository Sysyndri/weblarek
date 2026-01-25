import { ApiPostMethods, AplResponseList, IProduct, PostAnswer, PostData } from "../../types";
import { Api } from "../base/Api";


export class ApiClient extends Api {

    constructor(baseurl: string, options?: RequestInit) { 
        super(baseurl, options);
    }

    /**
     * Метод для получения карточек товара по эндпоинту - /product
     * при помощи класса Api
     * @returns - Возвращает ответ от сервера
     */
    async getProductCards(): Promise<IProduct[]> {
        const response = await this.get<AplResponseList<IProduct>>('/product')

        return response.items;
    }

    /**
     * Метод для отправки данных на сервер по эндпоинту - /order
     * при помощи класса Api
     * @param data - Данные которые нужно передать
     * @param method - Метод запроса на сервер
     * @returns - Возвращает ответ серверка
     */
    async postOrder(data: PostData, method: ApiPostMethods = 'POST'): Promise<PostAnswer> {
        return this.post<Promise<PostAnswer>>('/order', data, method);
    }
}