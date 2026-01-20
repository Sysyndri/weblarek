import { IBuyer, TPayment, ValidationErrors } from "../../types";

/**
 * Класс модели данных отвечающий за хранение данных пользователя и ее валидацию
 */
export class Buyer{

  constructor(
    protected _payment: TPayment, 
    protected _address: string, 
    protected _email: string,
    protected _phone: string,
  ) {}

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
  newShopperData(
    payment?: TPayment, 
    address?: string, 
    email?: string, 
    phone?: string
  ): void 
  {
    this._payment = payment ?? this._payment;
    this._address = address ?? this._address;
    this._email = email ?? this._email;
    this._phone = phone ?? this._phone;
  }

  /**
   * Удаляет данные пользователя и возвращает к исходному значению
   */
  clearBuer(): void {
    this._payment = null;
    this._address = '';
    this._email = '';
    this._phone = '';
  }
  
  /**
   * Проверяет данные пользователя на правильность заполнения
   * @returns возвращает обьект с ошибками если они есть, 
   * если нет, то возвращает boolean - true
   */
  checkData(): ValidationErrors | boolean {

    const errors: ValidationErrors = {};

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

    if (Object.keys(errors).length !== 0) {
      return errors
    } 

    return true
  }

}

