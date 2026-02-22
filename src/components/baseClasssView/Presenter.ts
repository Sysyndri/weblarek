import {
  IBuyer,
  IProduct,
  PostAnswer,
  ValidationErrors,
} from "../../types";
import { cloneTemplate, createCardBasket, createCardCatalog } from "../../utils/utils";
import { IEvents } from "../base/Events";


interface IApiClient {
  getProductCards(): Promise<IProduct[]>;
  postOrder(orderInfo: any): Promise<PostAnswer>;
}

interface IMainCatalog {
  getProducts(): IProduct[];
  getCard(): IProduct;
  setCard(arg0: IProduct): void;
  setSaveProducts(arg0: IProduct[]): void;
}

interface IBuyerModel {
  getShopperData(): IBuyer;
  setNewShopperData(data: Partial<IBuyer>): void;
  checkData(): ValidationErrors;
  clearBuyer(): void;
}

interface IProductBasket {
  getProducts(): IProduct[];
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
  address: string;
  render(data?: any): HTMLElement;
}

interface IFormContact {
  phone: string;
  email: string;
  render(data?: any): HTMLElement;
}

/**
 * Класс для связи между всеми классами в приложении.
 * Предоставляет доступ к моделям данных и View классам приложения
 */
export class Presenter {

  // В конструкторе инициализируются все модели которые будут использоваться
  // И которые можно инициализировать сейчас
  constructor(
    protected events: IEvents,
    protected api: IApiClient,
    protected mainCatalog: IMainCatalog,
    protected buyer: IBuyerModel,
    protected header: IHeader,
    protected mainGallery: IGallary,
    protected mainModal: IModal,
    protected basketModal: IBasket,
    protected basket: IProductBasket,
    protected cardBasket: ICardBasket,
    protected cardModal: ICardModal,
    protected formOrder: IFormOrder,
    protected formContact: IFormContact,
    protected success: ISuccess,
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
 
    this.initializateEvent();
  }

  /**
   * Главынй метод класса, реализует всю логику взаимодействия с классами
   */
  initializateEvent(): void {
    // Отрисовка каталога товаров полученных по api
    this.events.on("catalog:change", () => {
      const cards = this.mainCatalog.getProducts().map((product) => {
        const card = createCardCatalog(
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
      this.mainCatalog.setCard(product);
    });

    // Сохранение выбраной карточки
    this.events.on("card:save", () => {
      const selectCard = this.mainCatalog.getCard();

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

    this.events.on("buy:click", () => {
      const selectProduct: IProduct = this.mainCatalog.getCard();
      if (!this.basket.checkProduct(selectProduct.id)) {
        this.basket.addProduct(selectProduct);
      } else {
        this.basket.delProduct(selectProduct.id);
      }
      this.mainModal.close();
    });

    // Покупка, удаление из коррзины
    this.events.on("basket:change", () => {
      const counter = this.basket.countProducts();
      const productsBasket = this.basket.getProducts();

      const products = productsBasket.map(
        (product: IProduct, index: number) => {
          const productCard = createCardBasket(
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
      const statusBtn = !Boolean(this.basket.getSumProductsPrice())
      
      this.mainModal.render({ content: this.basketModal.render({statusBtn: statusBtn})});
      this.mainModal.open();
    });

    // Удаление из корзины
    this.events.on("product:remove", (product: IProduct) => {
      this.basket.delProduct(product.id);
    });

    // Оформление заказа
    this.events.on("order:open", () => {
      const { payment, address} = this.buyer.checkData();
      const errorsOrderForm = { payment, address };

      this.mainModal.render({ content: this.formOrder.render({ erors: errorsOrderForm}) });
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
    this.events.on("buyer:change", () => {
      const { payment, address, email, phone } = this.buyer.checkData();

      // Данные формы order
      const errorsOrderForm = { payment, address };
      const orderButtonStatus = !Object.values(errorsOrderForm).every(
        (err) => err === null,
      );

      const buyer = this.buyer.getShopperData()

      const formRender = {
        payment: buyer.payment,
        erors: errorsOrderForm,
        buttonStatus: orderButtonStatus,
      };

      this.formOrder.render(formRender);

      // Данные формы contacts
      const errorsContactForm = { email, phone };
      const contactButtonStatus = !Object.values(errorsContactForm).every(
        (elem) => elem === null,
      );

      const contactRender = {
        ...buyer,
        erors: errorsContactForm,
        buttonStatus: contactButtonStatus,
      };

      this.formContact.render(contactRender)
    });

    this.events.on("order:submit", () => {
      this.mainModal.render({content: this.formContact.render()})
    })

    // Отправка заказа
    this.events.on("contacts:submit", () => {
      const items = this.basket.getProducts().map(
        (product: IProduct) => product.id,
      );
      const orderInfo = {
        ...this.buyer.getShopperData(),
        total: this.basket.getSumProductsPrice(),
        items,
      };
      

      this.submitOrder(orderInfo);
    });

    // Закрытие модального окна
    this.events.on("modal:newBuy", () => {
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
      this.buyer.clearBuyer();      
      
      this.formOrder.address = '';
      this.formContact.phone = '';
      this.formContact.email = '';

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
      this.mainCatalog.setSaveProducts(catalogOfServer);
    } catch (err) {
      console.error("Ошибка при загрузке каталога: ", err);
    }
  }
}

