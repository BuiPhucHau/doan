import { createAction, props } from '@ngrx/store';
import { Location } from '../../models/location.model';

export const get = createAction(
  '[Location] Get All'
);

export const getSuccess = createAction(
    '[Location] Get Success',
    props<{ locationList: Location[] }>() 
  );
  

export const getFailure = createAction(
  '[Location] Get Failure',
  props<{ getErrMess: any }>()
);
