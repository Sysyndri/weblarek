import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

/**
 * Класс отвечающий за каталог на гллавной странице, хранение товаров и взаимодействие с ними
 */
export class MainCatalog {

  private products: IProduct[] = [];
  private currentCard: IProduct = this.products[0];

  constructor(protected event: IEvents) {}

  /**
   * Метод для получения массива продуктов
   */
  getProducts(): IProduct[] {
    return this.products;
  }

  /**
   * Метод для сохранения нового массива продуктов 
   */
  setSaveProducts(product: IProduct[]) {
    this.products = product;
    this.event.emit('catalog:change');
  }

  /**
   * Метод для получения товара по его id
   * @param id - id товара для получения
   * @returns - возвращает карточку товара или информационное сообщение о том, что товар не найден
   */
  getProduct(id: string): IProduct {
    const product = this.products.find((item) => item.id === id)

    return product as IProduct;

  }

  /**
   * Метод для получения текущей карточки товара
   */
  getCard(): IProduct {
    return this.currentCard;
  }

  /**
   * Метод для сохранения новой текущей карточки товара
   */
  setCard(item: IProduct) {
    this.currentCard = item;
    this.event.emit("card:save");
  }
}