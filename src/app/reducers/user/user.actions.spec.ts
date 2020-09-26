import * as fromUser from './user.actions';

describe('loginUser', () => {
  it('should return an action', () => {
    expect(fromUser.loginUser().type).toBe('[User] Login User');
  });
});
