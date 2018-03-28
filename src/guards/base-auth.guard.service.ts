import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../redux/store';

@Injectable()
export abstract class BaseAuthGuard {
  constructor(private ngRedux: NgRedux<IAppState>) { }

  protected isLoggedIn(): boolean {
    const token = this.ngRedux.getState().auth.token;
    return !!token;
  }
}
