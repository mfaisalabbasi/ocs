import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icoon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

const Settings = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <TouchableNativeFeedback>
            <View style={styles.header}>
              <Icoon
                type="Ionicons"
                name="ios-menu"
                color="#FFFFFF"
                size={32}
                onPress={() => navigation.toggleDrawer()}
              />
            </View>
          </TouchableNativeFeedback>
        );
      },
    });
  }, []);

  const user = useSelector((state) => state.user.user);
  const ocs = 'On Click Services';
  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          width: '100%',
          backgroundColor: '#FFFFFF',
        }}>
        <View style={styles.settingForm}>
          <TouchableNativeFeedback
            onPress={() =>
              navigation.navigate('updateprofile', {
                upname: user.name,
                upphone: user.phone,
              })
            }>
            <View style={styles.inputs}>
              <View style={styles.icon}>
                <Icon
                  type="FontAwesome"
                  name="user-circle-o"
                  color="gray"
                  size={25}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.txt}>Update Profile:-</Text>
                <Text style={styles.txt}>
                  {user === null ? ocs : user.name}
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() =>
              navigation.navigate('updateprofile', {
                upname: user.name,
                upemail: user.email,
                upphone: user.phone,
              })
            }>
            <View style={styles.inputs}>
              <View style={styles.icon}>
                <Icon
                  type="FontAwesome"
                  name="mobile-phone"
                  color="gray"
                  size={35}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.txt}>Your Contact:-</Text>
                <Text style={styles.txt}>
                  {user === null ? ocs : user.phone}
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => navigation.navigate('logout')}>
            <View
              style={{
                ...styles.inputs,
                backgroundColor: '#EAEDED',
                width: '80%',
                height: 40,
                borderRadius: 50,
              }}>
              <View
                style={{
                  ...styles.input,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{...styles.icon, alignItems: 'flex-end'}}>
                  <Icoon
                    type="Ionicons"
                    name="ios-log-out"
                    color="#195A9B"
                    size={25}
                  />
                </View>
                <Text
                  style={{
                    ...styles.txt,
                    color: '#195A9B',
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  Logout Here
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={{width: 600, borderWidth: 0.5, borderColor: 'gray'}} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginHorizontal: 15,
  },
  settingForm: {
    width: '100%',
    marginTop: 30,
    alignItems: 'center',
  },
  inputs: {
    width: '95%',
    height: 60,

    marginBottom: 15,
    flexDirection: 'row',
  },
  icon: {
    width: '15%',
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    justifyContent: 'center',
    width: '85%',
  },
  txt: {
    fontFamily: 'ebrima',
    marginLeft: 15,
  },
});

export default Settings;
