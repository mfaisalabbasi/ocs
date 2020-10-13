import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  StatusBar,
} from 'react-native';

const Ocs = ({navigation}) => {
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="#7687A0" barStyle="light-content" />

      <View style={styles.topView} />
      <View style={styles.form}>
        <View style={styles.imgView}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{width: '50%', height: '100%', resizeMode: 'center'}}
          />
        </View>
        <TouchableNativeFeedback onPress={() => navigation.navigate('Login')}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Become OCS Customer</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => navigation.navigate('SellerLogin')}>
          <View style={{...styles.btn, backgroundColor: '#F2C229'}}>
            <Text style={styles.btnText}>Become OCS Partner</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.bottomView} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  form: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgView: {
    width: '90%',
    height: 110,
    marginVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '90%',
    height: 50,
    backgroundColor: '#2C7AF2',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 3,
    elevation: 2,
  },
  btnText: {
    color: '#FFFFFF',
    fontFamily: 'ebrima',
    fontWeight: '900',
  },
  topView: {
    width: '25%',
    height: '5%',
    backgroundColor: '#2C7AF2',
    marginRight: 'auto',
    borderBottomRightRadius: 30,
  },
  bottomView: {
    width: '25%',
    height: '5%',
    marginLeft: 'auto',
    backgroundColor: '#2C7AF2',
    borderTopLeftRadius: 30,
  },
});
export default Ocs;
