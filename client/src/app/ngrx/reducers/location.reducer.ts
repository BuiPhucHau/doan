import { createReducer, on } from '@ngrx/store';
import * as LocationActions from '../actions/location.actions';
import { Location } from '../../models/location.model';
export interface LocationState {
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getErrMess: any;
  locationList: any[]; // Assuming your locationList can contain any type of data
}

export const initialState: LocationState = {
  isGetLoading: false,
  isGetSuccess: false,
  getErrMess: '',
  locationList: [],
};

export const locationReducer = createReducer(
  initialState,
  on(LocationActions.get, state => ({
    ...state,
    isGetLoading: true,
    isGetSuccess: false,
    getErrMess: '',
  })),

  on(LocationActions.getSuccess, (state, action) => ({
    ...state,
    isGetLoading: false,
    isGetSuccess: true,
    locationList: action.locationList,
  })),

  on(LocationActions.getFailure, (state, action) => ({
    ...state,
    isGetLoading: false,
    isGetSuccess: false,
    getErrMess: action.getErrMess,
  }))
);
