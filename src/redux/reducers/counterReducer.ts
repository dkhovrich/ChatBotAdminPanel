import IAction from '../../models/redux/action';
import IReducer from '../../models/redux/reducer';
import IAppState from '../../models/redux/appState';
import { INCREMENT, DECREMENT } from '../../redux/actions/counterActions';

export const counterReducer: IReducer<IAppState> = (state: IAppState, action: IAction) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, counter: state.counter + 1 };
    case DECREMENT:
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};
