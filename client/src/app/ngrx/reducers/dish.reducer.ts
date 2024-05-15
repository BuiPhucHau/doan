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

  isCreateDishLoading: false,
  isCreateDishSuccess: false,
  createErrMess: '',
  dish: <Dish>{},

  isAddSuccess: false,
  isAddLoading: false,
  addErrMess: '',
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
  }),

  /////////////CREATE
  on(DishActions.createDish, (state, action) => {
    console.log('create dish reducer');
    return {
      ...state,
      isCreateDishLoading: true,
      isCreateDishSuccess: false,
      createErrMess: '',
    };
  }),
  on(DishActions.createDishSuccess, (state, action) => {
    console.log('create dish success reducer');
    return {
      ...state,
      isCreateDishLoading: false,
      isCreateDishSuccess: true,
      dish: action.dish,
      createErrMess: "",
    };
  }),
  on(DishActions.createDishFailure, (state, action) => {
    return {
      ...state,
      isCreateDishLoading: false,
      isCreateDishSuccess: false,
      createErrMess: action.errorMessage,
    };
  }),
  on(DishActions.resetIsAddSuccess, (state, action) => {
    let newSate: DishState = {
      ...state,
      isAddSuccess: false,
      isAddLoading: false,
    };
    return newSate;
  }),

);

