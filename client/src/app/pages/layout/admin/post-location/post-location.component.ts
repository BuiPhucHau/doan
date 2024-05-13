import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocationState } from '../../../../ngrx/state/location.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import * as LocationAction from '../../../ngrx/actions/location.actions';
import * as LocationActions from '../../../../ngrx/actions/location.actions';

import * as StorageAction from '../../../../ngrx/actions/storage.actions';
import { StorageState } from '../../../../ngrx/state/storage.state';
import { ShareModule } from '../../../../shared/shared.module';
import { TaigaModule } from '../../../../shared/taiga.module';


@Component({
  selector: 'app-post-location',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './post-location.component.html',
  styleUrl: './post-location.component.scss',
})
export class PostLocationComponent {

  isCreateLocation$ = this.store.select('location', 'location');
  fileName: string = '';
  createImageSuccess$ = this.store.select('storage', 'isCreateSuccess');

  selectedImage: string | ArrayBuffer | null = null;

  newLocation = new FormGroup({
    locationId: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });



  constructor(
    private router: Router,
    private store: Store<{
      location: LocationState;
      storage: StorageState;
    }>
  ) {
    // this.createImageSuccess$.subscribe((val) => {
    //   console.log(val);
    //   if (val) {
    //     console.log(val);
    //     this.store.dispatch(
    //       StorageAction.get({
    //         fileName: this.fileName,
    //       })
    //     );
    //   }
    // });
    // this.store.select('storage').subscribe((val) => {
    //   if (val.isGetSuccess) {
    //     // this.newLocation.image = val.storage._id;
    //     this.store.dispatch(LocationAction.createLocation({ location: this.newLocation }));
    //   }
    // });
    // this.isCreateLocation$.subscribe ((val) => {
    //   if (val) {
    //     console.log(val);
    //     alert('Tạo location thành công');
    //   }
    // });
  }

  formDate: FormData =  new FormData();
  file: any;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.formDate.append('image', file, file.name);
    this.file = file;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedImage = reader.result;
    };
    console.log(this.file);
  }

  createLocation() {
    const newLocation: any = {
      locationId: this.newLocation.value.locationId ?? '',
      name: this.newLocation.value.name ?? '',
      phone: this.newLocation.value.phone ?? '',
      address: this.newLocation.value.address ?? '',
    };
    console.log('Thêm location thành công', newLocation);

    this.fileName = this.newLocation.value.locationId + '_' + this.newLocation.value.name;
    this.store.dispatch(
      StorageAction.create({ file: this.file, fileName: this.fileName })
    );
  }

}
