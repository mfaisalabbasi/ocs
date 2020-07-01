import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import Stacks from './Stacks';
import CustomLogo from './CustomLogo';
import {View, Text} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {logoutAction} from '../store/actions/auth';
const Drawer = ({color}) => {
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  const About = () => {
    return (
      <View>
        <Text>hi</Text>
      </View>
    );
  };
  const Settings = () => {
    return (
      <View>
        <Text>hi</Text>
      </View>
    );
  };

  const Guide = () => {
    return (
      <View>
        <Text>Guide</Text>
      </View>
    );
  };
  const Logout = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <TouchableNativeFeedback onPress={handleLogout}>
          <View
            style={{
              backgroundColor: '#498DF6',
              width: 150,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#FFFFFF'}}>Logout</Text>
          </View>
        </TouchableNativeFeedback>
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
        name="  User Guide"
        component={Guide}
        options={{
          drawerIcon: ({color}) => {
            return (
              <Icon type="Ionicons" name="ios-book" color={color} size={25} />
            );
          },
        }}
      />
      <Drawer.Screen
        name="  Settings"
        component={Settings}
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
      <Drawer.Screen
        name="  Logout"
        component={Logout}
        options={{
          drawerIcon: ({color}) => {
            return (
              <Icon
                type="Ionicons"
                name="ios-log-out"
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
