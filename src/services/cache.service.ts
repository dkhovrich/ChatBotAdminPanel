import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { LoginCacheService } from '../login/login-cache.service';
import { AuthActions } from '../login/login.actions';
import { IAppState } from '../redux/store';

@Injectable()
export class CacheService {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private authActions: AuthActions,
    private loginCache: LoginCacheService) { }

  load(): void {
    this.loadToken();
  }

  clear(): void {
    this.loginCache.clear();
  }

  private loadToken(): void {
    const token = this.loginCache.getToken();
    if (token) {
      this.authActions.login(token);
    }
  }
}
