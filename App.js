import 'react-native-gesture-handler';
import React from 'react';
import Navigation from './navigation/Navigation';
import {Provider} from 'react-redux';
import {store} from './store/reducers/index';

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
