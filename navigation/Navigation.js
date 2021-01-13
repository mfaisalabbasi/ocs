import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import Login from '../forms/Login';
import Register from '../forms/Register';
import Customer from '../forms/Customer';
import Drawer from './Drawer';
import SellerLogin from '../forms/SellerLogin';
import Ocs from '../forms/Ocs';

const Navigation = (props) => {
  const authenticated = useSelector((state) => state.otp.authentication);
  const newUser = useSelector((state) => state.otp.isNewUser);
  const type = useSelector((state) => state.otp.userType);

  const Stack = createStackNavigator();
  const userTypes =
    newUser && type === 'customer' ? (
      <Stack.Screen name="Customer" component={Customer} />
    ) : newUser && type === 'partner' ? (
      <Stack.Screen name="Register" component={Register} />
    ) : (
      <Stack.Screen name="draw" component={Drawer} />
    );
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {authenticated ? (
          <>{userTypes}</>
        ) : (
          <>
            <Stack.Screen name="ocs" component={Ocs} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SellerLogin" component={SellerLogin} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Customer" component={Customer} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
