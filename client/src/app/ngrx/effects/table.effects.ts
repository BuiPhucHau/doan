import { Injectable } from "@angular/core";
import { TableService } from "../../service/table/table.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map } from "rxjs";
import * as TableActions from "../actions/table.actions";

@Injectable()
export class TableEffects {
  constructor(private tableService : TableService, private action$: Actions) {}

    getTable$ = createEffect(() =>
        this.action$.pipe(
        ofType(TableActions.get),
        exhaustMap(() =>
            this.tableService.getTable().pipe(
            map((items) => {
                if(items.length > 0) {
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
}