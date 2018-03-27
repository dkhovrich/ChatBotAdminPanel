import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';

import { BaseActionService } from '../services/base-action.service';
import { IAppState } from '../redux/store';
import { IAuth } from '../redux/reducers/authReducer';

@Injectable()
export class AuthActions extends BaseActionService {
  static LOGIN: string = 'LOGIN_ACTION';
  static LOGOUT: string = 'LOGOUT_ACTION';

  constructor(private ngRedux: NgRedux<IAppState>) {
    super();
  }

  login(token: string): void {
    const action = this.createAction<IAuth>(AuthActions.LOGIN, { token });
    this.ngRedux.dispatch(action);
  }

  logout(): void {
    const action = this.createAction<IAuth>(AuthActions.LOGOUT, { token: null });
    this.ngRedux.dispatch(action);
  }
}
