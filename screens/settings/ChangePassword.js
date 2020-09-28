import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {changePassword} from '../../store/actions/auth';

const ChangePassword = ({navigation}) => {
  const [newpassword, setnewpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [err, seterr] = useState(false);
  const er = useSelector(state => state.register.error.changepassword);
  const dispatch = useDispatch();
  const idToken = useSelector(state => state.register.user.idToken);
  const loading = useSelector(state => state.register.loading);

  const handlePassword = () => {
    if (newpassword !== confirmpassword || newpassword.length < 6) {
      seterr(true);
    } else {
      seterr(false);
      dispatch(changePassword(idToken, newpassword));
      setnewpassword('');
      setconfirmpassword('');
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.form}>
        <View style={styles.head}>
          <Icon type="FontAwesome" name="edit" color="#0A7DC9" size={30} />
          <Text style={styles.heading}>On Click Services</Text>
          <Text style={styles.smallheading}>Change Your Password</Text>
        </View>
        {loading ? (
          <View>
            <ActivityIndicator size="small" color="#498DF6" />
            <Text
              style={{fontFamily: 'ebrima', color: '#498DF6', fontSize: 12}}>
              Changing password
            </Text>
          </View>
        ) : null}
        {err || er ? (
          <Text style={styles.redText}>
            Error :- Password must be more than 6 chracter and both should match
          </Text>
        ) : null}
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Enter new Password ..."
            placeholderTextColor="lightgray"
            value={newpassword}
            onChangeText={text => setnewpassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Confirm new Password ..."
            placeholderTextColor="lightgray"
            value={confirmpassword}
            onChangeText={text => setconfirmpassword(text)}
            secureTextEntry={true}
          />
        </View>

        <TouchableNativeFeedback onPress={handlePassword}>
          <View style={styles.button}>
            <Text style={{color: '#FFFFFF', fontFamily: 'ebrima'}}>
              Change Password
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
    fontSize: 18,
    fontFamily: 'ebrima',
    fontWeight: '900',
    color: '#0A7DC9',
  },
  smallheading: {
    fontSize: 8,
    fontFamily: 'ebrima',
    color: '#498DF6',
  },

  inputs: {
    width: '100%',
    marginVertical: 3,
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
    padding: 5,
  },
  button: {
    width: '60%',
    backgroundColor: '#498DF6',
    marginVertical: 10,
    paddingHorizontal: 5,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 2,
  },
  redText: {
    fontSize: 8,
    color: 'red',
    fontFamily: 'ebrima',
  },
});

export default ChangePassword;
