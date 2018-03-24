import { Inject, Component } from '@angular/core';

import BaseReduxComponent from '../base-redux.component';
import { REDUX_STORE } from '../constants/tokents';
import Store from '../redux/store';
import IAppState from '../models/redux/appState';
import CounterActions from '../redux/actions/counterActions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseReduxComponent {
  title = 'app';
  counter: number;

  constructor(@Inject(REDUX_STORE) store: Store<IAppState>) {
    super(store);
    this.counter = this.store.getState().counter;
  }

  increment(): void {
    this.store.dispatch(CounterActions.increment());
  }

  decrement(): void {
    this.store.dispatch(CounterActions.decrement());
  }

  protected mapStoreToComponent(state: IAppState): void {
    this.counter = state.counter;
  }
}
