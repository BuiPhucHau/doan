import { createAction, props } from '@ngrx/store';
import { Dish } from '../../models/dish.model';

export const get = createAction(
    '[Dish] get all',
    props<{ featured?: boolean }>()
    
  );

export const getSuccess = createAction(
  '[Dish] get success',
  props<{ dishList: Dish[] }>()
);

export const getFailure = createAction(
    '[Dish] get failure',
    props<{ getErrMess: any }>()
);

// export const add = createAction(
//   '[Dish] add',
//   props<{ newDish: any }>()
// );

// export const addSuccess = createAction(
//     '[Dish] add success',
// );

// export const addFailure = createAction(
//   '[Dish] add failure',
//   props<{ addErrMess: any }>()
// );

// export const remove = createAction(
//   '[Dish] delete',
//   props<{ dishId: string }>()
// );

// export const removeSuccess = createAction(
//   '[Dish] delete success',
// );

// export const removeFailure = createAction(
//     '[Dish] delete failure',
//     props<{ removeErrMess: any }>()
// );

// export const update = createAction('[Dish] update', props<{ dish: any }>());

// export const updateSuccess = createAction('[Dish] update success');

// export const updateFailure = createAction(
//   '[Dish] update failure',
//     props<{ updateErrMess: any }>()
// );


