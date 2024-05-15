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
export const addtoCart = createAction(
  '[Dish] Add to Cart',
  props<{ dish: Dish }>()
);
export const addtoDetail = createAction(
  '[Dish] Add to Detail',
  props<{ dish: Dish }>()
);
export const getFailure = createAction(
    '[Dish] get failure',
    props<{ getErrMess: any }>()
);

//create Dish
export const createDish = createAction(
    '[Dish] create',
    props<{ dish: any }>()
);
export const createDishSuccess = createAction(
    '[Dish] create success',
    props<{ dish: Dish }>()
);
export const createDishFailure = createAction(
    '[Dish] create fail',
    props<{ errorMessage: any }>()
);
export const resetIsAddSuccess = createAction(
  '[Dish] reset is add success',
);


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


