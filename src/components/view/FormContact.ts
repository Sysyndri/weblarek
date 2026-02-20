import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "../baseClasssView/Form";


/**
 * Класс для отрисовки формы для контактных данных покупателя
 */
export class FormContact extends Form {
  protected emailForm: HTMLInputElement;
  protected phoneForm: HTMLInputElement;

  /**
   * В конструкторе находим все элементы для данного компонента
   * и сохраняем их
   * @param event - класс EventEmmiter для подписки на события и взаимодействия с ними
   * @param container  - текущий контейнер в котором будем работать (HTMLTemplateElement)
   */
  constructor(protected event: IEvents, container: HTMLTemplateElement) {
    super(container, event);

    this.emailForm = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
    this.phoneForm = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

    this.emailForm.addEventListener('input', () => {
      this.event.emit('form:edit', {email: this.emailForm.value});
    })

    this.phoneForm.addEventListener('input', () => {
      this.event.emit('form:edit', {phone: this.phoneForm.value});
    })
  }

  /**
   * Сеттер для установки нового email пользователя
   * @param email - email пользователя
   */
  set email(email: string) {
    this.emailForm.value = email;
  }

  /**
   * Сеттер для установки нового телефона пользователя
   * @param email - телефон пользователя
   */
  set phone(phone: string) {
    this.phoneForm.value = phone;
  }
}