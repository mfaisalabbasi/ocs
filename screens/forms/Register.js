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
  const [next, setnext] = useState(false);
  const er = useSelector(state => state.register.error.sellerRegister);
  const loading = useSelector(state => state.register.loading);

  const dispatch = useDispatch();
  const handleRegister = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      service === '' ||
      password.length < 6
    ) {
      seterr(true);
    } else {
      dispatch(registerSeller(user));
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
          <Text style={styles.heading}>Register as Partner,</Text>
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
        {next ? (
          <Fragment>
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
                placeholder="Enter your password ..."
                placeholderTextColor="lightgray"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setuser({...user, password: text})}
              />
            </View>
            <View style={styles.picker}>
              <Picker
                style={{
                  width: '100%',
                  color: '#7FB3D5',
                  fontFamily: 'ebrima',
                  height: '100%',
                  fontSize: 12,
                }}
                selectedValue={service}
                onValueChange={(itemValue, itemIndex) => {
                  return setuser({
                    ...user,
                    service: itemValue,
                  });
                }}>
                <Picker.Item label="Choose service" value="undefined" />
                <Picker.Item label="Electration" value="electration" />
                <Picker.Item label="Car Mechanic" value="car mechanic" />
                <Picker.Item label="Plumber" value="plumber" />
                <Picker.Item label="Carpentar" value="carpenter" />
                <Picker.Item label="Ac Technician" value="ac technician" />
                <Picker.Item label="Construction" value="construction" />
                <Picker.Item label="Welding Service" value="welding service" />
                <Picker.Item label="Light Decoration" value="light decoration" />
                <Picker.Item label="Interior Design" value="interior design" />
                <Picker.Item label="Teacher/Tutor" value="teacher/tutor" />
                <Picker.Item label="Water Tanker" value="water tanker" />
                <Picker.Item label="Saloon" value="saloon" />
                <Picker.Item label="First Aid" value="first aid" />
                <Picker.Item label="Pick & Drop" value="pick & drop" />
                <Picker.Item label="Maids" value="maids" />
                <Picker.Item label="Painter" value="painter" />
                <Picker.Item label="Marbel/Tile Fixer" value="marbel/tile fixer" />
                <Picker.Item label="Drivers" value="drivers" />
</Picker>
            </View>
          </Fragment>
        ) : (
          <Fragment>
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
                placeholder="Enter your Number ..."
                placeholderTextColor="lightgray"
                value={phone}
                onChangeText={text => setuser({...user, phone: text})}
              />
            </View>
          </Fragment>
        )}
        {next ? (
          <TouchableNativeFeedback onPress={handleRegister}>
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
          <View style={styles.regBtn}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SellerLogin')}>
              <View>
                <Text style={styles.smallheading}>Login as Partner</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
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
    fontSize: 12,
    fontFamily: 'ebrima',
    color: '#498DF6',
    marginVertical: 5,
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
  picker: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBF5FB',
    elevation: 0,
    overflow: 'hidden',
    width: '90%',
    borderRadius: 20,
    height: 40,
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
