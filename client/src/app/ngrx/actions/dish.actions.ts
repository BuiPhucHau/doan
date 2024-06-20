import { createAction, props } from '@ngrx/store';
import { Dish } from '../../models/dish.model';

/////////////////////////////////////////////////////GET/////////////////////////////////////////////////
//get Dish
export const get = createAction(
    '[Dish] get all',
    props<{ featured?: boolean }>()
  );
//get Dish success
export const getSuccess = createAction(
  '[Dish] get success',
  props<{ dishList: Dish[] }>()
);
//get Dish fail
export const getFailure = createAction(
  '[Dish] get failure',
  props<{ getErrMess: any }>()
);
/////////////////////////////////////////////////////CREATE/////////////////////////////////////////////////
//create Dish
export const createDish = createAction(
  '[Dish] create',
  props<{ dish: any }>()
);
//create Dish success
export const createDishSuccess = createAction(
  '[Dish] create success',
  props<{ dish: Dish }>()
);
//create Dish fail
export const createDishFailure = createAction(
  '[Dish] create fail',
  props<{ errorMessage: any }>()
);
/////////////////////////////////////////////////////UPDATE/////////////////////////////////////////////////
//update Dish
export const updateDish = createAction (
  '[Dish] update',
  props <{ dish : any}>()
)
export const updateDishSuccess = createAction (
  '[Dish] update success',
)
export const updateDishFailure = createAction (
  '[Dish] update fail',
  props <{ updateMessage: any}>()
)
/////////////////////////////////////////////////////DELETE/////////////////////////////////////////////////
//delete Dish
export const removeDish = createAction (
  '[Dish] delete',
  props <{dId: string}>()
)
export const removeDishSuccess = createAction(
  '[Location] delete success',
  props<{ dId: string  }>()
);
export const removeDishFailure = createAction(
  '[Location] delete fail',
  props<{ removeErrMess: any }>()
);
/////////////////////////////////////////////////////ADDTOCART/////////////////////////////////////////////////
//add Dish to cart
export const addtoCart = createAction(
  '[Dish] Add to Cart',
  props<{ dish: Dish }>()
);
export const addtoDetail = createAction(
  '[Dish] Add to Detail',
  props<{ dish: Dish }>()
);

//resetAdd
export const resetIsAddSuccess = createAction(
  '[Dish] reset is add success',
);



