import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import user from './user';
import notification from './notification';
import services from './services';
import otp from './otp';
import otpredu from './otpredu';
import order from './order';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['user', 'notification', 'otpredu', 'otp', 'order'],
};
const otpPersist = {
  key: 'otp',
  storage: AsyncStorage,
  blacklist: ['loading', 'confirm', 'error', 'otpError'],
};

const otpreduPersist = {
  key: 'otpredu',
  storage: AsyncStorage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user,
  notification,
  services,
  otp: persistReducer(otpPersist, otp),
  otpredu: persistReducer(otpreduPersist, otpredu),
  order,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
