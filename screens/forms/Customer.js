import React, {Fragment, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {registerCustomer} from '../../store/actions/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
const Customer = ({navigation}) => {
  const dispatch = useDispatch();
  const [next, setnext] = useState(false);
  // user registration
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const {name, email, password, phone, imgUrl} = user;
  const er = useSelector(state => state.register.error.registerEr);
  const loading = useSelector(state => state.register.loading);

  const [err, seterr] = useState(false);

  const handleRegisteration = async () => {
    if (!name || !email || !password || !phone || password.length < 6) {
      seterr(true);
    } else {
      dispatch(registerCustomer(user));
      seterr(false);
    }
  };

  const handleNext = () => {
    if (!name || !phone || isNaN(phone) || phone.length < 10) {
      seterr(true);
    } else {
      setnext(true);
      seterr(false);
    }
  };

  return (
    <View style={styles.screen}>
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
            size={30}
          />
          <Text style={styles.heading}>Register as Customer</Text>
          <Text style={styles.smallheading}>on click's Services</Text>
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
          <View
            style={{
              ...styles.input,
              borderWidth: 0,
            }}>
            <Text style={styles.redText}>
              Error :- Fill All the Fields correctlty Before submitting, use
              email that not in use before, and password more than six chracter
            </Text>
          </View>
        ) : null}

        {next ? (
          <Fragment>
            <View style={styles.inputs}>
              <TextInput
                style={styles.input}
                placeholder="Enter your email ..."
                placeholderTextColor="lightgray"
                value={email}
                name="email"
                onChangeText={text => setUser({...user, email: text})}
              />
            </View>
            <View style={styles.inputs}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password ..."
                placeholderTextColor="lightgray"
                secureTextEntry={true}
                value={password}
                name="password"
                onChangeText={text => setUser({...user, password: text})}
              />
            </View>
          </Fragment>
        ) : (
          <Fragment>
            <View style={styles.inputs}>
              <TextInput
                style={styles.input}
                placeholder="Enter your name ..."
                placeholderTextColor="lightgray"
                name="name"
                value={name}
                onChangeText={text => setUser({...user, name: text})}
              />
            </View>
            <View style={styles.inputs}>
              <TextInput
                style={styles.input}
                placeholder="Enter your Number ..."
                placeholderTextColor="lightgray"
                value={phone}
                name="phone"
                onChangeText={text => setUser({...user, phone: text})}
              />
            </View>
          </Fragment>
        )}
        {next ? (
          <TouchableNativeFeedback onPress={handleRegisteration}>
            <View style={styles.button}>
              <Text style={{color: '#FFFFFF', fontFamily: 'ebrima'}}>
                Register
              </Text>
            </View>
          </TouchableNativeFeedback>
        ) : (
          <TouchableNativeFeedback onPress={handleNext}>
            <View style={styles.button}>
              <Text style={{color: '#FFFFFF', fontFamily: 'ebrima'}}>
                Next{' '}
                <Icon
                  type="FontAwesome"
                  name="angle-double-right"
                  color="#FFFFFF"
                  size={15}
                />
              </Text>
            </View>
          </TouchableNativeFeedback>
        )}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '90%',
            justifyContent: 'center',
          }}>
          {next ? (
            <TouchableOpacity onPress={() => setnext(false)}>
              <View
                style={{
                  paddingVertical: 6,
                  padding: 3,
                  backgroundColor: '#EBF5FB',
                  width: 100,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                }}>
                <Icon
                  type="FontAwesome"
                  name="angle-double-left"
                  color="#498DF6"
                  size={20}
                />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View style={{paddingVertical: 6, padding: 3}}>
                <Text style={styles.smallheading}>Login as Customer</Text>
              </View>
            </TouchableOpacity>
          )}
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
    fontSize: 18,
    fontFamily: 'ebrima',
    fontWeight: '900',
    color: '#0A7DC9',
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
