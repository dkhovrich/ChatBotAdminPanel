import { InjectionToken } from '@angular/core';
import Store from '../redux/store';
import IAppState from '../models/redux/appState';

export const REDUX_STORE = new InjectionToken<Store<IAppState>>('redux.store');
