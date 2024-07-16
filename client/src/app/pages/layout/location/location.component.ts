import { Component, OnDestroy, OnInit } from '@angular/core';  // Import OnInit for ngOnInit lifecycle hook
import { ShareModule } from '../../../shared/shared.module';
import { TaigaModule } from '../../../shared/taiga.module';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocationState } from '../../../ngrx/state/location.state';
import { Subscription } from 'rxjs';
import { get } from '../../../ngrx/actions/location.actions';
import { Location } from '../../../models/location.model';
import * as LocationActions from '../../../ngrx/actions/location.actions';
import { LocationService } from '../../../service/location/location.service';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent implements OnDestroy, OnInit {
  // Observable for location state
  location$ = this.store.select('location', 'locationList');
  locationList: Location[] = [];

  // Array to hold subscriptions for cleanup
  subcriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private locationService: LocationService,
    private store: Store<{
      location: LocationState;
    }>
  ) {
  }

  // Lifecycle hook that runs after the component is initialized
  ngOnInit() {
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

  // Lifecycle hook that runs when the component is destroyed
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subcriptions.forEach((sub) => sub.unsubscribe());
  }

  // Method to navigate to location detail page
  detail(locaDetail: Location) {
    // Add location detail to the service
    this.locationService.addToLocationDetail(locaDetail);
    // Navigate to the location detail page
    this.router.navigate(['base/location/detail/']);
  }
}
