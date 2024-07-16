import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CategoryService } from "../../service/category/category.service";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import * as CategoryActions from "../actions/category.actions";
@Injectable()
export class CategoryEffects {
    constructor(private  action$: Actions, private  categoryService: CategoryService) {}

    getCategory$ = createEffect(() =>
        this.action$.pipe(
        ofType(CategoryActions.get),
           exhaustMap(() =>
            this.categoryService.getCategories().pipe(
                map((items) => {
                    if(items.length > 0) {
                        return CategoryActions.getSuccess({ categories: items });
                    } else {
                        return CategoryActions.getFailure({ errorMessage: 'No category found' });
                    }
                }),
                catchError((err) => of(CategoryActions.getFailure({ errorMessage: err })))
        )
    )
    )
    );  
}