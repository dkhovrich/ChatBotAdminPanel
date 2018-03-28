import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CacheService } from '../services/cache.service';
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
    private cacheService: CacheService) { }

  logout(): void {
    this.authActions.logout();
    this.cacheService.clear();
    this.router.navigateByUrl(AppRoutes.Login);
  }
}
