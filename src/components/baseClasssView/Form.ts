import { IBuyer, ValidationErrors } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IFormErr {
  erors: Partial<ValidationErrors>
}

/**
 * Базовый класс формы
 */
export abstract class Form extends Component<IFormErr & IBuyer> {
  protected formError: HTMLElement;
  protected formButton: HTMLButtonElement;

  /**
   * В конструкторе находим все элементы для данного компонента
   * и сохраняем их
   * @param events - класс EventEmmiter для подписки на события и взаимодействия с ними
   * @param container  - текущий контейнер в котором будем работать (HTMLTemplateElement) 
   */
  constructor(container: HTMLElement, protected event: IEvents) {
    super(container);

    this.formError = ensureElement<HTMLElement>('.form__errors', this.container);
    this.formButton = ensureElement<HTMLButtonElement>('[type="submit"]', this.container);


    this.formButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.event.emit('order:submit')
    })

  }

  /**
   * Сеттер для установки ошибок в текстовое поле формы
   * @param err - Ошибки которые есть в текущий момент
   */
  set erors(err: ValidationErrors) {
    this.formError.textContent = Object.values(err).filter((item) => item !== null).join(', ');
  }

  /**
   * Сеттер для установки нового статуса кнопке отправки формы
   * @param value - boolean значение для кнопки. Зависит от наличия ошибок в форме
   */
  set buttonStatus(value: boolean) {
    this.formButton.disabled = value; 
  }
}