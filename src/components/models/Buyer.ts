import { IBuyer, TPayment, ValidationErrors } from "../../types";
import { IEvents } from "../base/Events";

/**
 * Класс модели данных отвечающий за хранение данных пользователя и ее валидацию
 */
export class Buyer{
  
  private _payment: TPayment = ''; 
  private _address: string = ''; 
  private _email: string = '';
  private _phone: string = '';


    constructor(protected event: IEvents) {}


  /**
   * Позволяет получить все данные пользователя
   */
  get shopperData(): IBuyer {
    return {
      "payment": this._payment,
      "address": this._address,
      "email": this._email,
      "phone": this._phone,
    }
  }
  

  /**
   * Позволяет поменять данные пользователя
   * Можно поменять как все поля сразу, так и одно из них
   * @param payment - вид оплаты
   * @param address - адресс пользователя
   * @param email - емаил пользователя
   * @param phone - телефон пользователя
   */
  setNewShopperData({payment, address, email, phone}: Partial<IBuyer>): void 
  {
    this._payment = payment ?? this._payment;
    this._address = address ?? this._address;
    this._email = email ?? this._email;
    this._phone = phone ?? this._phone;

    if (payment || address) {
      this.event.emit('buyer:change', this.shopperData)
    }

    if (email || phone) {
      this.event.emit('contact:change', this.shopperData)
    }
  }

  /**
   * Удаляет данные пользователя и возвращает к исходному значению
   */
  clearBuer(): void {
    this._payment = null;
    this._address = '';
    this._email = '';
    this._phone = '';
    this.event.emit('buyer:change', this.shopperData)
    this.event.emit('contact:change', this.shopperData)
  }
  
  /**
   * Проверяет данные пользователя на правильность заполнения
   * @returns возвращает обьект с ошибками
   */
  checkData(): ValidationErrors{

    const errors: ValidationErrors = {
      payment: null,
      email: null,
      phone: null,
      address: null
    };

    if (!this._payment) {
      errors.payment = 'Не выбран способ оплаты';
    }

    if (!this._address?.trim()) {
      errors.address = 'Укажите адресс доставки';
    }

    if (!this._email?.trim()) {
      errors.email = 'Укажите ваш email'
    }

    if (!this._phone?.trim()) {
      errors.phone = 'Укажите ваш номер телефона'
    }

    return errors;
  }

}

