import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { LocationService } from '../../service/location/location.service';
import * as LocationActions from '../actions/location.actions';

@Injectable()
export class LocationEffects {

  constructor(
    private actions$: Actions,
    private locationService: LocationService
  ) { }

  getLocation$ = createEffect(() => 
    this.actions$.pipe(
    ofType(LocationActions.get),
    exhaustMap(() =>
      this.locationService.getLocation().pipe(
        map((items) => {
          if (items.length > 0) {
            return LocationActions.getSuccess({ locationList: items });
          } else {
            return LocationActions.getFailure({ getErrMess: 'No location found' });
          }
        }),
        catchError((err) => of(LocationActions.getFailure({ getErrMess: err })))
      )
    )
  )
  );
}
