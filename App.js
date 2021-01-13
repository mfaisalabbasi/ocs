import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import Navigation from './navigation/Navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store/reducers/index';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {Dimensions} from 'react-native';
import codePush from 'react-native-code-push';
import NetInfo from '@react-native-community/netinfo';
import NetworkError from './screens/NetworkError';

function App() {
  const [loading, setloading] = useState(false);
  const [connected, setconnected] = useState(true);
  const handleConnectivity = (isconnected) => {
    setconnected(isconnected);
  };
  useEffect(() => {
    setTimeout(() => setloading(true), 500);
    let isCancelled = false;
    NetInfo.addEventListener((state) => {
      if (!isCancelled) {
        handleConnectivity(state.isConnected);
      }
    });
    return () => {
      isCancelled = true;
    };
  }, []);
  return (
    <AnimatedSplash
      isLoaded={loading}
      logoImage={require('./assets/images/icon.png')}
      backgroundColor={'#006AFF'}
      logoHeight={300}
      logoWidth={Dimensions.get('screen').width / 1}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {connected ? null : <NetworkError />}
          <Navigation />
        </PersistGate>
      </Provider>
    </AnimatedSplash>
  );
}

export default codePush(App);
