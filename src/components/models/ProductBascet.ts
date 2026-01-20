import { IProduct } from "../../types";


/**
 * Класс модели данных отвечающий за корзину товаров, хранение товаров, добавление, удаление и получение
 */
export class ProductBasket {
  constructor(
    protected _saveProducts: IProduct[] = []
  ) {}


  /**
   * Метод для добавление товаров в корзину
   * @param product - товар который нужно доабавить в корзину
   */
  addProduct(product: IProduct): void{
    this._saveProducts.push(product)
  }

  /**
   * Метод для удаления продукта из корзины
   * @param id - id товара который нужно удалить
   * @returns возвращает информационное сообщение об удлаление или об отсутствии товара
   */
  delProduct(id: string): string {

    let result: string = `Товар с id = ${id} - не найден`;

    this._saveProducts.forEach((item: IProduct, ind: number) => {
      if (item.id === id) {
        result = `Товар ${item.title} удалён из корзины`

        this._saveProducts.splice(ind, 1);
        return result
      }
    })

    return result
  }

  /**
   * Метод для подсчета колличества товаров в корзине
   * @returns - возвращает количество товаров в корзине 
   */
  countProducts(): number {
    return this._saveProducts.length
  }

  /**
   * Метод для получения масиива товаров находящегося в корзине
   */
  get products(): IProduct[] {
    return this._saveProducts
  }


  /**
   * Метод для суммирования стоимости всех товаров в корзине
   * @returns - Возвращает сумму стоимости всех товаров в корзине
   */
  sumProtuctsPrice(): number {
    let sumBasket: number = 0

    this._saveProducts.forEach((item: IProduct) => {
      if (typeof item.price === 'number') {
        sumBasket += item.price;
      }
    })


    return sumBasket
  }

  /**
   * Метод для проверки наличия товара в корзине по его id
   * @param id - id товара для поиска
   * @returns - возвращает true - если товар найден и удален и false если нет
   */
  checkProduct(id: string): boolean {

    for (let item of this._saveProducts) {
      if (item.id === id) {
        return true
      }
    }

    return false
  }

  /**
   * Метод для очистки корзины
   * @returns - Возвращает информационное сообщение об удалении товаров из корзины
   */
  clearBascet(): string {
    this._saveProducts = []

    return 'Корзина успешно очищена!'
  }
  
}