import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {UserState} from '../reducers/user/user.reducer';
import {selectUserState} from '../reducers/user/user.selectors';
import {filter, map} from 'rxjs/operators';
import {actionState} from './action-state';
import {loginUser} from '../reducers/user/user.actions';

@Injectable({
  providedIn: 'root'
})
export class ForceLoginGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(selectUserState).pipe(
      filter((userState) => userState.loggingIn !== actionState.LOADING),
      map((userState) => {
        if (userState.loggingIn === actionState.PENDING) {
          localStorage.setItem('originUri', next.url.toString());
          this.store.dispatch(loginUser());
        }
        return userState;
      }),
      filter( (userState) => userState.loggingIn === actionState.SUCCESS),
      map(() => true)
    );
  }

  constructor(private store: Store<{ user: UserState }>) {
  }
}
