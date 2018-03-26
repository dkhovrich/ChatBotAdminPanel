import { Reducer } from 'redux';
import { FluxStandardAction } from 'flux-standard-action';
import { CounterActions } from '../../app/app.actions';

export interface IFoo {
  name: string
}

const initialState: IFoo = {
  name: 'test'
}

export const fooReducer: Reducer<IFoo> = (state: IFoo = initialState, action: FluxStandardAction<string>): IFoo => {
  switch (action.type) {
    case CounterActions.RENAME: {
      return { ...state, name: action.payload };
    }
    default: return state;
  }
};
