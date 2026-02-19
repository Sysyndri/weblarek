import { ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "../baseClasssView/Form";

export class FormOrder extends Form {
  protected formButtonOrder: HTMLButtonElement[];
  protected formAddress: HTMLInputElement;
  protected formButtonNext: HTMLButtonElement;

  constructor(event: IEvents, container: HTMLElement) {
    super(container, event)

    this.formButtonOrder = ensureAllElements<HTMLButtonElement>('.button_alt', this.container);
    this.formAddress = ensureElement<HTMLInputElement>('[name="address"]', this.container);
    this.formButtonNext = ensureElement<HTMLButtonElement>('.order__button', this.container);

    this.formButtonNext.addEventListener(('click'), () => {
      this.event.emit('contact:open');
    })

    this.formButtonOrder.forEach((button) => {
      button.addEventListener('click', () => {
        if (button.classList.contains('button_alt-active')) {
          this.event.emit('form:edit', {payment: ''})
        } else {
          this.event.emit('form:edit', {payment: button.name})
        }
      })
    })

    this.formAddress.addEventListener('input', () => {
      this.event.emit('form:edit', {address: this.formAddress.value})
    })
  }

  set address(address: string) {
    this.formAddress.value = address;
  }

  set payment(pay: string) {
    this.formButtonOrder.forEach((button) => {
      if (button.name === pay) {
        this.formButton.classList.add('button_alt-active')
      } else {
        this.formButton.classList.remove('button_alt-active')
      }
    })
  }
}