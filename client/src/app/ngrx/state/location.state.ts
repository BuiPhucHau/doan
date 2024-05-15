import { Location } from "../../models/location.model";

export interface LocationState {

    ///////////////GET
    isGetLoading: boolean;
    isGetSuccess: boolean;
    getErrMess: string;
    locationList: Location[];

    ///////////////CREATE
    isCreateLocationLoading: boolean,
    isCreateLocationSuccess: boolean,
    createErrMess: string,
    location: Location,

    isAddLoading: boolean;
    isAddSuccess: boolean;
    addErrMess: string;
}
