import { createReducer, on } from "@ngrx/store";
import { NewState } from "../state/new.state";
import * as NewActions from "../actions/new.actions";


export const initialState: NewState = {

  isGetLoading: false,
  isGetSuccess: false,
  getErrMess: '',
  newList: [],

};


export const newReducer = createReducer(
  initialState,
  on(NewActions.get, (state, action) => {

    console.log('get new reducer');    return {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getErrMess: '',
    };
  }),

  on(NewActions.getSuccess, (state, action) => {
    console.log('getsuccess new reducer');
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      newList: action.newList,
    };
  }),

  on(NewActions.getFailure, (state, action) => {
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getErrMess: action.getErrMess,
    };
  })

);
