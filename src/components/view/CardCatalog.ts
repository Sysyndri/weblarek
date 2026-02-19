import { ICardAction } from "../../types";
import { CardFull } from "../baseClasssView/Cardfull";


export class CardCatalog extends CardFull {
  constructor(container: HTMLElement, action?: ICardAction) {
    super(container);


    if (action?.onClick) {
      this.container.addEventListener('click', action.onClick);
    }
  }


}
