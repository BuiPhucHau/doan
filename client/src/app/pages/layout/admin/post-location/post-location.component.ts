import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocationState } from '../../../../ngrx/state/location.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as LocationAction from '../../../../ngrx/actions/location.actions';
import * as LocationActions from '../../../../ngrx/actions/location.actions';
import { Location } from '../../../../models/location.model';
import * as StorageAction from '../../../../ngrx/actions/storage.actions';
import { StorageState } from '../../../../ngrx/state/storage.state';
import { ShareModule } from '../../../../shared/shared.module';
import { TaigaModule } from '../../../../shared/taiga.module';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-location',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './post-location.component.html',
  styleUrl: './post-location.component.scss',
})
export class PostLocationComponent implements OnDestroy, OnInit {
  locationList : Location [] = [];

  location$ = this.store.select('location', 'locationList');

  isCreateLocation$ = this.store.select('location', 'isAddSuccess');

  createImageSuccess$ = this.store.select('storage', 'isCreateSuccess');

  removeLocation$ = this.store.select('location', 'isRemoveSuccess');

  selectedImage: string | ArrayBuffer | null = null;
  fileName: string = '';
  
  subscriptions: Subscription[] = [];
  
  addLocationForm = new FormGroup({
    locationId: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });

  addLocationData: any = {
    locationId: '',
    name: '',
    phone: '',
    address: '',
    image: '',
  }

  constructor(
    private router: Router,
    private store: Store<{
      location: LocationState;
      storage: StorageState;
    }>
  ) {
    this.store.dispatch(LocationActions.get());
    this.subscriptions.push(
      this.location$.subscribe((locationList) => {
        if(locationList.length > 0){
          console.log(locationList);
          this.locationList = locationList;
        }
      }),
      this.store.select('location').subscribe((val) => {
        if (val != null && val != undefined) {
          this.locationList = val.locationList;
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
          this.addLocationData.image = val.storage?._id;
          this.store.dispatch(LocationAction.createLocation({ location: this.addLocationData }));
        }
      }),
  
      this.isCreateLocation$.subscribe ((val) => {
        if (val) {
          console.log(val);
          alert('Tạo location thành công');
          this.addLocationData = {
            locationId: '',
            name: '',
            phone: '',
            address: '',
            image: '',
          };
          this.store.dispatch(LocationAction.resetIsAddSuccess());
        }
      }),
      this.removeLocation$.subscribe((val) => {
        if (val) {
          alert('Xóa location thành công');
          this.store.dispatch(LocationAction.get());
        }
      }),
    );
  }
  
  ngOnInit(): void {
    
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  formData: FormData =  new FormData();
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

  createLocation() {
    this.addLocationData = {
      locationId: this.addLocationForm.value.locationId,
      name: this.addLocationForm.value.name,
      phone: this.addLocationForm.value.phone,
      address: this.addLocationForm.value.address,
      // image: this.addLocationForm.value.image,
     };
    console.log('Thêm location thành công', this.addLocationData);

    this.fileName = this.addLocationForm.value.locationId + '_' + this.addLocationForm.value.name;

    console.log(this.file);
    
    this.store.dispatch(
      StorageAction.create({ file: this.file, fileName: this.fileName })
    );
  }

  removeLocation(locationId: string) {
    const confirmDelete = confirm("Are you sure you want to delete this location?");
    if (confirmDelete) {
      this.store.dispatch(LocationAction.removeLocation({ locationId }));
    }
  }
  

}
