import {Injectable} from '@angular/core';
import {UserManager} from 'oidc-client';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends UserManager {
  constructor(private router: Router) {
    super({...environment.oidc, response_type: 'code'});
  }


  async finishLogin() {
    try {
      await this.signinRedirectCallback();
      await this.resetAuthParams();
      return this.getUser();
    } catch (e) {
      return null;
    }
  }
  async login() {
    await this.clearStaleState();
    return this.signinRedirect();
  }

  async logout() {
    await this.removeUser();
    return this.router.navigate(['']);
  }

  async resetAuthParams() {
    return this.router.navigate([], {queryParams: {code: null, state: null, session_state: null}});
  }
}
