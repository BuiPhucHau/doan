import { UserState } from '../state/user.state';
import { User } from '../../models/user.model';
import * as UserActions from '../actions/user.actions';
import { createReducer, on } from '@ngrx/store';

export const initialState: UserState = {
  isGetLoading: false,
  isGetSuccess: false,
  getErrMess: '',
  user: <User>{},
  isCreateSussess: false,
  isCreateLoading: false,
  createErrMess: '',
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.getByEmail, (state, action) => {
    console.log(action.type);
    let newState: UserState = {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getErrMess: '',
      user: <User>{},
    };
    return newState;
  }),
  

  on(UserActions.getByEmailSuccess, (state, action) => {
    console.log(action.type);
    let newState: UserState = {
      ...state,
      isGetLoading: false,
      isGetSuccess: true,
      user: action.user,
    };
    return newState;
  }),

  on(UserActions.getByEmailFailure, (state, action) => {
    console.log(action.type);
    let newState: UserState = {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getErrMess: action.error,
    };
    console.log(action.error);
    return newState;
  }),

  on(UserActions.getByEmailAndPassword, (state, { email, password }) => {
    console.log(UserActions.getByEmailAndPassword);
    let newState: UserState = {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getErrMess: '',
      user: <User>{},
    };
    return newState;
  }),

  on(UserActions.getByEmailAndPasswordFailure, (state, action) => {
    console.log(action.type);
    let newState: UserState = {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getErrMess: action.error,
    };
    console.log(action.error);
    return newState;
  }),

  on(UserActions.getByEmailAndPassword, (state, action) => {
    console.log(action.type);
    let newState: UserState = {
      ...state,
      isGetLoading: true,
      isGetSuccess: false,
      getErrMess: '',
      user: <User>{},
    };
    return newState;
  }),

  on(UserActions.createUser, (state, action) => {
    console.log(action.type);
    let newState: UserState = {
      ...state,
      isCreateLoading: true,
      isCreateSussess: false,
      createErrMess: '',
    };
    return newState;
  }),
  
  on(UserActions.createUserSuccess, (state, action) => {
    console.log(action.type);
    let newState: UserState = {
      ...state,
      isCreateLoading: false,
      isCreateSussess: true,
      user: action.user,
    };
    return newState;
  }),

  on(UserActions.createUserFailure, (state, action) => {
    console.log(action.type);
    let newState: UserState = {
      ...state,
      isCreateLoading: false,
      isCreateSussess: false,
      createErrMess: action.error,
    };
    return newState;
  }),
  
  on(UserActions.storedUser, (state, {user, type}) =>{
    console.log(type);
    return {
      ...state,
      user: user
    }
  }),

  on(UserActions.resetUser, (state, {type}) =>{
    console.log(type);
    return {
      ...state,
      isGetLoading: false,
      isGetSuccess: false,
      getErrMess: '',
      user: <User>{},
      isCreateSussess: false,
      isCreateLoading: false,
      createErrMess: '',
    }
  })
);
