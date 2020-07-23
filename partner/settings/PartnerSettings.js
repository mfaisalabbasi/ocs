import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icoon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const PartnerSettings = ({navigation}) => {
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
  const user = useSelector(state => state.user.user);
  const email = useSelector(state => state.user.email);
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
                upemail: user.email,
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
                <Text style={styles.txt}>Your Name:-</Text>
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
                <Icoon
                  type="Ionicons"
                  name="ios-mail-unread"
                  color="gray"
                  size={27}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.txt}>Your Email:-</Text>
                <Text style={styles.txt}>
                  {user === null ? ocs : user.email}
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
                <Text style={styles.txt}>Your Mobile:-</Text>
                <Text style={styles.txt}>
                  {user === null ? ocs : user.phone}
                </Text>
              </View>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => navigation.navigate('changepassword')}>
            <View
              style={{...styles.inputs, marginBottom: 5, marginVertical: -10}}>
              <View style={styles.icon}>
                <Icon type="FontAwesome" name="lock" color="gray" size={25} />
              </View>
              <View style={styles.input}>
                <Text style={styles.txt}>Change Password</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => navigation.navigate('logout')}>
            <View style={styles.inputs}>
              <View style={styles.icon}>
                <Icoon
                  type="Ionicons"
                  name="ios-log-out"
                  color="gray"
                  size={27}
                />
              </View>
              <View style={styles.input}>
                <Text style={styles.txt}>Logout Here</Text>
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

export default PartnerSettings;
