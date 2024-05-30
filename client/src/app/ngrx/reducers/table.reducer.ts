import { TableState } from "../state/table.state";
import * as TableActions from "../actions/table.actions";
import { createReducer, on } from "@ngrx/store";


export const initialState: TableState = {
    
      isGetLoading: false,
      isGetSuccess: false,
      getErrMess: '',
      tableList: [],


      isGetByLocationIdLoading: false,
      isGetByLocationIdSuccess: false,
      getByLocationIdErrMess: '',
      tablesTakenByGetByLocationId: [],
    
      isCheckoutLoading: false,
      isCheckoutSuccess: false,
      checkoutErrMess: ''
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


    ////////////////////////////GET TABLE BY LOCATION ID /////////////////////////
    on(TableActions.getByLocationId, (state, action) => {
      return {
        ...state,
        isGetByLocationLoading: true,
        isGetByLocationSuccess: false,
        getByLocationIdErrMess: '',
      };
    }),

    on(TableActions.getByLocationIdSuccess, (state, action) => {
      return {
        ...state,
        getTableByIdLocationId: action.tableList,
        isGetByLocationLoading: false,
        isGetByLocationSuccess: true,
        tablesTakenByGetByLocationId: action.tableList,
      };
    }),

    on(TableActions.getByLocationIdFailure, (state, action) => {
      return {
        ...state,
        isGetByLocationIdLoading: false,
        isGetByLocationIdSuccess: false,
        getByLocationIdErrMess: action.getByLocationIdErrMess,
      };
    }),

    on(TableActions.updateTableStatus, (state) => ({
      ...state,
      isCheckoutLoading: true,
      isCheckoutSuccess: false,
      checkoutErrMess: ''
    })),
    on(TableActions.updateTableStatusSuccess, (state, { table }) => ({
      ...state,
      isCheckoutLoading: false,
      isCheckoutSuccess: true,
      tableList: state.tableList.map(t =>
        t.tableId === table.tableId ? { ...t, reservationId: '' } : t
      ),
      checkoutErrMess: ''
    })),
    on(TableActions.updateTableStatusFailure, (state, { error }) => ({
      ...state,
      isCheckoutLoading: false,
      isCheckoutSuccess: false,
      checkoutErrMess: error.message
    })),

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