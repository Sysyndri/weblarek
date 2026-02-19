import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";


export type TCardBasket = {
  productsArr: HTMLElement[],
  summa: number,
  statusBtn: boolean,
}

export class Basket extends Component<TCardBasket> {
  protected productsArr: HTMLUListElement;
  protected buttonOrder: HTMLButtonElement;
  protected basketSumm: HTMLElement;

  constructor(protected event: IEvents, container: HTMLElement) {
    super(container);

    this.productsArr = ensureElement<HTMLUListElement>('.basket__list', this.container)
    this.buttonOrder = ensureElement<HTMLButtonElement>('.basket__button', this.container)
    this.basketSumm = ensureElement<HTMLElement>('.basket__price', container)

    this.buttonOrder.addEventListener(('click'), () => {
      this.event.emit('order:open');
    })

  }

  set products(value: HTMLElement[]) {
    this.productsArr.replaceChildren(...value)
  }

  set statusBtn(value: boolean) {
    this.buttonOrder.disabled = value
  }

  set summa(value: number) {
    const str =
      value < 10000
        ? `${String(value)} синапсов`
        : `${value.toLocaleString("ru-Ru")} синапсов`;
    this.basketSumm.textContent = str;
  }
}
