import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {UserState} from '../../reducers/user/user.reducer';
import {loginUser, logoutUser} from '../../reducers/user/user.actions';
import {selectUsername} from '../../reducers/user/user.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  username$ = this.store.pipe(select(selectUsername));

  constructor(private store: Store<{ user: UserState }>) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(logoutUser());
  }

  login() {
    this.store.dispatch(loginUser());
  }

}
