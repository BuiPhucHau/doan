import { UserFirebase } from "../../models/userFirebase.model";

export interface AuthState {
    userFirebase: UserFirebase
    isLoading: boolean;
    isSuccessful: boolean;
    errorMessage: string;
    isLogoutSuccess: boolean;
}
