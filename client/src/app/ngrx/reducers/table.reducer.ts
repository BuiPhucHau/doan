import { TableState } from "../state/table.state";
import * as TableActions from "../actions/table.actions";
import { createReducer, on } from "@ngrx/store";


export const initialState: TableState = {
    
      isGetLoading: false,
      isGetSuccess: false,
      getErrMess: '',
      tableList: [],


      isGetByLocationLoading: false,
      isGetByLocationSuccess: false,
      getByLocationErrMess: '',
      getTableByLocationId: []
    
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

    on(TableActions.getByLocation, (state, action) => {
      return {
        ...state,
        isGetByLocationLoading: true,
        isGetByLocationSuccess: false,
        getByLocationErrMess: '',
      };
    }),

    on(TableActions.getByLocationSuccess, (state, action) => {
      return {
        ...state,
        getTableByLocationId: action.tableList,
        isGetByLocationLoading: false,
        isGetByLocationSuccess: true,
        tableList: action.tableList,
      };
    }),

    on(TableActions.getByLocationFailure, (state, action) => {
      return {
        ...state,
        isGetByLocationLoading: false,
        isGetByLocationSuccess: false,
        getByLocationErrMess: action.getByLocationErrMess,
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