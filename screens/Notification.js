import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import Icoon from 'react-native-vector-icons/AntDesign';
import moment from 'moment'

const Notification = ({navigation}) => {
  navigation.setOptions({
    headerLeft: () => {
      return (
        <View style={styles.header}>
          <Icoon
            type="AntDesign"
            name="arrowleft"
            color="#FFFFFF"
            size={25}
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      );
    },
  });

  return (
    <View style={styles.screen}>
      <TouchableNativeFeedback >
        <View style={styles.card}>
          <View style={styles.icon}>
            <Image
              source={require('../assets/images/bell.png')}
              style={{width: '100%', height: '100%', resizeMode: 'contain'}}
            />
          </View>
          <View style={styles.title}>
            
            <Text style={styles.body}>
           <Text style={styles.head}>Dear Customer,</Text> Thanks for Signing Here, OCS will try best to serve you!.
           
            </Text>
            <Text style={{fontWeight:'bold',fontSize:12}}>[ {moment().format('MMMM Do YYYY, h:mm:ss a')} ]</Text>
          </View>
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
    width: '95%',
    height: 120,
    backgroundColor: '#FFFFFF',
    elevation: 1,
    marginTop: 15,
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
  icon: {
    width: '100%',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  title: {
    width: '100%',
    height: '65%',
    padding:5
  },
  head: {
    fontFamily: 'ebrima',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#0140A0',
  },
  body: {
   
    fontWeight:'900',
    
    fontFamily:'ebrima'
    
   
  },

});
export default Notification;
