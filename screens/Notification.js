import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icoon from 'react-native-vector-icons/AntDesign';

const Notification = ({navigation}) => {
  navigation.setOptions({
    headerLeft: () => {
      return (
        <View style={styles.header}>
          <Icon
            type="Ionicons"
            name="ios-menu"
            color="#FFFFFF"
            size={33}
            onPress={() => navigation.toggleDrawer()}
          />
        </View>
      );
    },
  });

  return (
    <View style={styles.screen}>
      <TouchableNativeFeedback>
        <View style={styles.card}>
          <View style={styles.icon}>
            <Image
              source={require('../assets/images/bell.png')}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
          </View>
          <Text style={styles.title}>
            Welcome to OCS, We are here for you to Serve On Click, World number
            on free service provider
          </Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback>
        <View style={styles.card}>
          <View style={styles.icon}>
            <Image
              source={require('../assets/images/bell.png')}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
          </View>
          <Text style={styles.title}>
            Welcome to OCS, We are here for you to Serve On Click, World number
            on free service provider
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    marginHorizontal: 15,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: 150,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    marginTop: 15,
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
  icon: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  title: {
    width: '100%',
    height: '60%',
    padding: 15,
    fontFamily: 'ebrima',
    fontWeight: 'bold',
    color: '#0140A0',
  },
});
export default Notification;
