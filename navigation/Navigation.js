import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import Login from '../screens/forms/Login';
import Register from '../screens/forms/Register';
import Customer from '../screens/forms/Customer';
import Drawer from './Drawer';
import SellerLogin from '../screens/forms/SellerLogin';
import ResetPassword from '../screens/forms/ResetPassword';

const Navigation = props => {
  const authenticated = useSelector(state => state.register.authentication);

  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {authenticated ? (
          <>
            <Stack.Screen name="Home" component={Drawer} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SellerLogin" component={SellerLogin} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Customer" component={Customer} />
            <Stack.Screen
              name="resetpassword"
              component={ResetPassword}
              options={{
                headerShown: true,
                title: 'Reset Password',
                headerStyle: {
                  backgroundColor: '#2C7AF2',
                },
                headerTintColor: '#FFFFFF',
                headerTitleStyle: {
                  fontFamily: 'ebrima',
                },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
