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
      <StatusBar backgroundColor="#34495E" barStyle="light-content" />

      <View style={styles.topView} />
      <View style={styles.form}>
        <View style={styles.imgView}>
          <Image
            source={require('../assets/images/ocs.png')}
            style={{width: 60, height: 60, borderRadius: 200}}
          />
        </View>
        <Text
          style={{
            fontFamily: 'ebrima',
            marginBottom: 2,
            fontSize: 20,
            color: 'green',
            fontWeight: 'bold',
          }}>
          Welcome!
        </Text>
        <Text
          style={{
            fontFamily: 'ebrima',
            marginBottom: 10,
            fontSize: 8,
            color: 'green',
          }}>
          Choose Account /اکاؤنٹ کا انتخاب کریں
        </Text>

        <TouchableNativeFeedback onPress={() => navigation.navigate('Login')}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Customer Account / کسٹمر اکاؤنٹ</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => navigation.navigate('SellerLogin')}>
          <View style={{...styles.btn, backgroundColor: '#F2C229'}}>
            <Text style={styles.btnText}>Partner Account / پارٹنر اکاؤنٹ</Text>
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
    width: 60,
    height: 60,
    marginBottom: 5,
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
