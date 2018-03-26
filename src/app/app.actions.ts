import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { FluxStandardAction } from 'flux-standard-action';
import { IAppState } from '../redux/store';

@Injectable()
export class CounterActions {
  static INCREMENT: string = 'INCREMENT_COUNTER';
  static DECREMENT: string = 'DECREMENT_COUNTER';
  static RENAME: string = 'RENAME_COUNTER';

  constructor(private ngRedux: NgRedux<IAppState>) { }

  increment(): void {
    this.ngRedux.dispatch({ type: CounterActions.INCREMENT })
  }

  decrement(): void {
    this.ngRedux.dispatch({ type: CounterActions.DECREMENT })
  }

  rename(name: string): void {
    this.ngRedux.dispatch({ type: CounterActions.RENAME, payload: name });
  }
}
