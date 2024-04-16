import { Location } from "../../models/location.model";

export interface LocationState {
    isGetLoading: boolean;
    isGetSuccess: boolean;
    getErrMess: string;
    locationList: Location[];

}
