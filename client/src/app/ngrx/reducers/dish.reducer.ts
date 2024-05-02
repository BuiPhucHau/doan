import { createReducer, on } from '@ngrx/store';
import { Dish } from '../../models/dish.model';
import { DishState } from '../state/dish.state';
import * as DishActions from '../actions/dish.actions';

export const initialState: DishState = {
  isGetLoading: false,
  isGetSuccess: false,
  getErrMess: '',
  dishList: [],
  selectedDishes: [],

};

export const dishReducer = createReducer(
  
  initialState,
  on(DishActions.get, (state, action) => {

    console.log('get dish reducer');
    return {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getErrMess: '',
    };
  }),

  on(DishActions.getSuccess, (state, action) => {
    console.log('getsuccess dish reducer');
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      dishList: action.dishList,
    };
  }),

  on(DishActions.getFailure, (state, action) => {
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getErrMess: action.getErrMess,
    };
  })

);

