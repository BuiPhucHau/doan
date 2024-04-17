import { New } from "../../models/new.model";

export interface NewState {
    isGetLoading: boolean;
    isGetSuccess: boolean;
    getErrMess: string;
    newList: New[];

}
