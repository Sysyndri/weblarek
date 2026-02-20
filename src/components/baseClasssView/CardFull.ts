import { IProduct } from "../../types";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";

type TCardFull = Pick<IProduct, 'image' | 'category'>;

/**
 * Базовый класс для карточек с изображением
 * Наследуется от базового класса Card 
 */
export abstract class CardFull extends Card<TCardFull> {
  protected categoryCard: HTMLElement;
  protected imageCard: HTMLImageElement;

  /**
   * В конструкторе находим все элементы для данного компонента
   * и сохраняем их
   * @param container - текущий контейнер в котором будем работать (HTMLTemplateElement)
   */
  constructor(container: HTMLElement) {
    super(container);

    this.categoryCard = ensureElement<HTMLElement>('.card__category', this.container);
    this.imageCard = ensureElement<HTMLImageElement>('.card__image', container);
  }

  /**
   * Сеттер для установки новой категории для карточки товара
   * @param value - Новавя категория карточки товара
   */
  set category(value: string) {
    this.categoryCard.textContent = value;

    for (const key in categoryMap) {
      this.categoryCard.classList.toggle(categoryMap[key as keyof typeof categoryMap], key === value)
    }
  }

  /**
   * Сеттер для установки нового изображения для карточки товара
   * @param value - Новое значение для изображения карточки товара
   */
  set image(value: string) {
    this.setImage(this.imageCard, `${CDN_URL}${value.replace('.svg', '.png')}`, this.titleCard.textContent as string);
  }
}