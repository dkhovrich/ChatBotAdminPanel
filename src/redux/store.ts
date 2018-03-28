import { Action, combineReducers } from 'redux';
import { IAuth, authReducer } from './reducers/authReducer';
import { IGlossary, glossaryReducer } from './reducers/glossaryReducer';
import { IModal, modalReducer } from './reducers/modalReducer';

export interface IAppState {
  auth?: IAuth,
  glossary?: IGlossary,
  modal?: IModal
}

export const rootReducer = combineReducers({
  auth: authReducer,
  glossary: glossaryReducer,
  modal: modalReducer
});
