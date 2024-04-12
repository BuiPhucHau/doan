import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LocationService } from '../../service/location/location.service';
import * as LocationActions from '../actions/location.actions';

@Injectable()
export class LocationEffects {

  constructor(
    private actions$: Actions,
    private locationService: LocationService
  ) {}

  loadLocation$ = createEffect(() => this.actions$.pipe(
    ofType(LocationActions.get),
    switchMap(() =>
      this.locationService.getLocation().pipe(
        map(locationList => LocationActions.getSuccess({ locationList })),
        catchError(error => of(LocationActions.getFailure({ getErrMess: error.message }))) 
      )
    )
  ));
}
