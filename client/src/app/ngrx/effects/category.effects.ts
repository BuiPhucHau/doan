import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CategoryService } from "../../service/category/category.service";
import { catchError, map, of, switchMap } from "rxjs";
import * as CategoryActions from "../actions/category.actions";
@Injectable()
export class CategoryEffects {
    constructor(private  action$: Actions, private  categoryService: CategoryService) {}

    getCategory$ = createEffect(() =>
        this.action$.pipe(
            ofType(CategoryActions.get),
            switchMap(() => {
                return this.categoryService.getCategories();
            }),
            map((categories) => {
                return CategoryActions.getSuccess({ categories: categories });
            }),
            catchError((error) => {
                return of(CategoryActions.getFailure({ errorMessage: error }));
            })
        )
    );
}