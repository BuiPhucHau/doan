import { createAction, props } from "@ngrx/store";
import { Table } from "../../models/table.model";

export const get = createAction(
    '[Table] get all',
);

export const getSuccess = createAction(
    '[Table] get success',
    props<{ tableList: Table[] }>()
);

export const getFailure = createAction(
    '[Table] get failure',
    props<{ getErrMess: any }>()
);

export const getByLocationId = createAction(
    '[Table] get by location ',
    props<{ locationId: string }>()
);

export const getByLocationIdSuccess = createAction(
    '[Table] get by location success',
    props<{ tableList: Table[] }>()
);

export const getByLocationIdFailure = createAction(
    '[Table] get by location failure',
    props<{ getByLocationIdErrMess: any }>()
);

// export const add = createAction(
//     '[Table] add',
//     props<{ newTable: any }>()
// );

// export const addSuccess = createAction(
//     '[Table] add success',
// );

// export const addFailure = createAction(
//     '[Table] add failure',
//     props<{ addErrMess: any }>()
// );

// export const remove = createAction(
//     '[Table] delete',
//     props<{ tableId: string }>()
// );

// export const removeSuccess = createAction(
//     '[Table] delete success',
// );

// export const removeFailure = createAction(
//     '[Table] delete failure',
//     props<{ removeErrMess: any }>()
// );

export const update = createAction('[Table] update', props<{ table: any }>());

export const updateSuccess = createAction('[Table] update success');

export const updateFailure = createAction(
    '[Table] update failure',
    props<{ updateErrMess: any }>()
);

export const checkoutTable = createAction(
    '[Reservation] Checkout',
    props<{ tableId: string }>()
  );
  
  export const updateTableStatus = createAction(
    '[Table] Update Status',
    props<{ tableId: string, status: boolean }>()
  );
  
  export const updateTableStatusSuccess = createAction(
    '[Table] Update Status Success',
    props<{ table: Table }>()
  );
  
  export const updateTableStatusFailure = createAction(
    '[Table] Update Status Failure',
    props<{ error: any }>()
  );

