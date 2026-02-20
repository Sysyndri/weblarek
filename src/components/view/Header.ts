import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IHeader {
  counter: number;
}


/**
 * Класс для отрисовки корзины в шапке приложения и счетчика корзины
 */
export class Header extends Component<IHeader> {
  protected counterElement: HTMLElement;
  protected basketButton: HTMLButtonElement;

  /**
   * В конструкторе находим все элементы для данного компонента
   * и сохраняем их
   * @param event - класс EventEmmiter для подписки на события и взаимодействия с ними
   * @param container  - текущий контейнер в котором будем работать (HTMLElement)
   */
  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);
    this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);
    
    this.basketButton.addEventListener(('click'), () => {
      this.events.emit('basket:open');
    })
  }

  /**
   * Сеттер для установки нового счетчика товаров в корзине
   * @param value - Новое количество товаров в корзине
   */
  set counter(value: number) {
    this.counterElement.textContent = String(value);
  } 
}