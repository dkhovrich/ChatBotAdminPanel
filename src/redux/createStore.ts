import Store from './store';
import IAppState from '../models/redux/appState';
import IReducer from '../models/redux/reducer';

import { counterReducer } from './reducers/counterReducer';

const initialState: IAppState = {
  counter: 0
};

const reducers: IReducer<IAppState>[] = [counterReducer];

const createStore = () => {
  return new Store<IAppState>(reducers, initialState);
};

export default createStore;
