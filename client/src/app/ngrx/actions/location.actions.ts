import { createAction, props } from "@ngrx/store";
import { Location } from "../../models/location.model";


//get Location
export const get = createAction(
    '[Location] get all',
);
export const getLocationId = createAction(
    '[Location] get by id',
    props<{ locationId: string }>()
);
export const getSuccess = createAction(
    '[Location] get success',
    props<{ locationList: Location[] }>()
);

export const getFailure = createAction(
    '[Location] get failure',
    props<{ getErrMess: any }>()
);

//create Location
export const createLocation = createAction(
    '[Location] create',
    props<{ location: any }>()
);
export const createLocationSuccess = createAction(
    '[Location] create success',
    props<{ location: Location }>()
);
export const createLocationFailure = createAction(
    '[Location] create fail',
    props<{ errorMessage: any }>()
);

export const resetIsAddSuccess = createAction(
    '[Location] reset is add success',
);

//delete Location
export const removeLocation = createAction(
    '[Location] delete',
    props<{ locationId: string }>()
);
export const removeLocationSuccess = createAction(
    '[Location] delete success',
    props<{ locationId: string  }>()
);
export const removeLocationFailure = createAction(
    '[Location] delete fail',
    props<{ removeErrMess: any }>()
);

//update Location
export const updateLocation = createAction(
    '[Location] update',
    props<{ location: any }>()
);
export const updateLocationSuccess = createAction(
    '[Location] update success',
);
export const updateLocationFailure = createAction(
    '[Location] update fail',
    props<{ updateMessage: any }>()
);
