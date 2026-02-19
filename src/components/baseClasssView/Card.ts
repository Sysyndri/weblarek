import { IProduct } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

type TCardView = Pick<IProduct, "title" | "price">;

export abstract class Card<T> extends Component<T & TCardView> {
  protected titleCard: HTMLElement;
  protected priceCard: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.titleCard = ensureElement<HTMLElement>(".card__title", this.container);
    this.priceCard = ensureElement<HTMLElement>(".card__price", this.container);
  }

  set title(value: string) {
    this.titleCard.textContent = value;
  }

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
