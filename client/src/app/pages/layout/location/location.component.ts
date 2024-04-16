import { Component, OnDestroy } from '@angular/core';
import { ShareModule } from '../../../shared/shared.module';
import { TaigaModule } from '../../../shared/taiga.module';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocationState } from '../../../ngrx/state/location.state';
import { Subscription } from 'rxjs';
import * as LocationActions from '../../../ngrx/actions/location.actions';
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
   this.store.dispatch(LocationActions.get());
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
  this.store.dispatch(LocationActions.get());
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

  // locations = [
  //   {
  //     name:"Curst Gourmet Nguyễn Thị Minh Khai",
  //     address:"MGallery Saigon, 76-78 Nguyễn Thị Minh Khai, Phường 6, Quận 3, Thành phố Hồ Chí Minh"
  //   },
  //   {
      
  //     name:"Curst Gourmet Trường Sơn",
  //     address:"Số 01 Trường Sơn, Cư Xá Bắc Hải, P.15, Quận 10"
  //   },
    
  //   {
      
  //     name:"Curst Gourmet Nguyễn Thị Thập",
  //     address:"45 Nguyễn Thị Thập, P.Tân Hưng, Khu dân cư Him Lam, Quận 7"
  //   },

  //   {
      
  //     name:"Curst Gourmet Ngô Đức Kế",
  //     address:" 35 Ngô Đức Kế, Phường Bến Nghé, Quận 1"
  //   },

  //   {
      
  //     name:"Curst Gourmet Trường Sơn",
  //     address:"Số 01 Trường Sơn, Cư Xá Bắc Hải, P.15, Quận 10 "
  //   },

  //   {
      
  //     name:"Curst Gourmet Trần Hưng Đạo",
  //     address:" 661 Trần Hưng Đạo, Phường 1, Quận 5, Tp. HCM"
  //   }
   
  // ];

  detail(){
    this.router.navigate(['/base/location/detail']);
  }



}