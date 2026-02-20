import { ICardAction } from "../../types";
import { CardFull } from "../baseClasssView/Cardfull";


/**
 * Класс для карточки товара в главном каталоге
 */
export class CardCatalog extends CardFull {

  /**
   * В конструкторе находим все элементы для данного компонента
   * и сохраняем их
   * @param container  - текущий контейнер в котором будем работать (HTMLTemplateElement)
   * @param action - callback для подписки на событие кнопки
   */
  constructor(container: HTMLTemplateElement, action?: ICardAction) {
    super(container);


    if (action?.onClick) {
      this.container.addEventListener('click', action.onClick);
    }
  }


}
