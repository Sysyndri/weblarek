import { ICardAction} from "../../types";
import { ensureElement } from "../../utils/utils";
import { Card } from "../baseClasssView/Card"

type TIndex = {
  index: number
}

/**
 * Класс для отрисовки карточки товара в корзине
 */
export class CardBasket extends Card<TIndex> {
  protected indexElement: HTMLElement;
  protected buttonRemove: HTMLButtonElement;
  
  /**
   * В конструкторе находим все элементы для данного компонента
   * и сохраняем их
   * @param container  - текущий контейнер в котором будем работать (HTMLTemplateElement)
   * @param action - callback для подписки на событие кнопки
   */
  constructor(container: HTMLTemplateElement, action?: ICardAction) {
    super(container)

    this.indexElement = ensureElement<HTMLElement>('.basket__item-index', this.container);
    this.buttonRemove = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

    if (action?.onClick) {
      this.buttonRemove.addEventListener(('click'), action.onClick)
    }
  }

  /**
   * Сеттер для установики нового индекса в корзине для карточки товара
   * @param ind - Новый индекс для карточки товара
   */
  set index(ind: number) {
    this.indexElement.textContent = String(ind)
  }
}