import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IGallary {
  catalog: HTMLElement[];
}


/**
 * Класс для отрисовки главной галереи приложения
 */
export class Gallary extends Component<IGallary> {
  protected catalogElements: HTMLElement;

  /**
   * В конструкторе находим все элементы для данного компонента
   * и сохраняем их
   * @param container  - текущий контейнер в котором будем работать (HTMLElement)
   */
  constructor (container: HTMLElement) {
    super(container)

    this.catalogElements = ensureElement<HTMLElement>('.gallery', this.container);
  }

  /**
   * Сеттер для отрисовки нового каталога карточек в галерее
   * @param items - Массив карточек товара в виде HTMLElement
   */
  set catalog(items: HTMLElement[]) {
    items.forEach(item => this.catalogElements.appendChild(item))
  }


}