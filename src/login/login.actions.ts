import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IAppState } from '../redux/store';
import { IAuth } from '../redux/reducers/authReducer';

@Injectable()
export class LoginActions {
  static SET_TOKEN: string = 'SET_TOKEN';

  constructor(private ngRedux: NgRedux<IAppState>) { }

  set token(value: string) {
    const action: FluxStandardAction<IAuth> = {
      type: LoginActions.SET_TOKEN,
      payload: { token: value },
      meta: null
    };

    this.ngRedux.dispatch(action);
  }
}
