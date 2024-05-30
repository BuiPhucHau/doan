import { Injectable } from '@angular/core';
import { TableService } from '../../service/table/table.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import * as TableActions from '../actions/table.actions';

@Injectable()
export class TableEffects {
  constructor(private tableService: TableService, private action$: Actions) {}

  getTable$ = createEffect(() =>
    this.action$.pipe(
      ofType(TableActions.get),
      exhaustMap(() =>
        this.tableService.getTable().pipe(
          map((items) => {
            if (items.length > 0) {
              return TableActions.getSuccess({ tableList: items });
            } else {
              return TableActions.getFailure({ getErrMess: 'No table found' });
            }
          }),
          catchError((err) => of(TableActions.getFailure({ getErrMess: err })))
        )
      )
    )
  );

  getTableByLocationId$ = createEffect(() =>
    this.action$.pipe(
      ofType(TableActions.getByLocationId),
      exhaustMap((action) =>
        this.tableService.getByLocation(action.locationId).pipe(
          map((tables) => {
            // console.log('tables', tables)
            return TableActions.getByLocationIdSuccess({ tableList: tables });
          }),
          catchError((error) => {
            return of(
              TableActions.getByLocationIdFailure({
                getByLocationIdErrMess: error,
              })
            );
          })
        )
      )
    )
  );

  updateTableStatus$ = createEffect(() =>
    this.action$.pipe(
      ofType(TableActions.checkoutTable),
      mergeMap(action => this.tableService.updateTableStatus(action.tableId).pipe(
        map(table => TableActions.updateTableStatusSuccess({ table })),
        catchError(error => of(TableActions.updateTableStatusFailure({ error })))
      ))
    )
  );
}
