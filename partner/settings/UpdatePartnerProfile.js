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
import {updatePartner} from '../../store/actions/user';

const UpdatePartnerProfile = ({route, navigation}) => {
  const {upname, upemail, upphone} = route.params;
  const [err, seterr] = useState(false);
  const [user, setuser] = useState({
    name: upname,
    email: upemail,
    phone: upphone,
  });
  const {name, email, phone} = user;

  const dispatch = useDispatch();
  const userid = useSelector(state => state.register.user.localId);
  const loading = useSelector(state => state.user.loading);
  const er = useSelector(state => state.user.updateError);

  const handleUpdate = () => {
    if (!name || !phone) {
      seterr(true);
    } else {
      seterr(false);
      dispatch(updatePartner(userid, user));
    }
  };
  return (
    <View style={styles.screen}>
      <View style={styles.form}>
        <View style={styles.head}>
          <Icon type="FontAwesome" name="edit" color="#0A7DC9" size={30} />
          <Text style={styles.heading}>On Click Services</Text>
          <Text style={styles.smallheading}>Update Your Profile Info</Text>
        </View>
        {loading ? (
          <View>
            <ActivityIndicator size="small" color="#498DF6" />
            <Text
              style={{fontFamily: 'ebrima', color: '#498DF6', fontSize: 12}}>
              Updating profile
            </Text>
          </View>
        ) : null}

        {err || er ? (
          <Text style={styles.redText}>
            {er
              ? ` Error :- Something went wrong try later `
              : ` Error :- You can't update Profile without adding valid Value`}
          </Text>
        ) : null}
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholderTextColor="lightgray"
            value={name}
            onChangeText={text => setuser({...user, name: text})}
          />
        </View>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholderTextColor="lightgray"
            value={email}
          />
        </View>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholderTextColor="lightgray"
            value={phone}
            onChangeText={text => setuser({...user, phone: text})}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableNativeFeedback onPress={handleUpdate}>
          <View style={styles.button}>
            <Text style={{color: '#FFFFFF', fontFamily: 'ebrima'}}>
              Update Profile
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
    fontSize: 10,
    color: 'red',
    fontFamily: 'ebrima',
  },
});

export default UpdatePartnerProfile;
