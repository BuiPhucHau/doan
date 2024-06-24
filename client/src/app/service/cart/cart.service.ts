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
  //add to cart from detail
  addToDetail(dCart: Dish): void {
    this.item = {
      _id: dCart._id,
      dId: dCart.dId,
      nameDish: dCart.nameDish,
      description: dCart.description,
      price: dCart.price,
      image: dCart.image,
      category: dCart.category,
      featured: dCart.featured,
      quantity: 1,
    }
    this.saveDetailToLocalStorage();
  }
  //add to cart from menu
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
        featured: dCart.featured,
        quantity: 1,
      }
      this.items.push(c);
    }
    this.saveCartToLocalStorage();
  }
  //get dish detail
  getItemDetail() {
    this.loadDetailtFromLocalStorage();
    console.log(this.item);
    return this.item;
  }
  //get dish from cart
  getSelectedDishes() {
    this.loadCartFromLocalStorage();
    console.log(this.items);
    return this.items;
  }
  //remove dish from cart
  removeFromCart(dId: string): void {
    const index = this.items.findIndex(item => item.dId === dId);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.saveCartToLocalStorage();
    }
  }
  //clear cart
  clearCart() {
    this.items = [];
    localStorage.removeItem(this.cartKey);
  }
  // save dish detail to local storage 
  private saveDetailToLocalStorage(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.item));
    console.log("save sucsses");
  }
  //save cart to local storage
  private saveCartToLocalStorage(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.items));
    console.log(this.items);
  }
  //load cart from local storage
  private loadCartFromLocalStorage(): void {
    const storedItems = localStorage.getItem(this.cartKey);
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    }
  }
  //load detail from local storage
  private loadDetailtFromLocalStorage(): void {
    const storedItems = localStorage.getItem(this.cartKey);
    if (storedItems) {
      this.item = JSON.parse(storedItems);
    }
    console.log("get sucsses");
  }
}

