import { createReducer, on } from "@ngrx/store";
import { LocationState } from "../state/location.state";
import * as LocationActions from "../actions/location.actions";
import { Location } from "../../models/location.model";

export const initialState: LocationState = {

  isGetLoading: false,
  isGetSuccess: false,
  getErrMess: '',
  locationList: [],

  isCreateLocationLoading: false,
  isCreateLocationSuccess: false,
  createErrMess: '',
  location: <Location>{},

  isAddSuccess: false,
  isAddLoading: false,
  addErrMess: '',

  isRemoveLoading: false,
  isRemoveSuccess: false,
  removeErrMess: '',
  locationId: '',
};


export const locationReducer = createReducer(
  initialState,
  on(LocationActions.get, (state, action) => {

    console.log('get location reducer');    
    return {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getErrMess: '',
    };
  }),
  on(LocationActions.getLocationId, (state, action) => {
    console.log('get by id location reducer');
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      locationId: action.locationId,
    };
  }),
  on(LocationActions.getSuccess, (state, action) => {
    console.log('getsuccess location reducer');
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      locationList: action.locationList,
    };
  }),

  on(LocationActions.getFailure, (state, action) => {
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getErrMess: action.getErrMess,
    };
  }),

  //////////////////////////////////// CREATE location //////////////////////////
  on(LocationActions.createLocation, (state, action) => {
    return {
      ...state,
      isCreateLocationLoading: true,
      isCreateLocationSuccess: false,
      createErrMess: "",
    };
  }),
  on(LocationActions.createLocationSuccess, (state, action) => {
    return {
      ...state,
      location: action.location,
      isCreateLocationLoading: false,
      isCreateLocationSuccess: true,
      createErrMess: "",
    };
  }),
  on(LocationActions.createLocationFailure, (state, action) => {
    return {
      ...state,
      isCreateLocationLoading: false,
      isCreateLocationSuccess: false,
      createErrMess: action.errorMessage,
    };
  }),
  //////////////////////////////////// RESET location //////////////////////////
  on(LocationActions.resetIsAddSuccess, (state, action) => {
    let newSate: LocationState = {
      ...state,
      isAddSuccess: false,
      isAddLoading: false,
    };
    return newSate;
  }),
  //////////////////////////////////// DELETE location //////////////////////////
  on(LocationActions.removeLocation, (state, action) => {
    console.log('Reducer remove:', action.locationId);
    let newSate : LocationState = {
      ...state,
      isRemoveLoading: true,
      isRemoveSuccess: false,
      removeErrMess: '',
    };
    return newSate;
  }),
  on(LocationActions.removeLocationSuccess, (state, action) => {
    console.log('Reducer remove success:', action.locationId);
    let newSate : LocationState = {
      ...state,
      isRemoveLoading: false,
      isRemoveSuccess: true,
      removeErrMess: '',
      locationId: action.locationId,
    };
    return newSate;
  }),
  on(LocationActions.removeLocationFailure, (state, action) => {
    let newSate : LocationState ={
      ...state,
      isRemoveLoading: false,
      isRemoveSuccess: false,
      removeErrMess: action.removeErrMess,
    };
    return newSate;
  }),
);
