import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableNativeFeedback,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {otpCustomer} from '../store/actions/otp';

const RegisterModal = (props) => {
  const userData = useSelector((state) => state.otp.user);
  const {phoneNumber, uid} = userData;
  const dispatch = useDispatch();

  // user registration
  const [user, setUser] = useState({
    name: '',
    phone: phoneNumber,
    userId: uid,
  });
  const {name} = user;
  const er = useSelector((state) => state.otpredu.error);
  const loading = useSelector((state) => state.otpredu.loading);
  const [err, seterr] = useState(false);
  const handleRegisteration = async () => {
    if (!name) {
      seterr(true);
    } else {
      dispatch(otpCustomer(user));
      seterr(false);
      Keyboard.dismiss();
      props.opentnx();
    }
  };

  const profileClosing = () => {
    props.closing();
    props.closetnx();
  };

  return (
    <Modal
      transparent={true}
      visible={props.new}
      onRequestClose={props.closing}
      animationType="slide">
      <View style={styles.modelContainer}>
        <View style={styles.model}>
          <View style={styles.form}>
            <Text style={styles.alert}>Customer Section</Text>
            <Text
              style={{
                fontFamily: 'ebrima',
                color: 'gray',
                fontSize: 10,
                marginBottom: 10,
              }}>
              You are new in Customer Section kindly update Profile
            </Text>
            {loading ? (
              <View>
                <ActivityIndicator size="small" color="#498DF6" />
                <Text style={{fontFamily: 'ebrima', color: '#498DF6'}}>
                  Updating Profile
                </Text>
              </View>
            ) : null}
            {err || er ? (
              <Text style={styles.redText}>
                Error :- Fill All the Fields correctlty Before submitting
              </Text>
            ) : null}
            <View style={styles.inputs}>
              <TextInput
                style={styles.input}
                placeholder="Enter your name - نام لکھیں"
                placeholderTextColor="lightgray"
                value={name}
                onChangeText={(text) => setUser({...user, name: text})}
              />
            </View>
            {props.tnx ? (
              <TouchableNativeFeedback onPress={profileClosing}>
                <View style={{...styles.button, backgroundColor: '#34495E'}}>
                  <Text style={{color: '#FFFFFF', fontFamily: 'ebrima'}}>
                    Thanks, Go Ahead
                  </Text>
                </View>
              </TouchableNativeFeedback>
            ) : (
              <TouchableNativeFeedback onPress={handleRegisteration}>
                <View style={styles.button}>
                  <Text style={{color: '#FFFFFF', fontFamily: 'ebrima'}}>
                    Update Profile
                  </Text>
                </View>
              </TouchableNativeFeedback>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modelContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  model: {
    backgroundColor: '#FFFFFF',
    height: Dimensions.get('window').height / 2.8,
    width: '96%',
    borderRadius: 15,
    elevation: 10,
    overflow: 'visible',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleView: {
    width: '100%',
    height: '10%',
    backgroundColor: '#2257A9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    padding: 5,
    fontSize: 10,
    fontFamily: 'ebrima',
    color: '#FFFFFF',
  },
  //Regissss
  form: {
    width: '95%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  heading: {
    fontSize: 14,
    fontFamily: 'ebrima',
    fontWeight: '900',
    color: 'green',
    fontWeight: '700',
  },
  smallheading: {
    fontSize: 12,
    fontFamily: 'ebrima',
    color: '#498DF6',
  },

  inputs: {
    width: '100%',
    marginVertical: 5,
  },
  input: {
    padding: 8,
    fontSize: 12,
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
  },
  button: {
    width: '60%',
    backgroundColor: '#498DF6',
    marginVertical: 8,
    paddingHorizontal: 5,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 2,
  },
  regBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'center',
  },
  redText: {
    fontSize: 10,
    color: 'red',
    fontFamily: 'ebrima',
  },
  alert: {
    fontSize: 18,
    fontFamily: 'ebrima',
    color: '#2257A9',
    fontWeight: 'bold',
    marginVertical: 3,
  },
});
export default RegisterModal;
