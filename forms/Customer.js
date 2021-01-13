import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {otpCustomer} from '../store/actions/otp';
const Customer = ({navigation}) => {
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
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.form}>
        <View style={styles.head}>
          <Icon
            type="FontAwesome"
            name="check-circle-o"
            color="green"
            size={27}
          />
          <Text style={styles.heading}>Congratulation</Text>
          <Text style={{...styles.heading, fontSize: 15, fontWeight: '500'}}>
            Registration Succeed!
          </Text>
        </View>
        {loading ? (
          <View>
            <ActivityIndicator size="small" color="#498DF6" />
            <Text style={{fontFamily: 'ebrima', color: '#498DF6'}}>
              Updating profile
            </Text>
          </View>
        ) : null}
        {err || er ? (
          <Text style={styles.redText}>Error:- Enter your Name</Text>
        ) : null}
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name - نام لکھیں"
            placeholderTextColor="lightgray"
            name="name"
            value={name}
            onChangeText={(text) => setUser({...user, name: text})}
          />
        </View>
        <TouchableNativeFeedback onPress={handleRegisteration}>
          <View style={styles.button}>
            <Text style={{color: '#FFFFFF', fontFamily: 'ebrima'}}>
              Register/رجسٹر
            </Text>
          </View>
        </TouchableNativeFeedback>
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
    width: '95%',
    height: '92%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  head: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 14,
    fontFamily: 'ebrima',
    color: 'green',
    fontWeight: 'bold',
  },
  smallheading: {
    fontSize: 11,
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
  errBox: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '90%',
  },
  redText: {
    fontSize: 10,
    color: 'red',
    fontFamily: 'ebrima',
  },
});

export default Customer;
