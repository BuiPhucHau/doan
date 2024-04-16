import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LocationState } from '../../../../ngrx/state/location.state';
import { Location } from '../../../../models/location.model';
import { ShareModule } from '../../../../shared/shared.module';
import { TaigaModule } from '../../../../shared/taiga.module';
import { get } from '../../../../ngrx/actions/location.actions'; 
@Component({
  selector: 'app-detail',  
  standalone: true,
  imports: [ShareModule, TaigaModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnDestroy {

  location$ = this.store.select('location', 'locationList');
  locationList: Location[] = [];

  subcriptions: Subscription[] = [];
  constructor(
    private router: Router,
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

 

  goBack(): void {
    this.router.navigate(['/base/location']);
  }
}
