import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import {useDispatch} from 'react-redux';
import {logoutAction} from '../../store/actions/auth';
import Icoon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/AntDesign';

const Logout = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    navigation.setOptions({
      title: 'Logout Screen',
    });
  }, [])
 
  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <View style={styles.screen}>
      <View style={styles.title}>
        <Text
          style={{
            fontFamily: 'ebrima',
            color: '#DE2F61',
            fontSize: 12,
            fontWeight: 'bold',
          }}>
          Are you sure, to Logout ?
        </Text>
      </View>
      <TouchableNativeFeedback onPress={handleLogout}>
        <View style={styles.logoutBtn}>
          <Text
            style={{
              color: '#FFFFFF',
              fontFamily: 'ebrima',
              fontWeight: 'bold',
            }}>
            <Icon type="AntDesign" name="logout" color="#FFFFFF" size={15} />
            {'  '}
            Logout
          </Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={() => navigation.navigate('setting')}>
        <View
          style={{
            ...styles.logoutBtn,
            backgroundColor: 'lightgray',
          }}>
          <Text
            style={{
              color: '#1B4F72',
              fontFamily: 'ebrima',
              fontWeight: 'bold',
            }}>
            <Icoon
              type="Entypo"
              name="squared-cross"
              color="#1B4F72"
              size={15}
            />{' '}
            No, Cancel
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  logoutBtn: {
    backgroundColor: '#498DF6',
    width: '90%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    elevation: 1.5,
    marginVertical: 5,
  },
});
export default Logout;
