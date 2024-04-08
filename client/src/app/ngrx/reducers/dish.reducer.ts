import { createReducer, on } from '@ngrx/store';
import { Dish } from '../../models/dish.model';
import { DishState } from '../state/dish.state';
import * as DishActions from '../actions/dish.actions';

export const initialState: DishState = {
  isGetLoading: false,
  isGetSuccess: false,
  getErrMess: '',
  dishList: [],
  isAddLoading: false,
  isAddSuccess: false,
  addErrMess: '',
  dish: <Dish>{},
  isRemoveloading: false,
  isRemoveSuccess: false,
  removeErrMess: '',
  isUpdateLoading: false,
  isUpdateSuccess: false,
  updateErrMess: '',
  isConfirmLoading: false,
  isConfirmSuccess: false,
  confirmErrMess: '',
  isUpdateStatusTrueAllLoading: false,
  isUpdateStatusAllTrueSuccess: false,
  updateStatusAllTrueErrMess: '',
  isUpdateStatusFalseAllLoading: false,
  isUpdateStatusAllFalseSuccess: false,
  updateStatusAllFalseErrMess: '',
};

export const dishReducer = createReducer(
  initialState,
  on(DishActions.get, (state, action) => {
    console.log(action.type);

    let newSate: DishState = {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getErrMess: '',
      dishList: [],
    };
    return newSate;
  }),

  on(DishActions.getSucces, (state, action) => {
    console.log(action.type);

    let newState: DishState = {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      dishList: action.dishList,
    };
    return newState;
  }),

  on(DishActions.getFailure, (state, action) => {
    console.log(action.type);

    let newState: DishState = {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getErrMess: action.getErrMess,
    };
    return newState;
  }),
);
