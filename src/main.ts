import { Present } from "./components/baseClasssView/Present";
import { CardBasket } from "./components/view/CardBasket";
import { CardCatalog } from "./components/view/CardCatalog";
import "./scss/styles.scss";
import { IBuyer, IProduct } from "./types";
import { cloneTemplate } from "./utils/utils";

class Presenter extends Present{
  initializateEvent(): void {
    // Отрисовка каталога товаров
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
}


const presenter = new Presenter();
await presenter.initialize();
