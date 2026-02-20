import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";


export type TCardBasket = {
  productsArr: HTMLElement[],
  summa: number,
  statusBtn: boolean,
}

/**
 * Класс для отрисовки корзины
 */
export class Basket extends Component<TCardBasket> {
  protected productsArr: HTMLUListElement;
  protected buttonOrder: HTMLButtonElement;
  protected basketSumm: HTMLElement;

  /**
   * В конструкторе находим все элементы для данного компонента
   * и сохраняем их
   * @param event - класс EventEmmiter для подписки на события и взаимодействия с ними
   * @param container  - текущий контейнер в котором будем работать (HTMLTemplateElement)
   */
  constructor(protected event: IEvents, container: HTMLTemplateElement) {
    super(container);

    this.productsArr = ensureElement<HTMLUListElement>('.basket__list', this.container)
    this.buttonOrder = ensureElement<HTMLButtonElement>('.basket__button', this.container)
    this.basketSumm = ensureElement<HTMLElement>('.basket__price', container)

    this.buttonOrder.addEventListener(('click'), () => {
      this.event.emit('order:open');
    })

  }

  /**
   * Сеттер для изменения добавленых продуктов в корзине 
   * @param value - Список HTMLElement карточек товаров
   */
  set products(value: HTMLElement[]) {
    this.productsArr.replaceChildren(...value)
  }

  /**
   * Сеттер для установки нового статуса кнопки в корзине
   * @param value - boolean значение, зависещее от заполнености корзины
   */
  set statusBtn(value: boolean) {
    this.buttonOrder.disabled = value
  }

  /**
   * Сеттер для установки новой суммы корзины
   * @param value - Новое значение суммы товаров в корзине
   */
  set summa(value: number) {
    const str =
      value < 10000
        ? `${String(value)} синапсов`
        : `${value.toLocaleString("ru-Ru")} синапсов`;
    this.basketSumm.textContent = str;
  }
}
