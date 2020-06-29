import {createStore, combineReducers} from 'redux';
import auth from './auth';

const rootReducer = combineReducers({
  auth: auth,
});

export const store = createStore(rootReducer);
