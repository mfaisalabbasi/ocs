import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import register from './register';
import user from './user';
import resetpassword from './resetpassword';
import notification from './notification';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['register'],
};

const rootReducer = combineReducers({
  register,
  user,
  resetpassword,
  notification,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
