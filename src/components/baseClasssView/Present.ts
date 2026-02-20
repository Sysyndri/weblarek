import { IProduct, PostAnswer } from "../../types";
import { API_URL } from "../../utils/constants";
import { cloneTemplate } from "../../utils/utils";
import { EventEmitter } from "../base/Events";
import { ApiClient } from "../models/ApiClient";
import { Buyer } from "../models/Buyer";
import { MainCatalog } from "../models/MainCatalog";
import { ProductBasket } from "../models/ProductBascet";
import { Basket } from "../view/Basket";
import { CardBasket } from "../view/CardBasket";
import { CardModal } from "../view/CardModal";
import { FormContact } from "../view/FormContact";
import { FormOrder } from "../view/FormOrder";
import { Gallary } from "../view/Gallary";
import { Header } from "../view/Header";
import { Modal } from "../view/Modal";
import { Success } from "../view/Success";


/**
 * Класс для связи между всеми классами в приложении.
 * Предоставляет доступ к моделям данных и View классам приложения
 */
export abstract class Present{
  protected events: EventEmitter;
  protected api: ApiClient;
  protected mainCatalog: MainCatalog;
  protected buyer: Buyer;
  protected cardModal: CardModal;
  protected header: Header;
  protected mainGallery: Gallary;
  protected mainModal: Modal;
  protected formOrder: FormOrder;
  protected formContact: FormContact;
  protected success: Success;
  protected basket: ProductBasket;
  protected basketModal: Basket;
  protected cardBasket: CardBasket;

  // В конструкторе инициализируются все модели которые будут использоваться  
  // И которые можно инициализировать сейчас
  constructor() {
    this.events = new EventEmitter();
    this.api = new ApiClient(API_URL);
    this.mainCatalog = new MainCatalog(this.events);
    this.buyer = new Buyer(this.events);

    this.header = new Header(
      this.events,
      document.querySelector(".header") as HTMLElement,
    );
    this.mainGallery = new Gallary(
      document.querySelector(".page__wrapper") as HTMLElement,
    );
    this.mainModal = new Modal(
      this.events,
      document.querySelector(".modal") as HTMLElement,
    );
    this.basketModal = new Basket(
      this.events,
      cloneTemplate(document.querySelector("#basket") as HTMLTemplateElement),
    );
    this.basket = new ProductBasket(this.events);
    this.cardBasket = new CardBasket(
      cloneTemplate(
        document.querySelector("#card-basket") as HTMLTemplateElement,
      ),
    );

    this.cardModal = new CardModal(
      cloneTemplate(
        document.querySelector("#card-preview") as HTMLTemplateElement,
      ),
      {
        onClick: () => this.events.emit("buy:click", this.mainCatalog.card),
      },
    );

    this.formOrder = new FormOrder(
      this.events,
      cloneTemplate(document.querySelector("#order") as HTMLTemplateElement),
    );
    this.formContact = new FormContact(
      this.events,
      cloneTemplate(document.querySelector("#contacts") as HTMLTemplateElement),
    );
    this.success = new Success(
      this.events,
      cloneTemplate(document.querySelector("#success") as HTMLTemplateElement),
    );

    this.initializateEvent();
  }

  /**
   * Главынй метод класса, создается отдельно для наследного класса
   * Реализует всю логику взаимодействия с классами
   */
  abstract  initializateEvent():void ;
  
  /**
   * Метод для post обращению к серверу, через api
   * @param orderInfo - Информация об покупателе, корзине и сумме товаров
   */
  async submitOrder(orderInfo: any): Promise<void> {
    try {
      const response: PostAnswer = await this.api.postOrder(orderInfo);
      this.basket.clearBascet();
      this.buyer.clearBuer();
      this.mainModal.render({
        content: this.success.render({ summa: response.total }),
      });
    } catch (err) {
      console.error("Ошибка отправки заказа: ", err);
    }
  }
  /**
   * Метод для получения, данных для отрисовки
   * Метод запрашивает данные с сервера при помощи api и сохраняет данные в каталог приложения
   */
  async initialize(): Promise<void> {
    try {
      const catalogOfServer: IProduct[] = await this.api.getProductCards();
      this.mainCatalog.saveProducts = catalogOfServer;
    } catch (err) {
      console.error("Ошибка при загрузке каталога: ", err);
    }
  }
}
