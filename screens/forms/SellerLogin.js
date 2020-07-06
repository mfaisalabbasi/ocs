import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {sellerLoginAction} from '../../store/actions/auth';
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [err, seterr] = useState(false);
  const er = useSelector(state => state.register.error.sellerLogin);

  const [user, setuser] = useState({
    email: '',
    password: '',
  });
  const {email, password} = user;
  const loginHandler = () => {
    if (!email || !password) {
      seterr(true);
    } else {
      seterr(false);
      setuser({
        email: '',
        password: '',
      });
      dispatch(sellerLoginAction(user));
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
            size={40}
          />
          <Text style={styles.heading}>Welcome Back,</Text>
          <Text style={styles.smallheading}>Sign in to start serving</Text>
        </View>
        {err || er ? (
          <Text style={styles.redText}>
            Error :- check your credential, email or password not correct
          </Text>
        ) : null}
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Email ..."
            placeholderTextColor="lightgray"
            value={email}
            onChangeText={text => setuser({...user, email: text})}
          />
        </View>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Password ..."
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
          <Text style={styles.smallheading}>Forgot password?</Text>
        </View>
        <TouchableNativeFeedback onPress={loginHandler}>
          <View style={styles.button}>
            <Text style={{color: '#FFFFFF', fontFamily: 'ebrima'}}>Login</Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <View
            style={{
              alignItems: 'center',
              width: '90%',
              justifyContent: 'center',

              padding: 5,
            }}>
            <Text style={styles.smallheading}>Login as Customer!</Text>
            {/* <Text> Register</Text> */}
          </View>
        </TouchableOpacity>
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
});

export default Login;
