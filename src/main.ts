import { EventEmitter } from "./components/base/Events";
import { Presenter } from "./components/baseClasssView/Presenter";
import { ApiClient } from "./components/models/ApiClient";
import { Buyer } from "./components/models/Buyer";
import { MainCatalog } from "./components/models/MainCatalog";
import { ProductBasket } from "./components/models/ProductBascet";
import { Basket } from "./components/view/Basket";
import { CardBasket } from "./components/view/CardBasket";
import { CardModal } from "./components/view/CardModal";
import { FormContact } from "./components/view/FormContact";
import { FormOrder } from "./components/view/FormOrder";
import { Gallary } from "./components/view/Gallary";
import { Header } from "./components/view/Header";
import { Modal } from "./components/view/Modal";
import { Success } from "./components/view/Success";
import "./scss/styles.scss";
import { API_URL } from "./utils/constants";
import { cloneTemplate } from "./utils/utils";

const events = new EventEmitter();

const api = new ApiClient(API_URL);
const basket = new ProductBasket(events);
const mainCatalog = new MainCatalog(events);
const buyer = new Buyer(events);

const header = new Header(
  events,
  document.querySelector(".header") as HTMLElement,
);
const basketModal = new Basket(
  events,
  cloneTemplate(document.querySelector("#basket") as HTMLTemplateElement),
);
const mainGallery = new Gallary(
  document.querySelector(".gallery") as HTMLElement,
);
const mainModal = new Modal(
  events,
  document.querySelector(".modal") as HTMLElement,
);
const success = new Success(
  events,
  cloneTemplate(document.querySelector("#success") as HTMLTemplateElement),
);

const cardModal = new CardModal(
  events,
  cloneTemplate(
    document.querySelector("#card-preview") as HTMLTemplateElement,
  ),
    );
const cardBasket = new CardBasket(
  cloneTemplate(
    document.querySelector("#card-basket") as HTMLTemplateElement,
  ), {
    onClick: () => events.emit("product:remove")
  }
);
const formOrder = new FormOrder(
  events,
  cloneTemplate(document.querySelector("#order") as HTMLTemplateElement),
);
const formContact = new FormContact(
  events,
  cloneTemplate(document.querySelector("#contacts") as HTMLTemplateElement),
);



const presenter = new Presenter(events, api, mainCatalog, buyer, header, mainGallery, mainModal, basketModal, basket, cardBasket, cardModal, formOrder, formContact, success)
await presenter.initialize();
