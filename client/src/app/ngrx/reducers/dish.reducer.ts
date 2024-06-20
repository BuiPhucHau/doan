import { createReducer, on } from '@ngrx/store';
import { Dish } from '../../models/dish.model';
import { DishState } from '../state/dish.state';
import * as DishActions from '../actions/dish.actions';

export const initialState: DishState = {
  //get
  isGetLoading: false,
  isGetSuccess: false,
  getErrMess: '',
  dishList: [],
  selectedDishes: [],

  //create
  isCreateDishLoading: false,
  isCreateDishSuccess: false,
  createErrMess: '',
  dish: <Dish>{},

  //add
  isAddSuccess: false,
  isAddLoading: false,
  addErrMess: '',

  //update
  isUpdateLoading: false,
  isUpdateSuccess: false,
  updateErrMess: '',

  //delete
  isRemoveLoading: false,
  isRemoveSuccess: false,
  removeErrMess: '',
  dId: '',

};

export const dishReducer = createReducer(
  initialState,
  ////////////////////////////////////GET/////////////////////////////////////
  //get Dish
  on(DishActions.get, (state, action) => {
    console.log('get dish reducer');
    return {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getErrMess: '',
    };
  }),

  //get Dish succes
  on(DishActions.getSuccess, (state, action) => {
    console.log('getsuccess dish reducer');
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      dishList: action.dishList,
    };
  }),

  //get Dish fail
  on(DishActions.getFailure, (state, action) => {
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getErrMess: action.getErrMess,
    };
  }),

  ////////////////////////////////////CREATE/////////////////////////////////////
  //create Dish
  on(DishActions.createDish, (state, action) => {
    console.log('create dish reducer');
    return {
      ...state,
      isCreateDishLoading: true,
      isCreateDishSuccess: false,
      createErrMess: '',
    };
  }),

  //create Dish succes
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

  //create Dish fail
  on(DishActions.createDishFailure, (state, action) => {
    return {
      ...state,
      isCreateDishLoading: false,
      isCreateDishSuccess: false,
      createErrMess: action.errorMessage,
    };
  }),

  ////////////////////////////////////UPDATE/////////////////////////////////////
  //update Dish
  on(DishActions.updateDish, (state, action) => {
    console.log(action.dish);
    let newState: DishState = {
      ...state,
      isUpdateLoading: true,
      isUpdateSuccess: false,
      updateErrMess: '',
    };
    return newState;
  }),

  //update Dish success
  on(DishActions.updateDishSuccess, (state, action) => {
    console.log('[Reducer]: Dish update success')
    let newState: DishState = {
      ...state,
      isUpdateLoading: false,
      isUpdateSuccess: true,
      updateErrMess: '',
    };
    return newState;
  }),

  //update Dish fail
  on(DishActions.updateDishFailure, (state, action) => {
    let newState: DishState = {
      ...state,
      isUpdateLoading: false,
      isUpdateSuccess: false,
      updateErrMess: action.updateMessage,
    };
    return newState;
  }),

  ////////////////////////////////////DELETE/////////////////////////////////////
  //delete Dish
  on(DishActions.removeDish, (state, action) => {
    console.log('Reducer remove:', action.dId);
    let newSate : DishState = {
      ...state,
      isRemoveLoading: true,
      isRemoveSuccess: false,
      removeErrMess: '',
    };
    return newSate;
  }),

  //delete Dish success
  on(DishActions.removeDishSuccess, (state, action) => {
    console.log('Reducer remove success:', action.dId);
    let newSate : DishState = {
      ...state,
      isRemoveLoading: false,
      isRemoveSuccess: true,
      removeErrMess: '',
      dId: action.dId,
    };
    return newSate;
  }),

  //delete Dish fail
  on(DishActions.removeDishFailure, (state, action) => {
    let newSate : DishState ={
      ...state,
      isRemoveLoading: false,
      isRemoveSuccess: false,
      removeErrMess: action.removeErrMess,
    };
    return newSate;
  }),

  //reset Add
  on(DishActions.resetIsAddSuccess, (state, action) => {
    let newSate: DishState = {
      ...state,
      isAddSuccess: false,
      isAddLoading: false,
    };
    return newSate;
  }),

);

