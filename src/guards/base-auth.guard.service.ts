import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { LoginCacheService } from '../login/login-cache.service';
import { AuthActions } from '../login/login.actions';
import { IAppState } from '../redux/store';

@Injectable()
export abstract class BaseAuthGuard {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private loginCacheService: LoginCacheService,
    private authActions: AuthActions) { }

  protected isLoggedIn(): boolean {
    let token = this.ngRedux.getState().auth.token;
    if (token) return true;

    token = this.loginCacheService.getToken();
    if (token) {
      this.authActions.login(token);
      return true;
    }

    return false;
  }
}
