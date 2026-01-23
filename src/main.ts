import { ApiClient } from './components/models/ApiClient';
import { Buyer } from './components/models/Buyer';
import { MainCatalog } from './components/models/MainCatalog';
import { ProductBasket } from './components/models/ProductBascet';
import './scss/styles.scss';
import { IProduct } from './types';

// Проверка Api
const api = new ApiClient()

const dataCatalog =  await api.getProductCards()

// Проверка MinCatalog
const catalog = new MainCatalog()
catalog.saveProducts = dataCatalog
const card: IProduct | string = catalog.getProduct("854cef69-976d-4c2a-a18c-2aa45046c390")

if (typeof(card) !== 'string') {
  catalog.card = card
}

console.log('Каталог продуктов - ',catalog.products)
console.log('Карточка текущего товара - ', catalog.card)


// Проверка Buyer
const person = new Buyer()

person.setNewShopperData({
  payment:'cash', 
  address:'Россия',
  email: '12213@mail.ru',
  phone: "89022213"
})

console.log(`Проверка правильности заполнения данных пользователя - ${person.checkData()}`)
console.log('Получаем все данные пользователя - ', person.shopperData)

person.clearBuer()
console.log('Проверка правильности заполнения данных пользователя после очистки данных - ', person.checkData())

person.setNewShopperData({phone: '29922'})
console.log('Проверяем что можно добавлять только одно свойство - ', person.shopperData)

person.setNewShopperData({
  payment: 'card', 
  address: 'Сыктывкар',
  email: '12213@mail.ru',
  phone: "89022213"
})
console.log(`Проверка правильности заполнения данных пользователя после заполнения новых данных - ${person.checkData()}`)
console.log('Получаем все данные пользователя после обновления - ', person.shopperData)


// // Проверка ProductBasket
const basket = new ProductBasket()

basket.addProduct(catalog.card)
console.log('Получаем все карточки товаров в корзине - ', basket.products)

basket.clearBascet()
console.log('Получаем все карточки товаров в корзине после очистки корзины - ', basket.products)

for (let product of catalog.products) {
  basket.addProduct(product)
}
console.log('Получаем все карточки товаров в корзине после добавления карточек - ', basket.products)
console.log(`Проверка наличия товара по его id - ${basket.checkProduct("854cef69-976d-4c2a-a18c-2aa45046c390")}
\nid - 854cef69-976d-4c2a-a18c-2aa45046c390`)

console.log(`Проверка наличия товара по его id - ${basket.checkProduct('1')}\nid - 1`)

console.log(`Подсчет количества товаров в корзине - ${basket.countProducts()}`)
console.log(`Подсчет суммы продуктов добавленных в корзину - ${basket.getSumProductsPrice()}`)

console.log('Попытка удалить элемент, которого нет в корзине - ', basket.delProduct('12'))
console.log('Удаление товара из корзины по id - ', basket.delProduct("854cef69-976d-4c2a-a18c-2aa45046c390"),
'\nid - 854cef69-976d-4c2a-a18c-2aa45046c390')

console.log(`Проверка наличия товара по его id после удаления из корзины - 
  ${basket.checkProduct("854cef69-976d-4c2a-a18c-2aa45046c390")}\nid - 854cef69-976d-4c2a-a18c-2aa45046c390`)

console.log('Получаем все карточки товаров в корзине после удаления - ', basket.products)