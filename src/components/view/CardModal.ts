import { ICardAction } from "../../types";
import { ensureElement } from "../../utils/utils";
import { CardFull } from "../baseClasssView/Cardfull";


/**
 * Класс для карточки товара в модальном окне
 */
export class CardModal extends CardFull {
  protected descriptionCard: HTMLElement;
  protected buyButtonCard: HTMLButtonElement;

  /**
   * В конструкторе находим все элементы для данного компонента
   * и сохраняем их
   * @param container  - текущий контейнер в котором будем работать (HTMLTemplateElement)
   * @param action - callback для подписки на событие кнопки
   */
  constructor(container: HTMLTemplateElement, action?: ICardAction) {
    super(container);

    this.descriptionCard = ensureElement<HTMLElement>('.card__text', this.container);
    this.buyButtonCard = ensureElement<HTMLButtonElement>('.card__button', this.container);

    if (action?.onClick) {
      this.container.addEventListener('click', action.onClick);
    }
  }

  /**
   * Сеттер для установки нового значения описания для карточки товара
   * @param value - новое значение описания для карточки товара
   */
  set description(value: string) {
    this.descriptionCard.textContent = value;
  }

  /**
   * Сеттер для установки нового текста для кнопки
   * @param value - Новое значение текста  
   */
  set buttonText(value: string) {
    this.buyButtonCard.textContent = value;
  }

  /**
   * Сеттер для установки нового boolean статуса кнопки
   * @param value - Новое boolean значение статуса кнопки
   */
  set buttonStatus(value: boolean) {
    this.buyButtonCard.disabled = value;
  }
}