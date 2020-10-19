import React from 'react';
import {
  TouchableNativeFeedback,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {requestCustomer} from '../store/actions/user';
const Box = props => {
  const dispatch = useDispatch();
  const handlePress = () => {
    dispatch(requestCustomer(props.dta));
    props.navigate();
  };
  return (
    <View style={styles.screen}>
      <TouchableNativeFeedback onPress={handlePress}>
        <View style={styles.card}>
          <View style={styles.icon}>
            <Image
              source={require('../assets/images/bell.png')}
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={styles.title}>
            <Text style={styles.body}>
              <Text style={styles.head}>{props.dta.name},</Text> {props.dta.msg ? props.dta.msg :'is looking for your service, kindly check further details.'}
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 12}}>
              [ {moment(props.dta.date).fromNow()} ]
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
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
    padding: 5,
  },
  head: {
    fontFamily: 'ebrima',
    fontWeight: 'bold',
    fontSize: 15,
    color: '#0140A0',
  },
  body: {
    fontWeight: '900',

    fontFamily: 'ebrima',
  },
});
export default Box;