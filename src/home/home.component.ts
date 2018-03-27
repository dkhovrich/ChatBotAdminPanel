import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginCacheService } from '../login/login-cache.service';
import { AuthActions } from '../login/login.actions';
import { AppRoutes } from '../app/app-routes';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private router: Router,
    private authActions: AuthActions,
    private loginCacheService: LoginCacheService) { }

  logout(): void {
    this.authActions.logout();
    this.loginCacheService.clear();
    this.router.navigateByUrl(AppRoutes.Login);
  }
}
