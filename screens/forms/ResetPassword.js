import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword} from '../../store/actions/auth';
const ResetPassword = ({navigation}) => {
  const dispatch = useDispatch();
  const er = useSelector(state => state.resetpassword.error.resetError);
  const [press, setpress] = useState(false);
  const [err, seterr] = useState(false);
  const [user, setuser] = useState({
    email: '',
  });
  const {email} = user;
  const loginHandler = () => {
    setpress(true);
    seterr(false);
    if (!email) {
      seterr(true);
    } else {
      seterr(false);
      setuser({
        email: '',
      });
      dispatch(resetPassword(email));
    }
    setTimeout(() => setpress(false), 1000);
  };
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="#2257A9" barStyle="light-content" />
      <View style={styles.form}>
        <View style={styles.head}>
          <Icon type="FontAwesome" name="edit" color="gray" size={40} />
          <Text style={styles.heading}>Enter your Email</Text>
          <Text style={styles.smallheading}>check your email</Text>
        </View>
        {press ? (
          <View>
            <ActivityIndicator size="small" color="#498DF6" />
            <Text style={{fontFamily: 'ebrima', color: '#498DF6'}}>
              Sending
            </Text>
          </View>
        ) : null}
        {err || er ? (
          <Text style={styles.redText}>
            Error :- Fill with Registered Email
          </Text>
        ) : null}
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder=" ..."
            placeholderTextColor="lightgray"
            value={email}
            onChangeText={text => setuser({...user, email: text})}
          />
        </View>
        <TouchableNativeFeedback onPress={loginHandler}>
          <View style={styles.button}>
            <Text style={{color: '#FFFFFF', fontFamily: 'ebrima'}}>Login</Text>
          </View>
        </TouchableNativeFeedback>
        <View style={styles.regBtn}>
          <TouchableOpacity onPress={() => navigation.navigate('SellerLogin')}>
            <View style={{paddingVertical: 8, padding: 3}}>
              <Text style={styles.smallheading}>Login as seller!</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Customer')}>
            <View style={{paddingVertical: 8, padding: 3}}>
              <Text style={styles.smallheading}>|| Register as customer</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontFamily: 'ebrima',
    fontWeight: '400',
  },
  smallheading: {
    fontSize: 10,
    fontFamily: 'ebrima',
    color: '#498DF6',
  },

  inputs: {
    width: '100%',
    marginVertical: 5,
  },
  input: {
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
    width: '85%',
    backgroundColor: '#498DF6',
    marginVertical: 10,
    paddingHorizontal: 5,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 2,
  },
  redText: {
    fontSize: 10,
    color: 'red',
    fontFamily: 'ebrima',
  },
  regBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'center',
  },
});

export default ResetPassword;
