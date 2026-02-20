import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

type TCardView = Pick<IProduct, "title" | "price">;

/**
 * Базовый класс карточки товара во всех состояниях
 */
export abstract class Card<T> extends Component<T & TCardView> {
  protected titleCard: HTMLElement;
  protected priceCard: HTMLElement;

  /**
   * В конструкторе находим все элементы для данного компонента
   * и сохраняем их
   * @param container - текущий контейнер в котором будем работать (HTMLTemplateElement)
   */
  constructor(container: HTMLElement) {
    super(container);

    this.titleCard = ensureElement<HTMLElement>(".card__title", this.container);
    this.priceCard = ensureElement<HTMLElement>(".card__price", this.container);
  }

  /**
   * Сеттер для установки нового заголовка карточки товара
   * @param value - Новый заголовок карточки товара
   */
  set title(value: string) {
    this.titleCard.textContent = value;
  }

  /**
   * Сеттер для установки нового значения цены товара для карточки
   * @param value - Новая цена товара
   */
  set price(value: number) {
    const str =
      value === null
        ? "Бесценно"
        : value < 10000
          ? `${String(value)} синапсов`
          : `${value.toLocaleString("ru-Ru")} синапсов`;

    this.priceCard.textContent = str;
  }
}
