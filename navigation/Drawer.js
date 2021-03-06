import React, {Fragment} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Stacks,
  settingStack,
  aboutStacks,
  NotiStacks,
  PartnerStack,
  NotiStacksPartner,
  settingStackPartner,
} from './Stacks';
import CustomLogo from './CustomLogo';
import PartnerLogo from './PartnerLogo';
import {useSelector} from 'react-redux';
const Drawer = () => {
  const Drawer = createDrawerNavigator();
  const type = useSelector((state) => state.otp.userType);
  return (
    <Drawer.Navigator
      drawerContent={(props) =>
        type === 'customer' ? (
          <CustomLogo {...props} />
        ) : (
          <PartnerLogo {...props} />
        )
      }
      initialRouteName="Home"
      drawerStyle={{
        backgroundColor: '#FFFFFF',
        width: '90%',
      }}
      drawerType="back"
      drawerContentOptions={{
        labelStyle: {
          fontFamily: 'ebrima',
          fontWeight: 'bold',
        },
      }}>
      {type === 'customer' ? (
        <Fragment>
          <Drawer.Screen
            name="Home  "
            component={Stacks}
            options={{
              drawerIcon: ({color}) => {
                return (
                  <Icon
                    type="Ionicons"
                    name="ios-home"
                    color={color}
                    size={27}
                  />
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
        </Fragment>
      ) : (
        <Fragment>
          <Drawer.Screen
            name="Home"
            component={PartnerStack}
            options={{
              drawerIcon: ({color}) => {
                return (
                  <Icon
                    type="Ionicons"
                    name="ios-home"
                    color={color}
                    size={27}
                  />
                );
              },
            }}
          />
          <Drawer.Screen
            name="Notifications"
            component={NotiStacksPartner}
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
            component={settingStackPartner}
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
        </Fragment>
      )}
    </Drawer.Navigator>
  );
};
export default Drawer;
