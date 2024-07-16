import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  imports: [ShareModule, TaigaModule], // Import shared and Taiga modules
  templateUrl: './post-location.component.html', // Template URL
  styleUrl: './post-location.component.scss', // Stylesheet URL
})
export class PostLocationComponent implements OnDestroy, OnInit {
  // Arrays and variables for storing data and managing state
  locationList: Location[] = [];

  selectedImage: string | ArrayBuffer | null = null;
  fileName: string = '';

  currentLocation: Location | null = null;

  isUpdateClicked: boolean = false;
  isChangeFile: boolean = false;
  locationDataToUpdate: any = {};
  isUpdateLocation: boolean = false;
  fileNameToUpdate: string = '';

  // Reactive Form for adding a location
  addLocationForm = new FormGroup({
    locationId: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
  });

  // Object to hold data for adding a location
  addLocationData: any = {
    locationId: '',
    name: '',
    phone: '',
    address: '',
    image: '',
  };

  // Form for example purposes
  exampleForm = new FormGroup({
    exampleControl: new FormControl(''),
  });

  // Subscriptions array to manage all subscriptions
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private store: Store<{ location: LocationState; storage: StorageState }>
  ) {
   
  }

  ngOnInit(): void {
     // Dispatch action to fetch locations when component initializes
     this.store.dispatch(LocationActions.get());

     // Subscribe to various observables
     this.subscriptions.push(
       // Subscribe to locationList changes
       this.store
         .select('location', 'locationList')
         .subscribe((locationList) => {
           if (locationList.length > 0) {
             console.log(locationList);
             this.locationList = locationList;
           }
         }),
 
       // Subscribe to changes in the 'location' state for fallback handling
       this.store.select('location').subscribe((val) => {
         if (val != null && val != undefined) {
           this.locationList = val.locationList;
         }
       }),
 
       // Subscribe to createImageSuccess$ to handle image creation success
       this.store.select('storage', 'isCreateSuccess').subscribe((val) => {
         console.log(val);
         if (val) {
           console.log(val);
           // If image creation is successful, fetch the stored image
           this.store.dispatch(
             StorageAction.get({
               fileName: this.fileName,
             })
           );
         }
       }),
 
       // Subscribe to storage state changes for further handling after image creation
       this.store.select('storage').subscribe((val) => {
         if (val?.isGetSuccess) {
           console.log(val);
           if (this.isUpdateLocation) {
             this.locationDataToUpdate.image = val.storage?._id;
             console.log(this.locationDataToUpdate);
             this.store.dispatch(
               LocationAction.updateLocation({
                 location: this.locationDataToUpdate,
               })
             );
           } else {
             this.addLocationData.image = val.storage?._id;
             this.store.dispatch(
               LocationAction.createLocation({ location: this.addLocationData })
             );
           }
         }
       }),
 
       this.store.select('location', 'isCreateLocationSuccess').subscribe((val) => {
         console.log('Addsc', val);
         if (val) {
           alert('Create location success');
           // Reset form and data after successful creation
           this.addLocationData = {
             locationId: '',
             name: '',
             phone: '',
             address: '',
             image: '',
           };
           this.addLocationForm.reset();
           // Refresh location list
           this.store.dispatch(LocationAction.get());
         }
       }),
 
       // Subscribe to updateLocation$ to handle successful location update
       this.store.select('location', 'isUpdateSuccess').subscribe((val) => {
         if (val) {
           alert('Update location success');
           this.addLocationData = {
             locationId: '',
             name: '',
             phone: '',
             address: '',
             image: '',
           };
           this.addLocationForm.reset();
           // Refresh location list after update
           this.store.dispatch(LocationAction.get());
           this.isUpdateLocation = false; // Reset update mode flag
         }
       }),
 
       // Subscribe to removeLocation$ to handle successful location removal
       this.store.select('location', 'isRemoveSuccess').subscribe((val) => {
         if (val) {
           alert('Delete location success'); // Notify success
           // Refresh location list after removal
           this.store.dispatch(LocationAction.get());
         }
       })
     );
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  // Handling file input selection
  formData: FormData = new FormData();
  file: any;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.formData.append('image', file, file.name);
    this.file = file;

    // Read and display the selected image
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedImage = reader.result;
    };
    this.isChangeFile = true; // Flag to indicate file change
    console.log(this.file);
  }

  // Method to create a new location
  createLocation() {
    this.addLocationData = {
      locationId: this.addLocationForm.value.locationId,
      name: this.addLocationForm.value.name,
      phone: this.addLocationForm.value.phone,
      address: this.addLocationForm.value.address,
    };

    // Construct a unique file name for the uploaded image
    this.fileName =
      this.addLocationForm.value.locationId +
      '_' +
      this.addLocationForm.value.name;

    console.log(this.file);

    // Dispatch action to create a new storage entry for the image
    this.store.dispatch(
      StorageAction.create({ file: this.file, fileName: this.fileName })
    );
  }

  // Method to remove a location
  removeLocation(locationId: string) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this location?'
    );
    if (confirmDelete) {
      this.store.dispatch(LocationAction.removeLocation({ locationId }));
    }
  }

  // Method to prepare for updating a location
  updateLocation(locationId: string): void {
    this.isUpdateClicked = true;
    // Find the current location data by ID
    this.currentLocation =
      this.locationList.find(
        (location) => location.locationId === locationId
      ) || null;
    if (this.currentLocation) {
      this.addLocationForm.setValue({
        locationId: this.currentLocation.locationId,
        name: this.currentLocation.name,
        phone: this.currentLocation.phone,
        address: this.currentLocation.address,
        image: this.currentLocation.image._id.toString(), // Assuming image ID for update
      });
    }
  }

  // Method to finalize location update
  onUpdateLocation(): void {
    const locationData = {
      locationId: this.addLocationForm.value.locationId,
      name: this.addLocationForm.value.name,
      phone: this.addLocationForm.value.phone,
      address: this.addLocationForm.value.address,
      image: this.addLocationForm.value.image, // Assuming image ID for update
    };
    this.locationDataToUpdate = locationData;

    // If no file change, directly update the location
    if (!this.isChangeFile) {
      console.log('no change file');
      this.store.dispatch(
        LocationAction.updateLocation({ location: locationData })
      );
    } else {
      // If file is changed, first create a new storage entry for the updated image
      this.fileName =
        this.addLocationForm.value.locationId +
        '_' +
        this.addLocationForm.value.name;
      this.store.dispatch(
        StorageAction.create({ file: this.file, fileName: this.fileName })
      );
      this.fileNameToUpdate = this.fileName;
      this.isUpdateLocation = true; // Set flag indicating update mode with file change
      console.log('change file');
    }
  }
}
