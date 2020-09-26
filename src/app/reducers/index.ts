import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as fromUser from './user/user.reducer';


export interface AppState {
  [fromUser.userFeatureKey]: fromUser.UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromUser.userFeatureKey]: fromUser.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
