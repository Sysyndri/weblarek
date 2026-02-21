import {
  IApi,
  IBuyer,
  IProduct,
  PostAnswer,
  ValidationErrors,
} from "../../types";
import { API_URL } from "../../utils/constants";
import { cloneTemplate } from "../../utils/utils";
import { EventEmitter, IEvents } from "../base/Events";
import { ApiClient } from "../models/ApiClient";
import { Buyer } from "../models/Buyer";
import { MainCatalog } from "../models/MainCatalog";
import { ProductBasket } from "../models/ProductBascet";
import { Basket } from "../view/Basket";
import { CardBasket } from "../view/CardBasket";
import { CardCatalog } from "../view/CardCatalog";
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

interface IApiClient {
  getProductCards(): Promise<IProduct[]>;
  postOrder(orderInfo: any): Promise<PostAnswer>;
}

interface IMainCatalog {
  products: IProduct[];
  card: IProduct | null;
  saveProducts: IProduct[];
}

interface IBuyerModel {
  shopperData: IBuyer;
  setNewShopperData(data: Partial<IBuyer>): void;
  checkData(): ValidationErrors;
  clearBuer(): void;
}

interface IProductBasket {
  products: IProduct[];
  addProduct(product: IProduct): void;
  delProduct(id: string): void;
  countProducts(): number;
  getSumProductsPrice(): number;
  checkProduct(id: string): boolean;
  clearBascet(): string;
}

interface IHeader {
  render(data: { counter: number }): HTMLElement;
}

interface IBasket {
  render(data?: any): HTMLElement;
}

interface IGallary {
  render(data: { catalog: HTMLElement[] }): HTMLElement;
}

interface IModal {
  render(data: { content: HTMLElement }): HTMLElement;
  open(): void;
  close(): void;
}

interface ISuccess {
  render(data: { summa: number }): HTMLElement;
}

interface ICardModal {
  render(data: any): HTMLElement;
}

interface ICardBasket {
  render(product: IProduct & { index: number }): HTMLElement;
}

interface IFormOrder {
  render(data?: any): HTMLElement;
}

interface IFormContact {
  render(data?: any): HTMLElement;
}

export class Present {
  protected events: IEvents;

  protected api: IApiClient;
  protected basket: IProductBasket;
  protected mainCatalog: IMainCatalog;
  protected buyer: IBuyerModel;

  protected header: IHeader;
  protected basketModal: IBasket;
  protected mainGallery: IGallary;
  protected mainModal: IModal;
  protected success: ISuccess;
  protected cardModal: ICardModal;
  protected cardBasket: ICardBasket;
  protected formOrder: IFormOrder;
  protected formContact: IFormContact;

