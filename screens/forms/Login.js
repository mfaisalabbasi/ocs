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
import {loginAction} from '../../store/actions/auth';
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const er = useSelector(state => state.register.error.login);
  const loading = useSelector(state => state.register.loading);
  const [err, seterr] = useState(false);

  const [user, setuser] = useState({
    email: '',
    password: '',
  });
  const {email, password} = user;
  const loginHandler = () => {
    seterr(false);
    if (!email || !password) {
      seterr(true);
    } else {
      seterr(false);
      dispatch(loginAction(user));
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="#7687A0" barStyle="light-content" />
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
      <View style={styles.form}>
        <View style={styles.head}>
          <Icon
            type="FontAwesome"
            name="user-circle-o"
            color="#498DF6"
            size={35}
          />
          <Text style={styles.heading}>Welcome to OCS,</Text>
          <Text style={styles.smallheading}>Sign in to continue</Text>
        </View>
        {loading ? (
          <View>
            <ActivityIndicator size="small" color="#498DF6" />
            <Text style={{fontFamily: 'ebrima', color: '#498DF6'}}>
              Checking
            </Text>
          </View>
        ) : null}

        {err || er ? (
          <Text style={styles.redText}>
            Error :- check your credential, email or password not correct
          </Text>
        ) : null}
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Enter Email - ای میل لکھیں"
            placeholderTextColor="lightgray"
            value={email}
            onChangeText={text => setuser({...user, email: text})}
          />
        </View>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Enter Password - پاسورڈ لکھیں"
            placeholderTextColor="lightgray"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setuser({...user, password: text})}
          />
        </View>

        <View
          style={{
            width: '90%',
            justifyContent: 'flex-end',
            flexDirection: 'row',
            marginVertical: 3,
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('resetpassword')}>
            <View>
              <Text style={styles.smallheading}>Forgot password?</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableNativeFeedback onPress={loginHandler}>
          <View style={styles.button}>
            <Text style={{color: '#FFFFFF', fontFamily: 'ebrima'}}>Login</Text>
          </View>
        </TouchableNativeFeedback>
        <View style={styles.regBtn}>
          <TouchableOpacity onPress={() => navigation.navigate('Customer')}>
            <View style={{paddingVertical: 8, padding: 3}}>
              <Text style={styles.smallheading}>Register as customer / نیا اکاؤنٹ بنائیں</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

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
    marginBottom: 15,
  },
  heading: {
    fontSize: 18,
    fontFamily: 'ebrima',
    fontWeight: '900',
    color: '#498DF6',
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
    width: '87%',
    backgroundColor: '#498DF6',
    marginVertical: 9,
    paddingHorizontal: 5,
    paddingVertical: 9,
    justifyContent: 'center',
    alignItems: 'center',
   borderRadius:20,
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
    backgroundColor:'#F4F6F6',
    borderRadius:20,
    paddingVertical: 3,
    elevation: 0.3,

  },
});

export default Login;
