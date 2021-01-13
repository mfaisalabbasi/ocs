import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../customer/Home';
import Logout from '../customer/settings/Logout';
import Settings from '../customer/settings/Settings';
import UpdateProfile from '../customer/settings/UpdateProfile';
import About from '../screens/About';
import Notification from '../screens/Notification';
import PartnerHome from '../partner/PartnerHome';
import PartnerNotification from '../partner/PartnerNotification';
import PartnerSettings from '../partner/settings/PartnerSettings';
import UpdatePartnerProfile from '../partner/settings/UpdatePartnerProfile';
import Radius from '../partner/settings/Radius';

export const Stacks = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Notifications"
        component={Notification}
        options={{
          headerStyle: {
            backgroundColor: '#2C7AF2',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontFamily: 'ebrima',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export const NotiStacks = () => {
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
      <Stack.Screen name="Notifications" component={Notification} />
    </Stack.Navigator>
  );
};

export const aboutStacks = () => {
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
      <Stack.Screen name="About Us" component={About} />
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
      <Stack.Screen name="logout" component={Logout} />
    </Stack.Navigator>
  );
};

//--------------------------------stacks for partner

export const PartnerStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={PartnerHome} />
      <Stack.Screen
        name="Notifications"
        component={PartnerNotification}
        options={{
          headerStyle: {
            backgroundColor: '#2C7AF2',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontFamily: 'ebrima',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export const NotiStacksPartner = () => {
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
      <Stack.Screen name="Notifications" component={PartnerNotification} />
    </Stack.Navigator>
  );
};

export const settingStackPartner = () => {
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
        component={PartnerSettings}
        options={{
          title: 'Profile Settings',
        }}
      />

      <Stack.Screen
        name="updateprofile"
        component={UpdatePartnerProfile}
        options={{title: 'Update Profile'}}
      />
      <Stack.Screen
        name="Radius"
        component={Radius}
        options={{title: 'Update Radius'}}
      />
      <Stack.Screen name="logout" component={Logout} />
    </Stack.Navigator>
  );
};
