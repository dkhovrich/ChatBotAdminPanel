import IAction from './action';

export default interface IReducer<T> {
  (state: T, action: IAction): T;
}
