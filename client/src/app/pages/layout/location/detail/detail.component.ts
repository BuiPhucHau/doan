import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LocationState } from '../../../../ngrx/state/location.state';
import { Location } from '../../../../models/location.model';
import { ShareModule } from '../../../../shared/shared.module';
import { TaigaModule } from '../../../../shared/taiga.module';
import { get } from '../../../../ngrx/actions/location.actions';
import { LocationService } from '../../../../service/location/location.service'; 

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnDestroy, OnInit {

  // Observable for location state
  location$ = this.store.select('location', 'locationList');
  locationList: Location[] = [];
  selectedLocation: any;

  // Array to hold subscriptions for cleanup
  subcriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
    private store: Store<{ location: LocationState }>
  ) {
    // Dispatch action to get location data
    this.store.dispatch(get());
    // Subscribe to location observable
    this.subcriptions.push(
      this.location$.subscribe((locationList) => {
        if (locationList.length > 0) {
          console.log(locationList);
          this.locationList = locationList;
        }
      }),
    );
  }

  ngOnInit(): void {
    // Dispatch action to get location data on init
    this.store.dispatch(get());
    // Subscribe to location observable
    this.subcriptions.push(
      this.location$.subscribe((locationList) => {
        if (locationList.length > 0) {
          console.log(locationList);
          this.locationList = locationList;
        }
      }),
    );
    // Code to get location detail by ID from route params (commented out)
    // const loId = this.route.snapshot.paramMap.get('locationId');
    // if (loId) {
    //   this.locationService.getLocationById(loId).subscribe((location: any) => {
    //     this.selectedLocation = location;
    //   });
    // }
  }

  // Method to get location detail from the service
  item = this.locationService.getLocationDetail();

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subcriptions.forEach((sub) => sub.unsubscribe());
  }

  // Method to navigate back to location list
  Back(): void {
    this.router.navigate(['/base/location']);
  }

  // Method to navigate to the booking page
  tablebooking(location: Location): void {
    // this.locationService.addToLocationDetail(location); // (commented out)
    this.router.navigate(['base/booking']);
  }
}
