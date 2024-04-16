import { createAction, props } from '@ngrx/store';
import { Category } from '../../models/category.model';

export const get = createAction (
    '[category] get all'
)

export const getSuccess = createAction (
    '[category] get success',
    props<{categories: Category[]}>()
);

export const getFailure = createAction (
    '[category] get failure',
    props<{errorMessage: any}>()
);