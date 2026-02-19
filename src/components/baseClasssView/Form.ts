import { IBuyer, ValidationErrors } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IFormErr {
  erors: Partial<ValidationErrors>
}

export abstract class Form extends Component<IFormErr & IBuyer> {
  protected formError: HTMLElement;
  protected formButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected event: IEvents) {
    super(container);

    this.formError = ensureElement<HTMLElement>('.form__errors', this.container);
    this.formButton = ensureElement<HTMLButtonElement>('[type="submit"]', this.container);


    this.formButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.event.emit('order:submit')
    })

  }

  set erors(err: ValidationErrors) {
    this.formError.textContent = Object.values(err).filter((item) => item !== null).join(', ');
  }

  set buttonStatus(value: boolean) {
    this.formButton.disabled = value; 
  }
}