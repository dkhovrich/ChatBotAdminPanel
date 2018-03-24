import IAction from '../../models/redux/action';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

class CounterActions {
  static increment(): IAction {
    return { type: INCREMENT };
  }

  static decrement(): IAction {
    return { type: DECREMENT };
  }
}

export default CounterActions;
