import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const UpdateName = () => {
  return (
    <View style={styles.screen}>
      <View style={styles.form}>
        <View style={styles.head}>
          <Icon type="FontAwesome" name="edit" color="gray" size={35} />

          <Text style={styles.heading}>On Click Services</Text>
          <Text style={styles.smallheading}>Update Your name</Text>
        </View>
        <View style={styles.inputs}>
          <TextInput
            style={styles.input}
            placeholder="Name ..."
            placeholderTextColor="lightgray"
            // value={email}
            // onChangeText={text => setuser({...user, email: text})}
          />
        </View>

        <TouchableNativeFeedback>
          <View style={styles.button}>
            <Text style={{color: '#FFFFFF', fontFamily: 'ebrima'}}>
              Update name
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
});

export default UpdateName;
