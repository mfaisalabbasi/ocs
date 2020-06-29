import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import Login from '../screens/forms/Login';
import Register from '../screens/forms/Register';
import Customer from '../screens/forms/Customer';
import Drawer from './Drawer';
import Icon from 'react-native-vector-icons/Ionicons';

const Navigation = props => {
  const authenticated = useSelector(state => state.auth.auth);
  const [signed, setsigned] = useState(false);
  const statechange = () => {
    return setsigned(authenticated);
  };
  useEffect(() => {
    statechange();
  }, [statechange]);
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {signed ? (
          <>
            <Stack.Screen name="Home" component={Drawer} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Customer" component={Customer} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
