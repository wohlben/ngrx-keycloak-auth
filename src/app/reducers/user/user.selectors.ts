import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUser from './user.reducer';

export const selectUserState = createFeatureSelector<fromUser.UserState>(
  fromUser.userFeatureKey
);

export const selectUsername = createSelector(
  selectUserState,
  (state) => state.username
);

export const selectRoles = createSelector(
  selectUserState,
  (state) => state.roles
);

export const selectLoggingIn = createSelector(
  selectUserState,
  (state) => state.loggingIn
);

export const selectAttempts = createSelector(
  selectUserState,
  (state) => state.attempts
);
