import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';

import { BaseAuthGuard } from './base-auth.guard.service';
import { LoginCacheService } from '../login/login-cache.service';
import { AuthActions } from '../login/login.actions';
import { IAppState } from '../redux/store';
import { AppRoutes } from '../app/app-routes';

@Injectable()
export class AuthLoggedInGuard extends BaseAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    ngRedux: NgRedux<IAppState>,
    loginCacheService: LoginCacheService,
    authActions: AuthActions) {
    super(ngRedux, loginCacheService, authActions);
  }

  canActivate(): boolean {
    if (this.isLoggedIn()) {
      return true;
    }

    this.router.navigateByUrl(AppRoutes.Login);
  }
}
