import { Reducer } from 'redux';
import { FluxStandardAction } from 'flux-standard-action';
import { CounterActions } from '../../app/app.actions';

export interface IBar {
  count: number
}

const initialState: IBar = {
  count: 5
}

export const barReducer: Reducer<IBar> = (state: IBar = initialState, action: FluxStandardAction<number>) => {
  switch (action.type) {
    case CounterActions.INCREMENT: {
      return { ...state, count: state.count + 1 };
    }
    case CounterActions.DECREMENT: {
      return { ...state, count: state.count - 1 };
    }
    default: return state;
  }
};
