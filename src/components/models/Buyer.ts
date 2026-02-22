import { IBuyer, TPayment, ValidationErrors } from "../../types";
import { IEvents } from "../base/Events";

/**
 * Класс модели данных отвечающий за хранение данных пользователя и ее валидацию
 */
export class Buyer{
  
  private payment: TPayment = ''; 
  private address: string = ''; 
  private email: string = '';
  private phone: string = '';


  constructor(protected event: IEvents) {}


  /**
   * Позволяет получить все данные пользователя
   */
  getShopperData(): IBuyer {
    return {
      "payment": this.payment,
      "address": this.address,
      "email": this.email,
      "phone": this.phone,
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
    if (payment !== undefined) {
      this.payment = payment
      this.event.emit('buyer:change')
    }
    if (address !== undefined) {
      this.address = address
      this.event.emit('buyer:change')
    }
    if (email !== undefined) {
      this.email = email
      this.event.emit('buyer:change')
    }
    if (phone !== undefined) {
      this.phone = phone
      this.event.emit('buyer:change')
    }
  }

  /**
   * Удаляет данные пользователя и возвращает к исходному значению
   */
  clearBuyer(): void {
    this.payment = '';
    this.address = '';
    this.email = '';
    this.phone = '';
    this.event.emit('buyer:change')
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

    if (!this.payment) {
      errors.payment = 'Не выбран способ оплаты';
    }

    if (!this.address?.trim()) {
      errors.address = 'Укажите адресс доставки';
    }

    if (!this.email?.trim()) {
      errors.email = 'Укажите ваш email'
    }

    if (!this.phone?.trim()) {
      errors.phone = 'Укажите ваш номер телефона'
    }

    return errors;
  }

}

