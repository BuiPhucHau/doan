import { Injectable } from '@angular/core';
import { Dish } from '../../models/dish.model';
import { Category } from '../../models/category.model';
import { ICart } from '../../models/icart';
import { Storage } from '../../models/storage.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = 'cartItems';

  constructor(private http: HttpClient) { }

  items: ICart[] = [];
  item: ICart = {} as ICart;
  
  addToDetail(dCart: Dish): void {
    this.item = {
      _id: dCart._id,
      dId: dCart.dId,
      nameDish: dCart.nameDish,
      description: dCart.description,
      price: dCart.price,
      image: dCart.image,
      category: dCart.category,
      status: dCart.status,
      featured: dCart.featured,
      quantity: 1,
      bringBack: dCart.bringBack,
    }
    this.saveDetailToLocalStorage();
  }

  addToCart(dCart: Dish): void {
    var index = this.items.findIndex(x => x.dId === dCart.dId);
    if (index >= 0) {
      this.items[index].quantity += 1;
    } else {
      var c: ICart;
      c = {
        _id: dCart._id,
        dId: dCart.dId,
        nameDish: dCart.nameDish,
        description: dCart.description,
        price: dCart.price,
        image: dCart.image,
        category: dCart.category,
        status: dCart.status,
        featured: dCart.featured,
        quantity: 1,
        bringBack: dCart.bringBack,
      }
      this.items.push(c);
    }
    this.saveCartToLocalStorage();
  }

  getItemDetail() {
    this.loadDetailtFromLocalStorage();
    console.log(this.item);
    return this.item;
  }

  getSelectedDishes() {
    this.loadCartFromLocalStorage();
    console.log(this.items);
    return this.items;
  }

  removeFromCart(dId: string): void {
    const index = this.items.findIndex(item => item.dId === dId);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.saveCartToLocalStorage();
    }
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem(this.cartKey);
  }
  
  private saveDetailToLocalStorage(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.item));
    console.log("luu thanh cong");
  }
  private saveCartToLocalStorage(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.items));
    console.log(this.items);
  }

  private loadCartFromLocalStorage(): void {
    const storedItems = localStorage.getItem(this.cartKey);
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }
  }
  private loadDetailtFromLocalStorage(): void {
    const storedItems = localStorage.getItem(this.cartKey);
    if (storedItems) {
      this.item = JSON.parse(storedItems);
    }
    console.log("get thanh cong");
  }
}

