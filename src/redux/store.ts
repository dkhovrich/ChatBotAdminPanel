import { BehaviorSubject, Observable } from 'rxjs';
import IAction from '../models/redux/action';
import IReducer from '../models/redux/reducer';

class Store<T> {
  private state: T;
  private subject$: BehaviorSubject<T>;

  get state$(): Observable<T> {
    return this.subject$.asObservable();
  }

  constructor(private reducers: IReducer<T>[], initialState: T) {
    this.state = initialState;
    this.subject$ = new BehaviorSubject<T>(this.state);
  }

  getState(): T {
    return this.state;
  }

  dispatch(action: IAction): void {
    this.reducers.forEach(reducer => this.state = reducer(this.state, action));
    this.subject$.next(this.state);
  }
}

export default Store;
