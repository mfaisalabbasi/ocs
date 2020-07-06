import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {Stacks, settingStack} from './Stacks';
import CustomLogo from './CustomLogo';
import {View, Text} from 'react-native';
const Drawer = ({color}) => {
  const Drawer = createDrawerNavigator();

  const About = () => {
    return (
      <View>
        <Text>hi</Text>
      </View>
    );
  };

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
        name="  Home"
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
        name="  Settings"
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
        name="  About Us"
        component={About}
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
