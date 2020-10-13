import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import Navigation from './navigation/Navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store/reducers/index';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {Dimensions} from 'react-native';

function App() {
  const [loading, setloading] = useState(false);
  useEffect(() => {
  setTimeout(()=>setloading(true),500) 
    
  }, []);
  return (
    <AnimatedSplash
    
      isLoaded={loading}
      logoImage={require('./assets/images/icon.png')}
      backgroundColor={'#498DF6'}
      logoHeight={150}
      logoWidth={Dimensions.get('screen').width / 1.5}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </AnimatedSplash>
  );
}

export default App;
