import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {authUser} from '../../store/actions/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

const Customer = ({navigation}) => {
  const [selectedValue, setSelectedValue] = useState('Choose Service');
  const dispatch = useDispatch();
  const handleRegister = () => {
    dispatch(authUser(true));
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
          <Text style={styles.heading}>Register as customer</Text>
          <Text style={styles.smallheading}>on click's Services</Text>
        </View>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Enter your name ..."
            placeholderTextColor="lightgray"
          />
        </View>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email ..."
            placeholderTextColor="lightgray"
          />
        </View>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone ..."
            placeholderTextColor="lightgray"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password ..."
            placeholderTextColor="lightgray"
            secureTextEntry={true}
          />
        </View>

        <TouchableNativeFeedback onPress={handleRegister}>
          <View style={styles.button}>
            <Text style={{color: '#FFFFFF', fontFamily: 'ebrima'}}>
              Register
            </Text>
          </View>
        </TouchableNativeFeedback>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '90%',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={{paddingVertical: 8, padding: 3}}>
              <Text style={styles.smallheading}>Login here!</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <View style={{paddingVertical: 8, padding: 3}}>
              <Text style={styles.smallheading}>|| Register as seller</Text>
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
});

export default Customer;
