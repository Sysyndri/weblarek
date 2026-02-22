import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { TCardBasket } from "./Basket";

type TSuccess = Pick<TCardBasket, 'summa'>

/**
 * Класс для отображения информации об успешном выполнении покупки
 */
export class Success extends Component<TSuccess> {
  protected buttonClose: HTMLButtonElement;
  protected sum: HTMLElement;

  /**
   * В конструкторе находим все элементы для данного компонента
   * и сохраняем их
   * @param event - класс EventEmmiter для подписки на события и взаимодействия с ними
   * @param container  - текущий контейнер в котором будем работать (HTMLTemplateElement)
   */
  constructor(
    protected event: IEvents,
    container: HTMLTemplateElement,
  ) {
    super(container);

    this.buttonClose = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      this.container,
    );
    this.sum = ensureElement<HTMLElement>(
      ".order-success__description",
      this.container,
    );

    this.buttonClose.addEventListener("click", (event) => {
      event.preventDefault();
      this.event.emit("modal:newBuy");
    });
  }

  /**
   * Сеттер для изменения сообщения о покупке, в зависимости от суммы корзины
   * @param value - Новое значение суммы корзины
   */
  set summa(value: number) {
    const str =
      value < 10000
        ? `Списано ${String(value)} синапсов`
        : `Списано ${value.toLocaleString("ru-Ru")} синапсов`;
    this.sum.textContent = str;
  }
}
