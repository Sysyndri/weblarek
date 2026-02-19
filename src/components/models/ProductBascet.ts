import { IProduct } from "../../types";
import { IEvents } from "../base/Events";


/**
 * Класс модели данных отвечающий за корзину товаров, хранение товаров, добавление, удаление и получение
 */
export class ProductBasket {

  private _saveProducts: IProduct[] = []

  constructor(protected event: IEvents) {}

  /**
   * Метод для добавление товаров в корзину
   * @param product - товар который нужно доабавить в корзину
   */
  addProduct(product: IProduct): void{
    this._saveProducts.push(product);
    this.event.emit('basket:change');
  }

  /**
   * Метод для удаления продукта из корзины
   * @param id - id товара который нужно удалить
   * @returns возвращает информационное сообщение об удлаление или об отсутствии товара
   */
  delProduct(id: string) {

    const index = this._saveProducts.findIndex(item => item.id === id)

    if (index !== -1){
      this._saveProducts.splice(index, 1);
    }
    
    this.event.emit('basket:change')

  }

  /**
   * Метод для подсчета колличества товаров в корзине
   * @returns - возвращает количество товаров в корзине 
   */
  countProducts(): number {
    return this._saveProducts.length
  }

  /**
   * Метод для получения масива товаров находящегося в корзине
   */
  get products(): IProduct[] {
    return this._saveProducts
  }


  /**
   * Метод для суммирования стоимости всех товаров в корзине
   * @returns - Возвращает сумму стоимости всех товаров в корзине
   */
  getSumProductsPrice(): number {
    return this._saveProducts.reduce((total: number, item: IProduct) => {
      return total + (item.price ?? 0);
    }, 0)

  }

  /**
   * Метод для проверки наличия товара в корзине по его id
   * @param id - id товара для поиска
   * @returns - возвращает true - если товар найден и удален и false если нет
   */
  checkProduct(id: string): boolean {
    return this._saveProducts.some(item => item.id === id)
  }

  /**
   * Метод для очистки корзины
   * @returns - Возвращает информационное сообщение об удалении товаров из корзины
   */
  clearBascet(): string {
    this._saveProducts = []
    this.event.emit('basket:change')

    return 'Корзина успешно очищена!'
  }
  
}