import { ICardAction } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Card } from "../baseClasssView/Card"

type TIndex = {
  index: number
}

export class CardBasket extends Card<TIndex> {
  protected _index: HTMLElement;
  protected buttonRemove: HTMLButtonElement;

  constructor(container: HTMLElement, action?: ICardAction) {
    super(container)

    this._index = ensureElement<HTMLElement>('.basket__item-index', this.container);
    this.buttonRemove = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

    if (action?.onClick) {
      this.buttonRemove.addEventListener(('click'), action.onClick)
    }
  }

  set index(ind: number) {
    this._index.textContent = String(ind)
  }
}