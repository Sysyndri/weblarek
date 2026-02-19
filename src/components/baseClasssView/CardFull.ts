import { IProduct } from "../../types";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";

type TCardFull = Pick<IProduct, 'image' | 'category'>;

export abstract class CardFull extends Card<TCardFull> {
  protected categoryCard: HTMLElement;
  protected imageCard: HTMLImageElement;

  constructor(container: HTMLElement) {
    super(container);

    this.categoryCard = ensureElement<HTMLElement>('.card__category', this.container);
    this.imageCard = ensureElement<HTMLImageElement>('.card__image', container);
  }

  set category(value: string) {
    this.categoryCard.textContent = value;

    for (const key in categoryMap) {
      this.categoryCard.classList.toggle(categoryMap[key as keyof typeof categoryMap], key === value)
    }
  }

  set image(value: string) {
    this.setImage(this.imageCard, `${CDN_URL}${value.replace('.svg', '.png')}`, this.titleCard.textContent as string);
  }
}