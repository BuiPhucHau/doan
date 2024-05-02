import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LocationState } from '../../../ngrx/state/location.state';
import { Location } from '../../../models/location.model';
import { get } from '../../../ngrx/actions/location.actions';
import { LocationService } from '../../../service/location/location.service'; 
import { ShareModule } from '../../../shared/shared.module';
import { TaigaModule } from '../../../shared/taiga.module';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnDestroy {
  location$ = this.store.select('location', 'locationList');
  locationList: Location[] = [];
  selectedLocation: any;
  subcriptions: Subscription[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
    private store: Store<{ location: LocationState }>
  ) {
    this.store.dispatch(get());
    this.subcriptions.push(
      this.location$.subscribe((locationList) => {
        if(locationList.length > 0){
          console.log(locationList);
          this.locationList = locationList;
        }
      }),
    );
  
  }
  ngOnInit():void {
    this.store.dispatch(get());
     this.subcriptions.push(
       this.location$.subscribe((locationList) => {
         if(locationList.length > 0){
           console.log(locationList);
           this.locationList = locationList;
         }
       }),
     );
     const loId = this.route.snapshot.paramMap.get('locationId');
     if (loId) {
       this.locationService.getLocationById(loId).subscribe((location: any) => {
         this.selectedLocation = location;
       });
     }
    //  this.route.params.subscribe(params => {
    //   const locationId = params['locationId'];
    //   if (locationId) {
    //     this.selectedLocation = this.locationList.find(location => location.locationId === locationId);
    //   }
    // });
  }
   ngOnDestroy(): void {
    this.subcriptions.forEach((sub) => sub.unsubscribe());
  }

 

 
  tablebooking() {
    this.router.navigate(['base/booking']);
  }

home() {
    this.router.navigate(['base/home']);
  }
  goBack() {
    this.router.navigate(['base/menu']);
  }
  Back(): void {
    this.router.navigate(['/base/location']);
  }
  new() {
    this.router.navigate(['base/new']);
  }
  order() {
    this.router.navigate(['base/order']);
  }
  contact() {
    this.router.navigate(['base/contact']);
  }
 
}

