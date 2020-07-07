import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Logout from '../screens/settings/Logout';
import Settings from '../screens/settings/Settings';
import ChangePassword from '../screens/settings/ChangePassword';
import UpdateProfile from '../screens/settings/UpdateProfile';

export const Stacks = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Ho" component={Home} />
    </Stack.Navigator>
  );
};

export const settingStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2C7AF2',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontFamily: 'ebrima',
        },
      }}>
      <Stack.Screen
        name="setting"
        component={Settings}
        options={{
          title: 'Profile Settings',
        }}
      />
      <Stack.Screen
        name="updateprofile"
        component={UpdateProfile}
        options={{title: 'Update Profile'}}
      />
      <Stack.Screen
        name="changepassword"
        component={ChangePassword}
        options={{title: 'Change Password'}}
      />
      <Stack.Screen name="logout" component={Logout} />
    </Stack.Navigator>
  );
};
