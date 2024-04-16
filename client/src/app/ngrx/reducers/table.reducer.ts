import { TableState } from "../state/table.state";
import * as TableActions from "../actions/table.actions";
import { createReducer, on } from "@ngrx/store";


export const initialState: TableState = {
    
      isGetLoading: false,
      isGetSuccess: false,
      getErrMess: '',
      tableList: [],
    
};

export const tableReducer = createReducer(
    initialState,
    on(TableActions.get, (state, action) => {
    
      console.log('get table reducer');
      return {
        ...state,
        isGetLoading: true,
        isGetSuccess: false,
        getErrMess: '',
      };
    }),
    
    on(TableActions.getSuccess, (state, action) => {
      console.log('getsuccess table');
      return {
        ...state,
        isGetLoading: false,
        isGetSuccess: true,
        tableList: action.tableList,
      };
    }),
    
    on(TableActions.getFailure, (state, action) => {
      return {
        ...state,
        isGetLoading: false,
        isGetSuccess: false,
        getErrMess: action.getErrMess,
      };
    }),
    // on(TableActions.update, (state, action) => {
    //   return {
    //     ...state,
    //     isGetLoading: true,
    //     isGetSuccess: false,
    //     getErrMess: '',
    //   };
    // }),
    // on(TableActions.updateSuccess, (state, action) => {
    //   return {
    //     ...state,
    //     isGetLoading: false,
    //     isGetSuccess: true,
    //   };
    // }),
    // on(TableActions.updateFailure, (state, action) => {
    //   return {
    //     ...state,
    //     isGetLoading: false,
    //     isGetSuccess: false,
    //     getErrMess: action.updateErrMess,
    //   };
    // })
    
  );