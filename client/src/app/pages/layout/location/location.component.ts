import { Component, OnDestroy } from '@angular/core';
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
export class LocationComponent implements OnDestroy {

  location$ = this.store.select('location', 'locationList');
  locationList: Location[] = [];


  subcriptions: Subscription[] = [];

 constructor(
  private router: Router,
  private locationService: LocationService,
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

 ngOnInit(){
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

  
  detail(locaDetail : Location ){
    this.locationService.addToLocationDetail(locaDetail);
    this.router.navigate(['base/location/detail/']);
  }



}