import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {
  button: HTMLButtonElement;
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected buttonClose: HTMLButtonElement;
  protected _content: HTMLElement;

  constructor(
    protected events: IEvents,
    container: HTMLElement,
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

  set content(value: HTMLElement) {
    this._content.replaceChildren(value);
  }

  open() {
    this.container.classList.add("modal_active");
  }

  close() {
    this.container.classList.remove("modal_active");
  }
}
