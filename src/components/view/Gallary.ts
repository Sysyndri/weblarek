import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface IGallary {
  catalog: HTMLElement[];
}

export class Gallary extends Component<IGallary> {
  protected catalogElements: HTMLElement;

  constructor (container: HTMLElement) {
    super(container)

    this.catalogElements = ensureElement<HTMLElement>('.gallery', this.container);
  }

  set catalog(items: HTMLElement[]) {
    items.forEach(item => this.catalogElements.appendChild(item))
  }


}