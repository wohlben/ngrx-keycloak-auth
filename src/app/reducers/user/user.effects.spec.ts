import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UserEffects } from './user.effects';
import {provideMockStore} from '@ngrx/store/testing';
import {initialState} from './user.reducer';
import {RouterModule} from '@angular/router';

describe('UserEffects', () => {
  let actions$: Observable<any>;
  let effects: UserEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockStore({initialState}),
        provideMockActions(() => actions$)
      ],
      imports: [RouterModule.forRoot([])]
    });

    effects = TestBed.inject(UserEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
