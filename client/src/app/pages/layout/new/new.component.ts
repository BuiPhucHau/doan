import { Component, OnDestroy } from '@angular/core';
import { ShareModule } from '../../../shared/shared.module';
import { TaigaModule } from '../../../shared/taiga.module';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NewState } from '../../../ngrx/state/new.state';
import { Subscription } from 'rxjs';
import { get } from '../../../ngrx/actions/new.actions';
import { New } from '../../../models/new.model';
import * as NewActions from '../../../ngrx/actions/new.actions';


@Component({
  selector: 'app-new',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent implements OnDestroy{

[x: string]: any;
selectedSlide: number = 0;

  new$ = this.store.select('new', 'newList');
  newList: New[] = [];

  currentIndex = 0;
  transformStyle = '';
  autoSlideSubscription = new Subscription();
  subcriptions: Subscription[] = [];
selectednew: any;

 constructor(
  private router: Router,
  private store: Store<{
    new: NewState;
  }>
 ){
  this.store.dispatch(get());
   this.subcriptions.push(
     this.new$.subscribe((newList) => {
       if(newList.length > 0){
         console.log(newList);
         this.newList = newList;
       }
     }),
   );

 }


//  moveCarousel(direction: 'prev' | 'next') {
//   if (direction === 'next') {
//     this.currentIndex++;
//   } else if (this.currentIndex > 0) { // You might want to check boundaries
//     this.currentIndex--;
//   }
//   this.updateTransformStyle();
// }

// private updateTransformStyle() {
//   const offset = this.currentIndex * -100; // Adjust as needed
//   this.transformStyle = `translateX(${offset}%)`;
// }
// 

 ngOnInit(){
  this.store.dispatch(get());
  this.subcriptions.push(
    this.new$.subscribe((newList) => {
      if(newList.length > 0){
        console.log(newList);
        this.newList = newList;
      }
    }),

  );
  this.startAutoSlide();

 }
 

 
  ngOnDestroy(): void {
    this.subcriptions.forEach((sub) => sub.unsubscribe());
    this.stopAutoSlide();

  }

  startAutoSlide(): void {
    const autoSlide = setInterval(() => {
      this.moveToNextSlide();
    }, 3000);
    this.autoSlideSubscription = new Subscription(() => clearInterval(autoSlide));
  }

  stopAutoSlide(): void {
    if (this.autoSlideSubscription) {
      this.autoSlideSubscription.unsubscribe();
    }
  }

  moveToNextSlide(): void {
    let nextIndex = this.currentIndex + 1;
    if (nextIndex >= this.newList.length) {
      nextIndex = 0;
    }
    this.moveToSlide(nextIndex);
  }
  
  moveToSlide(index: number): void {
    if (index < 0) {
      index = this.newList.length - 1;
    } else if (index >= this.newList.length) {
      index = 0;
    }
    this.currentIndex = index;
    this.transformStyle = `translateX(-${100 * this.currentIndex}%)`;
  }
}
  
  // goback(newId :string ){
  //   this.router.navigate(['base/new/', newId]);
  //   console.log(newId);
  // }



