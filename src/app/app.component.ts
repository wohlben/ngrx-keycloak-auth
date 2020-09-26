import {Component} from '@angular/core';
import {AppState} from './reducers';
import {Store} from '@ngrx/store';
import {restoreUser} from './reducers/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wommels4';

  constructor(store: Store<AppState>) {
    store.dispatch(restoreUser());
  }
}
