import React, {useState, useEffect} from 'react';
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
import {Picker} from '@react-native-community/picker';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {isNewUser, otpPartner} from '../store/actions/otp';

const RegisterModal = (props) => {
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
  //handling Registration
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
      Keyboard.dismiss();
      setTimeout(() => props.opentnx(), 1000);
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
            <Text style={styles.alert}>Partner Section</Text>
            <Text
              style={{
                fontFamily: 'ebrima',
                color: 'gray',
                fontSize: 10,
                marginBottom: 10,
              }}>
              You are new in partner Section kindly update Profile
            </Text>

            {loading ? (
              <View>
                <ActivityIndicator size="small" color="#498DF6" />
                <Text style={{fontFamily: 'ebrima', color: '#498DF6'}}></Text>
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
                  label="Ac Technician - اےسی ٹییکنیشن"
                  value="ac technician"
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
                numberOfLines={3}
                style={styles.input}
                placeholder="Describe job expertise in 200 characters - اپنے کام کے بارے میں تھوڑی معلومات لکھیں"
                placeholderTextColor="lightgray"
                value={expertise}
                onChangeText={(text) => setuser({...user, expertise: text})}
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
              <TouchableNativeFeedback onPress={handleRegister}>
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
    height: Dimensions.get('window').height / 2,
    width: '96%',
    borderRadius: 15,
    elevation: 10,
    overflow: 'visible',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
  alert: {
    fontSize: 18,
    fontFamily: 'ebrima',
    color: '#2257A9',
    fontWeight: 'bold',
    marginVertical: 3,
  },
});
export default RegisterModal;
