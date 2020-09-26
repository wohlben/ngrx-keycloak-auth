import { TestBed } from '@angular/core/testing';

import { ForceLoginGuard } from './force-login.guard';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {initialState} from '../reducers/user/user.reducer';

describe('ForceLoginGuard', () => {
  let guard: ForceLoginGuard;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({initialState})]
    });
    guard = TestBed.inject(ForceLoginGuard);
    store = TestBed.inject(MockStore);

  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
