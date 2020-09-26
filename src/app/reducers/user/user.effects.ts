import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, filter, map, mergeMap, withLatestFrom} from 'rxjs/operators';
import {from, of} from 'rxjs';
import * as UserActions from './user.actions';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {selectAttempts, selectUsername} from './user.selectors';


@Injectable()
export class UserEffects {

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logoutUser),
      map(() => this.auth.logout())
    ), {dispatch: false});

  restoreUser$ = createEffect( () =>
    this.actions$.pipe(
      ofType(UserActions.restoreUser),
      mergeMap(() =>
        from(this.auth.getUser()).pipe(
          filter(u => u !== null),
          map(u => UserActions.storeUser({user: u.profile}))
        )
      )
    )
  );

  externalLoginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.externalLogin),
      filter(() => this.route.snapshot.queryParamMap.has('code')),
      mergeMap(() =>
        from(this.auth.finishLogin()).pipe(map((u) =>
          u ? UserActions.loginUserSuccess({user: u.profile})
            : UserActions.loginUserFailure({error: 'failed login'})))
      )
    )
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUser),
      withLatestFrom(this.store$.select(selectUsername)),
      filter(([_, username]) => username === null),
      mergeMap(() =>
        this.route.snapshot.queryParamMap.has('code')
          ? from(this.auth.finishLogin()).pipe(map((u) =>
            u ? UserActions.loginUserSuccess({user: u.profile})
              : UserActions.loginUserFailure({error: 'failed login'})))
          : from(this.auth.login()).pipe(map(() => UserActions.redirectingUser()))
          ),
      catchError((error) => of(UserActions.loginUserFailure({error})))
    )
  );

  loginFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUserFailure),
      withLatestFrom(this.store$.select(selectAttempts)),
      filter(([_, attempts]) => attempts < 3),
      mergeMap(() =>
        from(this.auth.resetAuthParams()).pipe(map(() => UserActions.loginUser()))
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUserSuccess),
      map(({user}) => {
        this.auth.startSilentRenew();
        return UserActions.storeUser({user});
      })
    ));

  storeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.storeUser),
      map(() => {
        this.finishLoginSub.unsubscribe();
        const originUri = localStorage.getItem('originUri');
        if (originUri) {
          localStorage.removeItem('originUri');
          this.router.navigate([originUri]);
        }
      }),
    ), {dispatch: false}
  );

  private finishLoginSub = this.route.queryParamMap.subscribe((params) => {
    if (params.has('session_state') && params.has('code') && params.has('state')){
      this.store$.dispatch(UserActions.externalLogin());
    }
  });
  constructor(
    private actions$: Actions,
    private store$: Store,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService
  ) { }
}
