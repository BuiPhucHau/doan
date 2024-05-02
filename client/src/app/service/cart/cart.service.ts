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



  constructor(private h: HttpClient) { }

  items: ICart[] = [];


  addToCart(dCart: Dish): void {
    var index = this.items.findIndex(x => x.dId === dCart.dId);
    if (index >= 0) {
      this.items[index].quantity += 1;
      return;
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
        quantity: 1
      }
      this.items.push(c);
    }
  }

  getSelectedDishes() {
    return this.items;
  }
  removeFromCart(dId: string): void {
    const index = this.items.findIndex(item => item.dId === dId);
    if (index !== -1) {
      this.items.splice(index, 1)
    }
  }

  clearCart() {
    this.items = [];
    return this.items;
  }

}

