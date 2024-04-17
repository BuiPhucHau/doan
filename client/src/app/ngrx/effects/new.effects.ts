import { Injectable } from "@angular/core";
import { NewService } from "../../service/new/new.service";
import * as NewActions from "../actions/new.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()
export class NewEffects {
  constructor(private newService: NewService, private action$ : Actions) {}

  getNew$ = createEffect(() =>
    this.action$.pipe(
      ofType(NewActions.get),
      exhaustMap(() =>
        this.newService.getNew().pipe(
          map((items) => {
            if(items.length > 0) {
              return NewActions.getSuccess({ newList: items });
            } else {
              return NewActions.getFailure({ getErrMess: 'No location found' });
            }
          }),
          catchError((err) => of(NewActions.getFailure({ getErrMess: err })))
        )
      )
    )
  );
}