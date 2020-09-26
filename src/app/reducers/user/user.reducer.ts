import {createReducer, on} from '@ngrx/store';
import * as UserActions from './user.actions';
import {actionState, ActionState} from '../../_helpers/action-state';

export const userFeatureKey = 'user';

export interface UserState {
  loggingIn: ActionState;
  username: string;
  roles: string[];
  attempts: number;
}

export const initialState: UserState = {
  loggingIn: actionState.PENDING,
  username: null,
  roles: [],
  attempts: 0
};


export const reducer = createReducer(
  initialState,

  on(UserActions.logoutUser, _ => {
    return {
      loggingIn: actionState.PENDING,
      username: null,
      roles: [],
      attempts: 0
    };
  }),
  on(UserActions.loginUser, state => {
    return {...state, loggingIn: actionState.LOADING, attempts: state.attempts + 1};
  }),
  on(UserActions.storeUser, (state, {user}) => {
    return {...state,
      loggingIn: actionState.SUCCESS,
      username: user.preferred_username,
      roles: user.roles
    };
  }),
  on(UserActions.loginUserFailure, (state, _) => {
    return {...state,
      loggingIn: actionState.FAILED
    };
  }),

);

