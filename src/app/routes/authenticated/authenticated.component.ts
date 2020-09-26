import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectRoles, selectUsername} from '../../reducers/user/user.selectors';
import {AppState} from '../../reducers';
import {logoutUser} from '../../reducers/user/user.actions';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss']
})
export class AuthenticatedComponent implements OnInit {

  username$ = this.store.pipe(select(selectUsername));

  roles$ = this.store.pipe(select(selectRoles));

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }
  logout() {
    this.store.dispatch(logoutUser());
  }
}
