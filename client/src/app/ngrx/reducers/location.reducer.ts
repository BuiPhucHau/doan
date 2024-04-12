import { createReducer, on } from '@ngrx/store';
import * as LocationActions from '../actions/location.actions';
import { Location } from '../../models/location.model';
import { LocationState } from '../state/location.state';

export const initialState: LocationState = {
  isGetLoading: false,
  isGetSuccess: false,
  getErrMess: '',
  locationList: [],
};

export const locationReducer = createReducer(
  initialState,
  on(LocationActions.get, (state) => {

    console.log('get location reducer');
    return {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getErrMess: '',
    };
  }),

  on(LocationActions.getSuccess, (state, action) => {
    console.log('getsuccess location reducer');
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
     locationList : action.locationList,
    };
  }),

  on(LocationActions.getFailure, (state, action) => {
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getErrMess: action.getErrMess,
    };
  })
);
