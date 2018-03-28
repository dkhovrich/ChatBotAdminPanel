import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../redux/store';
import { LoginCacheService } from '../login/login-cache.service';
import { AuthActions } from '../login/login.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private loginCacheService: LoginCacheService,
    private authActions: AuthActions) { }

  ngOnInit(): void {
    this.loadToken();
  }

  private loadToken(): void {
    const token = this.loginCacheService.getToken();
    if (token) {
      this.authActions.login(token);
    }
  }
}
