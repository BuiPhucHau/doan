import { UserFirebase } from "../../models/userfirebase.model";

export interface UserFirebaseState { 
    userFirebase: UserFirebase;
    isLoading: boolean;
    isGetSuccess: boolean;
    getErrMess: string;
    isLogoutSuccess: string;
}