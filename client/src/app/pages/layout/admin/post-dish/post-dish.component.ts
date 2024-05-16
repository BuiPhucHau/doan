import { Component, ElementRef, ViewChild } from '@angular/core';
import { TaigaModule } from '../../../../shared/taiga.module';
import { ShareModule } from '../../../../shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DishState } from '../../../../ngrx/state/dish.state';
import { StorageState } from '../../../../ngrx/state/storage.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as StorageAction from '../../../../ngrx/actions/storage.actions';
import * as CategoryAction from '../../../../ngrx/actions/category.actions'
import * as DishAction from '../../../../ngrx/actions/dish.actions';
import { Category } from '../../../../models/category.model';
import { categoryState } from '../../../../ngrx/state/category.state';
@Component({
  selector: 'app-post-dish',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './post-dish.component.html',
  styleUrl: './post-dish.component.scss',
})
export class PostDishComponent {
  isCreateDish$ = this.store.select('dish', 'isAddSuccess');

  categories = <Category[]>[];

  fileName: string = '';
  createImageSuccess$ = this.store.select('storage', 'isCreateSuccess');

  selectedImage: string | ArrayBuffer | null = null;
  

  addDishForm = new FormGroup({
    dId: new FormControl('', Validators.required),
    _id: new FormControl('', Validators.required),
    nameDish: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    featured: new FormControl ('', Validators.required),
    quantity: new FormControl ('', Validators.required),
    status: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });

  addDishData: any = {
    dishId: '',
    cId: '',
    nameDish: '',
    price: '',
    description: '',
    quantity : 0,
    featured: false,
    status: true,
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
    this.store.select('category', 'categories').subscribe((val) => {
      if (val != null && val != undefined) {
        this.categories = val;
      }
    });
    
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
    });
    this.store.select('storage').subscribe((val) => {
      if (val?.isGetSuccess) {
        this.addDishData.image = val.storage?._id;
        this.store.dispatch(DishAction.createDish({ dish: this.addDishData }));
      }
    });
    this.isCreateDish$.subscribe((val) => {
      if (val) {
        console.log(val);
        alert('Create dish success');
        this.addDishData = {
          dishId: '',
          name: '',
          price: '',
          description: '',
          image: '',
          category: '',
        };
        this.store.dispatch(DishAction.resetIsAddSuccess());
      }
    });
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}

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
    console.log(this.file);
  } 

  createDish() {

    const selectedCategory = this.categories.find(category => category._id === this.addDishForm.value._id);
    if (!selectedCategory) {
      console.error('No category found ');
      return;
    }

    this.addDishData
      = {
        dId: this.addDishForm.value.dId,
        category: selectedCategory,
        nameDish: this.addDishForm.value.nameDish,
        price: this.addDishForm.value.price,
        description: this.addDishForm.value.description,
        status: true,
        featured: false,
        quantity: parseInt(this.addDishForm.value.quantity || '0'),
        image: this.addDishForm.value.image,
        
      };
      console.log('Thêm dish thành công', this.addDishData);
      this.fileName = this.addDishForm.value.dId + '_' + this.addDishForm.value.nameDish;
      console.log(this.file);
      
      this.store.dispatch(StorageAction.create({ file: this.file, fileName: this.fileName }));
    }
}
