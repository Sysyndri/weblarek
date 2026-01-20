import { ApiClient } from './components/models/ApiClient';
import { Buyer } from './components/models/Buyer';
import { MainCatalog } from './components/models/MainCatalog';
import { ProductBasket } from './components/models/ProductBascet';
import './scss/styles.scss';
import { IProduct } from './types';
import { API_URL } from './utils/constants';



// Проверка Api
const Response = new ApiClient(API_URL)

const dataCatalog =  await Response.getProductCards()

// Проверка MinCatalog
const Catalog = new MainCatalog()
Catalog.saveProducts = dataCatalog
const card: IProduct | string = Catalog.getProduct("854cef69-976d-4c2a-a18c-2aa45046c390")

if (typeof(card) !== 'string') {
  Catalog.card = card
}

console.log(Catalog.products)
console.log(Catalog.card)


// Проверка Buyer
const Person = new Buyer('cash', 'Россия', '12213@mail.ru', "89022213")

console.log(Person.checkData())
console.log(Person.shopperData)

Person.clearBuer()
console.log(Person.checkData())

Person.newShopperData('card', "Сыктывкар", "121@", '899900')
console.log(Person.checkData())
console.log(Person.shopperData)


// Проверка ProductBasket
const Basket = new ProductBasket()

Basket.addProduct(Catalog.card)
console.log(Basket.products)

Basket.clearBascet()
console.log(Basket.products)

for (let product of Catalog.products) {
  Basket.addProduct(product)
}
console.log(Basket.products)
console.log(Basket.checkProduct("854cef69-976d-4c2a-a18c-2aa45046c390"))
console.log(Basket.checkProduct('1'))

console.log(Basket.countProducts())
console.log(Basket.sumProtuctsPrice())

console.log(Basket.delProduct("854cef69-976d-4c2a-a18c-2aa45046c390"))
console.log(Basket.checkProduct("854cef69-976d-4c2a-a18c-2aa45046c390"))
console.log(Basket.products)


console.log(import.meta.env)



