import { Inject, OnDestroy, Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { REDUX_STORE } from './constants/tokents';
import Store from './redux/store';
import IAppState from './models/redux/appState';
import IAction from './models/redux/action';

@Component({ })
abstract class BaseReduxComponent implements OnDestroy {
  private storeSubscription: Subscription;

  constructor(@Inject(REDUX_STORE) protected store: Store<IAppState>) {
    this.storeSubscription = store.state$.subscribe(this.mapStoreToComponent.bind(this));
  }

  ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  protected abstract mapStoreToComponent(state: IAppState): void;
}

export default BaseReduxComponent;
