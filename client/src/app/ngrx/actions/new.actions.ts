import { createAction, props } from "@ngrx/store";
import { New } from "../../models/new.model";

export const get = createAction(
    '[New] get all',
);

export const getSuccess = createAction(
    '[New] get success',
    props<{ newList: New[] }>()
);

export const getFailure = createAction(
    '[New] get failure',
    props<{ getErrMess: any }>()
);
