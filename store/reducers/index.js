import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import register from './register';

const rootReducer = combineReducers({
  register: register,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
