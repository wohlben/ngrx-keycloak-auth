import * as fromUser from './user.reducer';
import {selectLoggingIn, selectRoles, selectUsername, selectUserState} from './user.selectors';
import {initialState} from './user.reducer';

describe('User Selectors', () => {
  it('should select the feature state', () => {
    const result = selectUserState({
      [fromUser.userFeatureKey]: initialState
    });

    expect(result).toEqual(initialState);
  });
  it('should select the user roles', () => {
    const result = selectRoles({
      [fromUser.userFeatureKey]: initialState
    });

    expect(result).toEqual(initialState.roles);
  });

  it('should select the username', () => {
    const result = selectUsername({
      [fromUser.userFeatureKey]: initialState
    });

    expect(result).toEqual(initialState.username);
  });

  it('should select the logged in state', () => {
    const result = selectLoggingIn({
      [fromUser.userFeatureKey]: initialState
    });

    expect(result).toEqual(initialState.loggingIn);
  });
});
