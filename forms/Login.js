import React, {Fragment, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TextInput,
  StatusBar,
  ActivityIndicator,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {otpConfirm, otpRegister} from '../store/actions/otp';
import {AppEventsLogger} from 'react-native-fbsdk';
import analytics from '@react-native-firebase/analytics';

const Login = () => {
  const confirm = useSelector((state) => state.otp.confirm);
  const loading = useSelector((state) => state.otp.loading);
  const err = useSelector((state) => state.otp.error);
  const otpEr = useSelector((state) => state.otp.otpError);

  const [phone, setphone] = useState('');
  const [code, setcode] = useState('');
  const [er, seter] = useState(false);

  const dispatch = useDispatch();
  const loginHandler = async () => {
    if (phone.length < 10) {
      seter(true);
    } else {
      seter(false);
      let num = '+92 ' + parseInt(phone, 10);
      dispatch(otpRegister(num));
    }
  };
  async function confirmCode() {
    if (code.length < 5) {
      seter(true);
    } else {
      dispatch(otpConfirm(confirm, code));
      AppEventsLogger.logEvent('Complete Customer Registration');
      AppEventsLogger.logEvent('fb_mobile_complete_registration');
      await analytics().logEvent('customer_register');
    }
  }

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="#34495E" barStyle="light-content" />
      <View
        style={{
          width: '100%',
          height: '4%',
        }}>
        <View
          style={{
            backgroundColor: '#498DF6',
            width: '20%',
            height: '100%',
            borderBottomRightRadius: 70,
          }}
        />
      </View>
      {!confirm ? (
        <View style={styles.form}>
          <View style={styles.head}>
            <Image
              source={require('../assets/images/ocs.png')}
              style={{width: 40, height: 40, borderRadius: 200}}
            />
            <Text style={styles.heading}>On Click Services</Text>
            <Text style={styles.smallheading}>Enter number /نمبر درج کریں</Text>
          </View>
          {loading ? (
            <View>
              <ActivityIndicator size="small" color="#498DF6" />
              <Text style={{fontFamily: 'ebrima', color: '#498DF6'}}>
                Sending Code
              </Text>
            </View>
          ) : null}
          {err || er ? (
            <Text style={styles.redText}>
              Error :- Please Enter Valid Number
            </Text>
          ) : null}

          <Fragment>
            <View style={styles.inputs}>
              <TextInput
                style={styles.input}
                placeholder="Enter mobile number"
                placeholderTextColor="lightgray"
                value={phone}
                keyboardType="phone-pad"
                onChangeText={(text) => setphone(text)}
                autoFocus
              />
            </View>
            <TouchableNativeFeedback onPress={loginHandler}>
              <View style={styles.button}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'ebrima',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  Submit Number
                </Text>
              </View>
            </TouchableNativeFeedback>
          </Fragment>
        </View>
      ) : (
        <View style={styles.form}>
          <View style={styles.head}>
            <Image
              source={require('../assets/images/ocs.png')}
              style={{width: 40, height: 40, borderRadius: 200}}
            />
            <Text style={styles.heading}>Check Message</Text>
            <Text style={styles.smallheading}>
              Enter Verification Code /کوڈ درج کریں
            </Text>
          </View>
          {loading ? (
            <View>
              <ActivityIndicator size="small" color="#498DF6" />
              <Text style={{fontFamily: 'ebrima', color: '#498DF6'}}>
                Verifying Code ...
              </Text>
            </View>
          ) : null}
          {otpEr || er ? (
            <Text style={styles.redText}>Error :- Please Enter Valid Code</Text>
          ) : null}
          <Fragment>
            <View style={styles.inputs}>
              <TextInput
                style={styles.input}
                placeholder="Enter Verification Code"
                placeholderTextColor="lightgray"
                value={code}
                keyboardType="phone-pad"
                onChangeText={(text) => setcode(text)}
                autoFocus
              />
            </View>
            <TouchableNativeFeedback onPress={confirmCode}>
              <View style={styles.button}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'ebrima',
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}>
                  Verify Me
                </Text>
              </View>
            </TouchableNativeFeedback>
          </Fragment>
        </View>
      )}

      <View
        style={{
          width: '100%',
          height: '4%',
          alignItems: 'flex-end',
        }}>
        <View
          style={{
            backgroundColor: '#498DF6',
            width: '20%',
            height: '100%',
            borderTopLeftRadius: 70,
          }}
        />
      </View>
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
    // backgroundColor: '#498DF6',
    width: '95%',
    height: '92%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  head: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  heading: {
    fontSize: 18,
    fontFamily: 'ebrima',
    fontWeight: 'bold',
    color: '#498DF6',
  },
  smallheading: {
    fontSize: 9,
    fontFamily: 'ebrima',
    color: 'green',
    marginTop: 2,
    fontWeight: '900',
  },

  inputs: {
    width: '100%',
    marginVertical: 5,
  },
  input: {
    padding: 8,
    fontFamily: 'ebrima',
    width: '90%',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderBottomColor: 'lightgray',
    borderTopColor: 'lightgray',
    borderRightColor: 'lightgray',
    borderLeftColor: 'lightgray',
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 16,
  },

  button: {
    width: '88%',
    backgroundColor: '#498DF6',
    marginTop: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 1.5,
  },
  redText: {
    fontSize: 10,
    color: 'red',
    fontFamily: 'ebrima',
  },
  regBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '87%',
    justifyContent: 'center',
    backgroundColor: '#F4F6F6',
    borderRadius: 20,
    paddingVertical: 3,
    elevation: 0.3,
  },
});

export default Login;
