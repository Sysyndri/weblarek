import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "../baseClasssView/Form";

export class FormContact extends Form {
  protected emailForm: HTMLInputElement;
  protected phoneForm: HTMLInputElement;

  constructor(protected event: IEvents, container: HTMLElement) {
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

  set email(email: string) {
    this.emailForm.value = email;
  }

  set phone(phone: string) {
    this.phoneForm.value = phone;
  }
}