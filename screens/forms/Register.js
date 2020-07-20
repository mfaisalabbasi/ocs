import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {useDispatch, useSelector} from 'react-redux';
import {registerSeller} from '../../store/actions/auth';
import Icon from 'react-native-vector-icons/FontAwesome';
const Register = ({navigation}) => {
  const [user, setuser] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    password: '',
  });
  const {name, email, phone, password, service} = user;
  //handling Registration
  const [err, seterr] = useState(false);
  const er = useSelector(state => state.register.error.sellerRegister);
  const loading = useSelector(state => state.register.loading);

  const dispatch = useDispatch();
  const handleRegister = async () => {
    if (!name || !email || !password || !phone || service === '') {
      seterr(true);
    } else {
      dispatch(registerSeller(user));
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
          <Text style={styles.heading}>Register as a seller,</Text>
          <Text style={styles.smallheading}>Let's serve togather</Text>
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
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name ..."
            placeholderTextColor="lightgray"
            value={name}
            onChangeText={text => setuser({...user, name: text})}
          />
        </View>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email ..."
            placeholderTextColor="lightgray"
            value={email}
            onChangeText={text => setuser({...user, email: text})}
          />
        </View>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone ..."
            placeholderTextColor="lightgray"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={text => setuser({...user, phone: text})}
          />
        </View>
        <View style={styles.picker}>
          <Picker
            style={{
              width: '100%',
              color: 'lightgray',
              fontFamily: 'ebrima',
              height: '100%',
            }}
            selectedValue={service}
            onValueChange={(itemValue, itemIndex) => {
              return setuser({
                ...user,
                service: itemValue,
              });
            }}>
            <Picker.Item label="choose service ..." value="undefined" />
            <Picker.Item label="Electration" value="electration" />
            <Picker.Item label="Plumber" value="plumber" />
            <Picker.Item label="Mechanics" value="Mechanics" />
          </Picker>
        </View>

        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password ..."
            placeholderTextColor="lightgray"
            secureTextEntry={true}
            value={password}
            onChangeText={text => setuser({...user, password: text})}
          />
        </View>

        <TouchableNativeFeedback onPress={handleRegister}>
          <View style={styles.button}>
            <Text style={{color: '#FFFFFF', fontFamily: 'ebrima'}}>
              Register
            </Text>
          </View>
        </TouchableNativeFeedback>
        <View style={styles.regBtn}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={{paddingVertical: 8, padding: 3}}>
              <Text style={styles.smallheading}>Login here!</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Customer')}>
            <View style={{paddingVertical: 8, padding: 3}}>
              <Text style={styles.smallheading}>|| Register as customer</Text>
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
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    fontFamily: 'ebrima',
    fontWeight: '400',
  },
  smallheading: {
    fontSize: 12,
    fontFamily: 'ebrima',
    color: '#498DF6',
    marginVertical: 5,
  },

  inputs: {
    width: '100%',
    marginVertical: 5,
    elevation: 5,
  },
  input: {
    fontSize: 12,
    paddingVertical: 8,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    fontFamily: 'ebrima',
    width: '90%',
    borderWidth: 0.4,
    borderColor: 'lightgray',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  picker: {
    width: '90%',
    height: 40,
    borderWidth: 0.5,
    borderColor: 'lightgray',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,

    marginVertical: 5,
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
});

export default Register;
