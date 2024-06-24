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
    this.store.dispatch(get()); // Dispatch action to get locations

    // Subscribe to location$ observable
    this.subcriptions.push(
      this.location$.subscribe((locationList) => {
        if(locationList.length > 0){
          console.log(locationList);
          this.locationList = locationList;
        }
      }),
    );
  }

  // Lifecycle hook for initialization
  ngOnInit():void {
    this.store.dispatch(get()); // Dispatch action to get locations

    // Subscribe to location$ observable
    this.subcriptions.push(
      this.location$.subscribe((locationList) => {
        if(locationList.length > 0){
          console.log(locationList);
          this.locationList = locationList;
        }
      }),
    );

    // Get locationId from route parameters
    const loId = this.route.snapshot.paramMap.get('locationId');
    if (loId) {
      // Fetch location details by ID
      this.locationService.getLocationById(loId).subscribe((location: any) => {
        this.selectedLocation = location;
      });
    }
  }

  // Lifecycle hook for cleanup
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subcriptions.forEach((sub) => sub.unsubscribe());
  }

  // Navigation methods
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

