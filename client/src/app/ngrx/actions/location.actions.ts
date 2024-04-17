import { createAction, props } from "@ngrx/store";
import { Location } from "../../models/location.model";

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
