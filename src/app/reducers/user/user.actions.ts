import {createAction, props} from '@ngrx/store';
import {Profile} from 'oidc-client';

export const storeUser = createAction('[User] Store User', props<{user: Profile}>());

export const restoreUser = createAction('[User] Restore User');

export const externalLogin = createAction('[User] External Login User');

export const loginUser = createAction('[User] Login User');

export const redirectingUser = createAction( '[User] Redirecting User');

export const logoutUser = createAction('[User] Logout User');

export const loginUserSuccess = createAction(
  '[User] Login User Success',
  props<{ user: any }>()
);

export const loginUserFailure = createAction(
  '[User] Login User Failure',
  props<{ error: any }>()
);
