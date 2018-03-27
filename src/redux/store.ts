import { Action, combineReducers } from 'redux';
import { IAuth, authReducer } from './reducers/authReducer';

export interface IAppState {
  auth?: IAuth
}

export const rootReducer = combineReducers({
  auth: authReducer
});
