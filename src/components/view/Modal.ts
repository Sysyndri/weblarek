import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {
  button: HTMLButtonElement;
  content: HTMLElement;
}


/**
 * Класс для отрисовки модальных окон 
 * Главное модальный класс
 */
export class Modal extends Component<IModal> {
  protected buttonClose: HTMLButtonElement;
  protected _content: HTMLElement;

  /**
   * В конструкторе находим все элементы для данного компонента
   * и сохраняем их
   * @param event - класс EventEmmiter для подписки на события и взаимодействия с ними
   * @param container  - текущий контейнер в котором будем работать (HTMLElement)
   */
  constructor(
    protected events: IEvents,
    container: HTMLElement
  ) {
    super(container);

    this.buttonClose = ensureElement<HTMLButtonElement>(
      ".modal__close",
      this.container,
    );
    this._content = ensureElement<HTMLElement>(
      ".modal__content",
      this.container,
    );

    this.container.addEventListener("click", (event) => {
      if (event.target === this.container) this.close();
    });

    this.buttonClose.addEventListener("click", () => {
      this.close();
    });
  }

  /**
   * Сеттер для установки нового контента модального окна
   * @param value - Новое значение контента модального окна (HTMLElement) 
   */
  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  /**
   * Метод для открытия модального окна
   */
  open() {
    this.container.classList.add("modal_active");
  }

  /**
   * Метод для закрытия модального окна
   */
  close() {
    this.container.classList.remove("modal_active");
  }
}