  // В конструкторе инициализируются все модели которые будут использоваться
  // И которые можно инициализировать сейчас
  constructor(
    events: EventEmitter,
    api: IApiClient,
    mainCatalog: IMainCatalog,
    buyer: IBuyerModel,
    header: IHeader,
    mainGallery: IGallary,
    mainModal: IModal,
    basketModal: IBasket,
    basket: IProductBasket,
    cardBasket: ICardBasket,
    cardModal: ICardModal,
    formOrder: IFormOrder,
    formContact: IFormContact,
    success: ISuccess,
  ) {
    this.events = events;
    this.api = api;
    this.mainCatalog = mainCatalog;
    this.buyer = buyer;
    this.header = header;
    this.mainGallery = mainGallery;
    this.mainModal = mainModal;
    this.basketModal = basketModal;
    this.basket = basket;
    this.cardBasket = cardBasket;
    this.cardModal = cardModal;
    this.formOrder = formOrder;
    this.formContact = formContact;
    this.success = success;
    this.events = new EventEmitter();
    this.api = new ApiClient(API_URL);
    this.mainCatalog = new MainCatalog(this.events);
    this.buyer = new Buyer(this.events);

    this.header = new Header(
      this.events,
      document.querySelector(".header") as HTMLElement,
    );
    this.mainGallery = new Gallary(
      document.querySelector(".gallery") as HTMLElement,
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
  initializateEvent(): void {
    // Отрисовка каталога товаров полученных по api
    this.events.on("catalog:change", () => {
      const cards = this.mainCatalog.products.map((product) => {
        const card = new CardCatalog(
          cloneTemplate(
            document.querySelector("#card-catalog") as HTMLTemplateElement,
          ),
          {
            onClick: () => this.events.emit("card:select", product),
          },
        );
        return card.render(product);
      });
      this.mainGallery.render({ catalog: cards });
    });

    // Выбор карточки товара
    this.events.on("card:select", (product: IProduct) => {
      this.mainCatalog.card = product;
      this.events.emit("card:save");
    });

    // Сохранение выбраной карточки
    this.events.on("card:save", () => {
      const selectCard = this.mainCatalog.card;

      if (!selectCard) return;

      const cardModalRender = {
        ...selectCard,
        buttonText:
          selectCard.price === null
            ? "Недоступно"
            : this.basket.checkProduct(selectCard.id)
              ? "Удалить из корзины"
              : "Купить",
        buttonStatus: !Boolean(selectCard.price),
      };
      const modalElement = this.cardModal.render(cardModalRender);
      this.mainModal.render({ content: modalElement });
      this.mainModal.open();
    });

    this.events.on("buy:click", (product: IProduct) => {
      if (!this.basket.checkProduct(product.id)) {
        this.basket.addProduct(product);
      } else {
        this.basket.delProduct(product.id);
      }

      this.mainModal.close();
    });

    // Покупка, удаление из коррзины
    this.events.on("basket:change", () => {
      const counter = this.basket.countProducts();
      const productsBasket = this.basket.products;

      const products = productsBasket.map(
        (product: IProduct, index: number) => {
          const productCard = new CardBasket(
            cloneTemplate(
              document.querySelector("#card-basket") as HTMLTemplateElement,
            ),
            {
              onClick: () => this.events.emit("product:remove", product),
            },
          );
          const card = {
            ...product,
            index: index + 1,
          };

          return productCard.render(card);
        },
      );

      const cardRender = {
        products: products,
        summa: this.basket.getSumProductsPrice(),
        statusBtn: !Boolean(this.basket.getSumProductsPrice()),
      };

      this.basketModal.render(cardRender);

      this.header.render({ counter: counter });
    });

    // Открытие корзины
    this.events.on("basket:open", () => {
      this.mainModal.render({ content: this.basketModal.render() });
      this.mainModal.open();
    });

    // Удаление из корзины
    this.events.on("product:remove", (product: IProduct) => {
      this.basket.delProduct(product.id);
    });

    // Оформление заказа
    this.events.on("order:open", () => {
      this.mainModal.render({ content: this.formOrder.render() });
    });

    // Редактирование формы заказа
    this.events.on("form:edit", (formInfo: Partial<IBuyer>) => {
      this.buyer.setNewShopperData(formInfo);
    });

    // Открытие формы данных пользователя
    this.events.on("contact:open", () => {
      this.mainModal.render({ content: this.formContact.render() });
    });

    // Изменение данных покупателя
    this.events.on("buyer:change", (buyer: IBuyer) => {
      const errors = this.buyer.checkData();
      const { payment, address } = errors;
      const errorsForm = { payment, address };
      const buttonStatus = !Object.values(errorsForm).every(
        (err) => err === null,
      );

      const formRender = {
        ...buyer,
        erors: errorsForm,
        buttonStatus,
      };

      this.formOrder.render(formRender);
    });

    // Изменение контактных данных
    this.events.on("contact:change", (info) => {
      const err = this.buyer.checkData();
      const { email, phone } = err;
      const errContactForm = { email, phone };
      const btnStatus = !Object.values(errContactForm).every(
        (elem) => elem === null,
      );
      const formRender = {
        ...info,
        erors: errContactForm,
        buttonStatus: btnStatus,
      };
      this.formContact.render(formRender);
    });

    // Отправка заказа
    this.events.on("order:submit", () => {
      const err = this.buyer.checkData();
      if (!Object.values(err).every((elem) => elem === null)) {
        this.mainModal.render({ content: this.formContact.render() });
      } else {
        const items = this.basket.products.map(
          (product: IProduct) => product.id,
        );
        const orderInfo = {
          ...this.buyer.shopperData,
          total: this.basket.getSumProductsPrice(),
          items,
        };

        this.submitOrder(orderInfo);
      }
    });

    // Закрытие модального окна
    this.events.on("modal:close", () => {
      this.mainModal.close();
    });
  }

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
