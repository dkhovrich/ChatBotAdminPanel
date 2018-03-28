import { Action, combineReducers } from 'redux';
import { IAuth, authReducer } from './reducers/authReducer';
import { IGlossary, glossaryReducer } from './reducers/glossaryReducer';

export interface IAppState {
  auth?: IAuth,
  glossary?: IGlossary
}

export const rootReducer = combineReducers({
  auth: authReducer,
  glossary: glossaryReducer
});
