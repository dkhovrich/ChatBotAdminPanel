import { Action, combineReducers } from 'redux';
import { CounterActions } from '../app/app.actions';
import { IFoo, fooReducer } from './reducers/fooReducer';
import { IBar, barReducer } from './reducers/barReducer';

export interface IAppState {
  foo?: IFoo;
  bar?: IBar;
}

export const rootReducer = combineReducers({
  foo: fooReducer,
  bar: barReducer
});
