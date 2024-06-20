import { Location } from '../../models/location.model';

export interface LocationState {
  ///////////////GET
  isGetLoading: boolean;
  isGetSuccess: boolean;
  getErrMess: string;
  locationList: Location[];

  ///////////////CREATE
  isCreateLocationLoading: boolean;
  isCreateLocationSuccess: boolean;
  createErrMess: string;
  location: Location;

  ///////////////ADD
  isAddLoading: boolean;
  isAddSuccess: boolean;
  addErrMess: string;

  //////////////UPDATE
  isUpdateLoading: boolean;
  isUpdateSuccess: boolean;
  updateErrMess: string;

  ///////////////DELETE
  isRemoveLoading: boolean;
  isRemoveSuccess: boolean;
  removeErrMess: string;
  locationId: string;
}
