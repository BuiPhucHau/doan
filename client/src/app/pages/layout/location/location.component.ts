import { Component, OnDestroy } from '@angular/core';
import { ShareModule } from '../../../shared/shared.module';
import { TaigaModule } from '../../../shared/taiga.module';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocationState } from '../../../ngrx/state/location.state';
import { Subscription } from 'rxjs';
import { get } from '../../../ngrx/actions/location.actions';
import { Location } from '../../../models/location.model';


@Component({
  selector: 'app-location',
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent implements OnDestroy {

  location$ = this.store.select('location', 'locationList');
  locationList: Location[] = [];

  subcriptions: Subscription[] = [];

 constructor(private router: Router,
  private store: Store<{
    location: LocationState;
  }>
 ){
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

 ngOnInit() {
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
 
  ngOnDestroy(): void {
    this.subcriptions.forEach((sub) => sub.unsubscribe());
  }

  
  detail(){

    this.router.navigate(['/base/location/detail']);
  }



}