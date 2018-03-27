import { Reducer } from 'redux';
import { FluxStandardAction } from 'flux-standard-action';
import { LoginActions } from '../../login/login.actions';

export interface IAuth {
  token: string
}

export const authReducer: Reducer<IAuth> = (state: IAuth = <IAuth>{}, action: FluxStandardAction<string>) => {
  switch (action.type) {
    case LoginActions.SET_TOKEN: {
      return { ...state, token: action.payload };
    }
    default: return state;
  }
}
