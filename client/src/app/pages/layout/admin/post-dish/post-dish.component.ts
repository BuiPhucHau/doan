import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TaigaModule } from '../../../../shared/taiga.module';
import { ShareModule } from '../../../../shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DishState } from '../../../../ngrx/state/dish.state';
import { StorageState } from '../../../../ngrx/state/storage.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as StorageAction from '../../../../ngrx/actions/storage.actions';
import * as CategoryAction from '../../../../ngrx/actions/category.actions';
import * as DishAction from '../../../../ngrx/actions/dish.actions';
import * as DishActions from '../../../../ngrx/actions/dish.actions';
import { Category } from '../../../../models/category.model';
import { categoryState } from '../../../../ngrx/state/category.state';
import { Dish } from '../../../../models/dish.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-post-dish',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './post-dish.component.html',
  styleUrl: './post-dish.component.scss',
})
export class PostDishComponent implements OnDestroy, OnInit {
  dishList: Dish[] = [];

  dish$ = this.store.select('dish', 'dishList');

  isCreateDish$ = this.store.select('dish', 'isAddSuccess');

  removeDish$ = this.store.select('dish', 'isRemoveSuccess');

  updateDish$ = this.store.select('dish', 'isUpdateSuccess');

  categories = <Category[]>[];

  createImageSuccess$ = this.store.select('storage', 'isCreateSuccess');

  selectedImage: string | ArrayBuffer | null = null;
  fileName: string = '';

  currentDish: Dish | null = null;
  isUpdateClicked: boolean = false;

  isChangeFile: boolean = false;
  dishDataToUpdate: any = {};
  isUpdateDish: boolean = false;
  fileNameToUpdate: string = '';

  subscriptions: Subscription[] = [];

  addDishForm = new FormGroup({
    dId: new FormControl('', Validators.required),
    _id: new FormControl('', Validators.required),
    nameDish: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });

  addDishData: any = {
    dId: '',
    nameDish: '',
    description: '',
    price: '',
    quantity: 0,
    featured: false,
    image: '',
  };

  constructor(
    private router: Router,
    private store: Store<{
      dish: DishState;
      category: categoryState;
      storage: StorageState;
    }>
  ) {
    this.store.dispatch(CategoryAction.get());
    this.store.dispatch(DishActions.get({}));
    this.subscriptions.push(
      this.store.select('category', 'categories').subscribe((val) => {
        if (val != null && val != undefined) {
          this.categories = val;
        }
      }),
      this.store.select('dish').subscribe((val) => {
        if (val != null && val != undefined) {
          this.dishList = val.dishList;
        }
      }),
      this.createImageSuccess$.subscribe((val) => {
        console.log(val);
        if (val) {
          console.log(val);
          this.store.dispatch(
            StorageAction.get({
              fileName: this.fileName,
            })
          );
        }
      }),
      this.store.select('storage').subscribe((val) => {
        if (val?.isGetSuccess) {
          console.log(val);
          if(this.isUpdateDish){
          this.dishDataToUpdate.image = val.storage?._id;
          console.log(this.dishDataToUpdate);
          
          this.store.dispatch(DishAction.updateDish({ dish: this.dishDataToUpdate }));
          }else
          {this.addDishData.image = val.storage?._id;
          this.store.dispatch(DishAction.createDish({ dish: this.addDishData }));}
        }
      }),
      this.isCreateDish$.subscribe((val) => {
        if (val) {
          console.log(val);
          alert('Create dish success');
          this.addDishData = {
            dId: '',
            name: '',
            price: '',
            description: '',
            image: '',
            category: '',
          };
          this.addDishForm.reset();
          this.store.dispatch(DishAction.get({}));
        }
      }),
      this.updateDish$.subscribe ((val) => {
        if (val) {
          alert('Cập nhật dish thành công');
          this.addDishData = {
            dId: '',
            name: '',
            price: '',
            description: '',
            image: '',
            category: '',
          };
          this.addDishForm.reset();
          this.store.dispatch(DishAction.get({}));
          this.isUpdateDish = false;
        }
      }),
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  formData: FormData = new FormData();
  file: any;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.formData.append('image', file, file.name);
    this.file = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedImage = reader.result;
    };
    this.isChangeFile = true;
    console.log(this.file);
  }

  createDish() {
    const selectedCategory = this.categories.find(
      (category) => category._id === this.addDishForm.value._id
    );
    if (!selectedCategory) {
      console.error('No category found ');
      return;
    }

    this.addDishData = {
      dId: this.addDishForm.value.dId,
      category: selectedCategory,
      nameDish: this.addDishForm.value.nameDish,
      price: this.addDishForm.value.price,
      description: this.addDishForm.value.description,
      featured: false,
      quantity: parseInt(this.addDishForm.value.quantity || '0'),
      // image: this.addDishForm.value.image,
    };
    console.log('Thêm dish thành công', this.addDishData);

    this.fileName =
      this.addDishForm.value.dId + '_' + this.addDishForm.value.nameDish;
    console.log(this.file);

    this.store.dispatch(
      StorageAction.create({ file: this.file, fileName: this.fileName })
    );
  }

  //funtion update
  updateDish(dId: string): void {
    this.isUpdateClicked = true;
    this.currentDish = this.dishList.find(dish => dish.dId === dId) || null;
    if (this.currentDish) {
      this.addDishForm.setValue({
        dId: this.currentDish.dId,
        _id: this.currentDish.category._id,
        nameDish: this.currentDish.nameDish,
        description: this.currentDish.description,
        price: this.currentDish.price.toString(), 
        quantity: this.currentDish.quantity ? this.currentDish.quantity.toString() : '0',
        image: this.currentDish.image._id.toString()

      });
    }
  }

   //funtion onUpdate
  onUpdateDish(): void {
    const dishData = {
      dId: this.addDishForm.value.dId,
      _id: this.addDishForm.value._id,
      nameDish: this.addDishForm.value.nameDish,
      description: this.addDishForm.value.description,
      price: this.addDishForm.value.price,
      featured: false,
      quantity: this.addDishForm.value.quantity,
      image: this.addDishForm.value.image,
    };
    this.dishDataToUpdate = dishData;
    //Nếu edit được click
    if (!this.isChangeFile) {
      console.log("no change file");
      
      this.store.dispatch(DishAction.updateDish({ dish: dishData }));
    }else{
      this.fileName = this.addDishForm.value.dId + '_' + this.addDishForm.value.nameDish;
      this.store.dispatch(
        StorageAction.create({ file: this.file, fileName: this.fileName })
      );
      this.fileNameToUpdate = this.fileName;
      this.isUpdateDish = true;
      console.log("change file");
      
    }
  }

  //funtion delete
  removeDish(dId: string) {
    const confirmDelete = confirm("Are you sure you want to delete this dish?");
    if (confirmDelete) {
      this.store.dispatch(DishAction.removeDish({ dId }));
    }
  }

}
