import { ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "../baseClasssView/Form";


/**
 * Класс для отрисовки формы способа оплаты и адреса
 */
export class FormOrder extends Form {
  protected formButtonOrder: HTMLButtonElement[];
  protected formAddress: HTMLInputElement;

  /**
   * В конструкторе находим все элементы для данного компонента
   * и сохраняем их
   * @param event - класс EventEmmiter для подписки на события и взаимодействия с ними
   * @param container  - текущий контейнер в котором будем работать (HTMLTemplateElement)
   */
  constructor(event: IEvents, container: HTMLTemplateElement) {
    super(container, event)

    this.formButtonOrder = ensureAllElements<HTMLButtonElement>('.button_alt', this.container);
    this.formAddress = ensureElement<HTMLInputElement>('[name="address"]', this.container);


    this.formButtonOrder.forEach((button) => {
      button.addEventListener('click', () => {
        this.event.emit('form:edit', {payment: button.name})
      })
    })

    this.formAddress.addEventListener('input', () => {
      this.event.emit('form:edit', {address: this.formAddress.value})
    })
  }

  /**
   * Сеттер для установки нового значения адресса в форме
   * @param address - Новый адресс пользователя 
   */
  set address(address: string) {
    this.formAddress.value = address;
  }

  /**
   * Сеттер для установки нового значения типа оплаты для пользователя
   * @param pay - Новый тип оплаты для пользователя
   */
  set payment(pay: string) {
    this.formButtonOrder.forEach((button) => {
      button.classList.toggle(
        'button_alt-active',
        button.name === pay,
      );
    });
  }
}