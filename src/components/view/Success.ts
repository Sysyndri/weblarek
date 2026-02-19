import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { TCardBasket } from "./Basket";

type TSuccess = Pick<TCardBasket, 'summa'>

export class Success extends Component<TSuccess> {
  protected buttonClose: HTMLButtonElement;
  protected sum: HTMLElement;

  constructor(
    protected events: IEvents,
    container: HTMLElement,
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
      this.events.emit("modal:close");
    });
  }

  set summa(value: number) {
    const str =
      value < 10000
        ? `Списано ${String(value)} синапсов`
        : `Списано ${value.toLocaleString("ru-Ru")} синапсов`;
    this.sum.textContent = str;
  }
}
