import { ICardAction } from "../../types";
import { ensureElement } from "../../utils/utils";
import { CardFull } from "../baseClasssView/Cardfull";

export class CardModal extends CardFull {
  protected descriptionCard: HTMLElement;
  protected buyButtonCard: HTMLButtonElement;

  constructor(container: HTMLElement, action?: ICardAction) {
    super(container);

    this.descriptionCard = ensureElement<HTMLElement>('.card__text', this.container);
    this.buyButtonCard = ensureElement<HTMLButtonElement>('.card__button', this.container);

    if (action?.onClick) {
      this.container.addEventListener('click', action.onClick);
    }
  }

  set description(value: string) {
    this.descriptionCard.textContent = value;
  }

  set buttonText(value: string) {
    this.buyButtonCard.textContent = value;
  }

  set buttonStatus(value: boolean) {
    this.buyButtonCard.disabled = value;
  }
}