import React, {Fragment, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {otpPartner} from '../store/actions/otp';

const Register = ({navigation}) => {
  const userData = useSelector((state) => state.otp.user);
  const {phoneNumber, uid} = userData;
  const [user, setuser] = useState({
    name: '',
    service: '',
    expertise: '',
    phone: phoneNumber,
    userId: uid,
  });
  const {name, service, expertise} = user;
  //handling Registrations
  //handling Registrations

  const [err, seterr] = useState(false);
  const er = useSelector((state) => state.otpredu.error);
  const loading = useSelector((state) => state.otpredu.loading);

  const dispatch = useDispatch();
  const handleRegister = async () => {
    if (!name || !expertise || service === '') {
      seterr(true);
    } else {
      dispatch(otpPartner(user));
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
              Checking
            </Text>
          </View>
        ) : null}
        {err || er ? (
          <Text style={styles.redText}>
            Error :- Fill All the Fields correctlty Before submitting
          </Text>
        ) : null}

        <Fragment>
          <View style={styles.inputs}>
            <TextInput
              style={styles.input}
              placeholder="Enter your name - نام لکھیں"
              placeholderTextColor="lightgray"
              value={name}
              onChangeText={(text) => setuser({...user, name: text})}
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
              <Picker.Item
                label="Choose service - کام کا انتخاب"
                value="undefined"
              />
              <Picker.Item
                label="Electrician - الیکٹریشن"
                value="electrician"
              />
              <Picker.Item
                label="Car Mechanic - کار مکینک"
                value="car mechanic"
              />
              <Picker.Item
                label="Bike Mechanic - بائیک مکینک"
                value="bike mechanic"
              />
              <Picker.Item label="Plumber - پلمبر" value="plumber" />
              <Picker.Item label="Carpentar - کارپینٹر" value="carpenter" />
              <Picker.Item
                label="Ac & Fridge - اےسی ٹییکنیشن"
                value="ac & fridge tech"
              />
              <Picker.Item
                label="Construction - کنسٹرکشن"
                value="construction"
              />
              <Picker.Item
                label="Welding Service - ویلڈنگ سروس"
                value="welding service"
              />
              <Picker.Item
                label="Light Decoration - لائٹ ڈیکوریشن"
                value="light decoration"
              />
              <Picker.Item
                label="Interior Design - انٹیرئیر ڈیزائن"
                value="interior design"
              />
              <Picker.Item
                label="Teacher & Tutor - ٹیچرز/ٹیوٹرز"
                value="teacher & tutor"
              />
              <Picker.Item
                label="Water Tanker - واٹر ٹینکر"
                value="water tanker"
              />
              <Picker.Item label="Saloon - سیلون" value="saloon" />
              <Picker.Item label="First Aid - فرسٹ ایڈ" value="first aid" />
              <Picker.Item
                label="Pick & Drop - پک اینڈ ڈراپ"
                value="pick & drop"
              />
              <Picker.Item label="Maids - نوکر/نوکرانی" value="maids" />
              <Picker.Item label="Painter - پینٹر" value="painter" />
              <Picker.Item
                label="Marble & Tile Fixer - ماربل ٭ ٹائل فکسر"
                value="marble & tile fixer"
              />
              <Picker.Item label="Drivers - ڈرائیورز" value="drivers" />
              <Picker.Item
                label="Catering Service - کیٹرنگ سروس"
                value="catering service"
              />
            </Picker>
          </View>
          <View style={styles.inputs}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.input}
              placeholder="Describe job expertise in 200 characters - اپنے کام کے بارے میں تھوڑی معلومات لکھیں"
              placeholderTextColor="lightgray"
              value={expertise}
              onChangeText={(text) => setuser({...user, expertise: text})}
            />
          </View>
        </Fragment>

        <TouchableNativeFeedback onPress={handleRegister}>
          <View style={styles.button}>
            <Text style={{color: '#FFFFFF', fontFamily: 'ebrima'}}>
              Register/رجسٹر
            </Text>
          </View>
        </TouchableNativeFeedback>
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
