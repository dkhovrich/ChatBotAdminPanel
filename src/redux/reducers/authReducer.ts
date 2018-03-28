import { Reducer } from 'redux';
import { FluxStandardAction } from 'flux-standard-action';
import { AuthActions } from '../../login/login.actions';

export interface IAuth {
  token: string
}

export const authReducer: Reducer<IAuth> = (state: IAuth = <IAuth>{}, action: FluxStandardAction<IAuth>) => {
  switch (action.type) {
    case AuthActions.LOGIN: {
      return { token: action.payload.token };
    }
    case AuthActions.LOGOUT: {
      return { token: null };
    }
    default: return state;
  }
}
