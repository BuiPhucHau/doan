import { User } from './../../models/user.model';

export interface UserState {
  isCreateSussess: boolean;
  isCreateLoading: boolean;
  createErrMess: string;
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getErrMess: string;
  user: User;
}
