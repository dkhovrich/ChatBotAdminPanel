import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';

import { BaseAuthGuard } from './base-auth.guard.service';
import { IAppState } from '../redux/store';
import { AppRoutes } from '../app/app-routes';

@Injectable()
export class AuthLoggedOutGuard extends BaseAuthGuard implements CanActivate {
  constructor(private router: Router, ngRedux: NgRedux<IAppState>) {
    super(ngRedux);
  }

  canActivate(): boolean {
    if (!this.isLoggedIn()) {
      return true;
    }

    this.router.navigateByUrl(`${AppRoutes.Home}/${AppRoutes.Glossary}`);
  }
}
