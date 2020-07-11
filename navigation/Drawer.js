import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {Stacks, settingStack, aboutStacks, NotiStacks} from './Stacks';
import CustomLogo from './CustomLogo';
const Drawer = ({color}) => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomLogo {...props} />}
      initialRouteName="Home"
      drawerStyle={{
        backgroundColor: '#FFFFFF',
        width: '90%',
      }}
      drawerContentOptions={{
        labelStyle: {
          fontFamily: 'ebrima',
          fontWeight: 'bold',
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={Stacks}
        options={{
          drawerIcon: ({color}) => {
            return (
              <Icon type="Ionicons" name="ios-home" color={color} size={27} />
            );
          },
        }}
      />

      <Drawer.Screen
        name="Notifications"
        component={NotiStacks}
        options={{
          drawerIcon: ({color}) => {
            return (
              <Icon
                type="Ionicons"
                name="ios-notifications"
                color={color}
                size={29}
              />
            );
          },
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={settingStack}
        options={{
          drawerIcon: ({color}) => {
            return (
              <Icon
                type="Ionicons"
                name="ios-settings"
                color={color}
                size={27}
              />
            );
          },
        }}
      />

      <Drawer.Screen
        name="About Us"
        component={aboutStacks}
        options={{
          drawerIcon: ({color}) => {
            return (
              <Icon
                type="Ionicons"
                name="md-information-circle-outline"
                color={color}
                size={27}
              />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
};
export default Drawer;
