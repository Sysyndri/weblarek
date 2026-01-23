import { IProduct } from "../../types";

/**
 * Класс отвечающий за каталог на гллавной странице, хранение товаров и взаимодействие с ними
 */
export class MainCatalog {

  private _products: IProduct[] = [];
  private _currentCard: IProduct = this._products[0];

  /**
   * Метод для получения массива продуктов
   */
  get products(): IProduct[] {
    return this._products;
  }

  /**
   * Метод для сохранения нового массива продуктов 
   */
  set saveProducts(product: IProduct[]) {
    this._products = product;
  }

  /**
   * Метод для получения товара по его id
   * @param id - id товара для получения
   * @returns - возвращает карточку товара или информационное сообщение о том, что товар не найден
   */
  getProduct(id: string): IProduct | string {

    for (let item of this._products) {
      if (item.id === id) {
        return item as IProduct;
      }
    }

    return `Товар с id = ${id} - не найден`

  }

  /**
   * Метод для получения текущей карточки товара
   */
  get card(): IProduct {
    return this._currentCard;
  }

  /**
   * Метод для сохранения новой текущей карточки товара
   */
  set card(item: IProduct) {
    this._currentCard = item;
  }
}