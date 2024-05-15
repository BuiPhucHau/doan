import { Component, ElementRef, ViewChild } from '@angular/core';
import { TaigaModule } from '../../../../shared/taiga.module';
import { ShareModule } from '../../../../shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DishState } from '../../../../ngrx/state/dish.state';
import { StorageState } from '../../../../ngrx/state/storage.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as StorageAction from '../../../../ngrx/actions/storage.actions';
import * as DishAction from '../../../../ngrx/actions/dish.actions';
@Component({
  selector: 'app-post-dish',
  standalone: true,
  imports: [TaigaModule, ShareModule],
  templateUrl: './post-dish.component.html',
  styleUrl: './post-dish.component.scss',
})
export class PostDishComponent {
  isCreateDish$ = this.store.select('dish', 'isAddSuccess');

  fileName: string = '';
  createImageSuccess$ = this.store.select('storage', 'isCreateSuccess');

  selectedImage: string | ArrayBuffer | null = null;

  addDishForm = new FormGroup({
    dId: new FormControl('', Validators.required),
    nameDish: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
  });

  addDishData: any = {
    dishId: '',
    name: '',
    price: '',
    description: '',
    image: '',
    category: '',
  };

  constructor(
    private router: Router,
    private store: Store<{
      dish: DishState;
      storage: StorageState;
    }>
  ) {
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
    this.addDishData
      = {
        dishId: this.addDishForm.value.dId,
        name: this.addDishForm.value.nameDish,
        price: this.addDishForm.value.price,
        description: this.addDishForm.value.description,
        image: this.addDishForm.value.image,
        category: this.addDishForm.value.category,
      };
      console.log('Thêm dish thành công', this.addDishData);
      this.fileName = this.addDishForm.value.dId + '_' + this.addDishForm.value.nameDish;
      console.log(this.file);

      this.store.dispatch(StorageAction.create({ file: this.file, fileName: this.fileName }));
    }
}
