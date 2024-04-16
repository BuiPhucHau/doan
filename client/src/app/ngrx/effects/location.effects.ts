import { Injectable } from "@angular/core";
import { LocationService } from "../../service/location/location.service";
import * as LocationActions from "../actions/location.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()
export class LocationEffects {
  constructor(private locationService: LocationService, private action$ : Actions) {}

  getLocation$ = createEffect(() =>
    this.action$.pipe(
      ofType(LocationActions.get),
      exhaustMap(() =>
        this.locationService.getLocation().pipe(
          map((items) => {
            if(items.length > 0) {
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