import { createReducer, on } from "@ngrx/store";
import { categoryState } from "../state/category.state";
import * as CategoryActions from '../actions/category.actions';


export const initialState: categoryState = {
    categories: [],
    isGetting: false,
    isGetSuccess: false,
    getErrorMessage: '',
};

export const categoryReducer = createReducer (
    initialState,
    on(CategoryActions.get, (state, action) => {
        let newState: categoryState = {
            ...state,
            isGetting: true,
            isGetSuccess: false,
            getErrorMessage: '',
        };
        return newState;
    }),
    on(CategoryActions.getSuccess, (state, action) => {
        let newState: categoryState = {
            ...state,
            isGetting: false,
            isGetSuccess: true,
            getErrorMessage: '',
            categories: action.categories,
        };
        return newState;
    }),
    on(CategoryActions.getFailure, (state, action) => {
        let newState: categoryState = {
            ...state,
            isGetting: false,
            isGetSuccess: false,
            getErrorMessage: action.errorMessage,
        };
        return newState;
    }),
)