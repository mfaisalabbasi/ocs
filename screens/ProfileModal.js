import React, {Fragment, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  Text,
  Modal,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icoon from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {
  jobRequest,
  nullSeller,
  sendingNotification,
} from '../store/actions/user';
import {CustomerDeviceToken} from '../store/actions/auth';
import PushNotification from 'react-native-push-notification';
const ProfileModal = props => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.notification.loading);
  const [press, setpress] = useState(false);
  const cancelFunc = () => {
    props.setopenprofile();
    props.curloc();
    props.setsrvc('Choose');
    dispatch(nullSeller());
    setpress(false);
  };

  PushNotification.configure({
    onRegister: function(token) {
      console.log('TOKEN:', token);
      dispatch(CustomerDeviceToken(props.localId, token));
    },
    onNotification: function(notification) {
      console.log('NOTIFICATION:', notification);
    },

    onAction: function(notification) {
      console.log('Action:', notification);

      // process the action
    },
    onRegistrationError: function(err) {
      console.error(err.message, err);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  const onStartContract = async () => {
    dispatch(sendingNotification(props.user.Devicetoken.token, props.customer));
    dispatch(jobRequest(props.user.partnerKey, props.customer));
    setpress(true);
  };

  const callNow = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${props.user.phone}`;
    } else {
      number = `tel:${props.user.phone}`;
    }
    Linking.openURL(number);
  };

  return (
    <Modal
      transparent={true}
      visible={props.openprofile}
      onRequestClose={props.setopenprofile}
      animationType="slide">
      <View style={styles.modelContainer}>
        {!props.user.email ? (
          <View style={styles.model}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>oops .!.</Text>
            </View>
            <ScrollView
              contentContainerStyle={{
                width: Dimensions.get('window').width,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 30,
                }}>
                <Icoon
                  type="Entypo"
                  name="emoji-sad"
                  color="#0340A0"
                  size={50}
                />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#0342A5',
                    fontFamily: 'ebrima',
                    marginVertical: 5,
                  }}>
                  Partner Not Available Right Now
                </Text>
                <TouchableNativeFeedback onPress={cancelFunc}>
                  <View
                    style={{...styles.btn, width: '90%', marginVertical: 10}}>
                    <Text style={{...styles.titleText, fontSize: 15}}>
                      Try Again Later
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </ScrollView>
          </View>
        ) : (
          <View style={styles.model}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>
                Electration is {props.user.haversine.distance} miles away from
                you.
              </Text>
            </View>
            <ScrollView
              contentContainerStyle={{
                width: Dimensions.get('window').width,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              showsVerticalScrollIndicator={false}>
              {loading ? (
                <View
                  style={{
                    marginTop: 100,
                  }}>
                  <ActivityIndicator size="small" color="#0340A0" />
                  <Text
                    style={{
                      color: '#0340A0',
                      fontFamily: 'ebrima',
                      fontWeight: 'bold',
                    }}>
                    Sending request !!!
                  </Text>
                </View>
              ) : (
                <Fragment>
                  <View style={styles.proView}>
                    <View style={styles.smView}>
                      <Image
                        source={require('../assets/images/profile.jpg')}
                        style={{
                          width: '100%',
                          height: 100,
                          resizeMode: 'cover',
                          borderRadius: 200,
                        }}
                      />
                      <Text style={styles.infoText}>
                        <Icoon
                          type="Entypo"
                          name="star"
                          color="#0340A0"
                          size={18}
                        />
                        <Icoon
                          type="Entypo"
                          name="star"
                          color="#0340A0"
                          size={18}
                        />
                        <Icoon
                          type="Entypo"
                          name="star"
                          color="#0340A0"
                          size={18}
                        />
                      </Text>
                    </View>
                    <View style={styles.info}>
                      <View style={styles.titles}>
                        <Text style={styles.infoText}>
                          <Icon
                            type="FontAwesome"
                            name="user-circle-o"
                            color="#0340A0"
                            size={18}
                          />{' '}
                          :- {props.user.name}
                        </Text>
                      </View>
                      <View style={styles.titles}>
                        <Text style={styles.infoText}>
                          <Icoon
                            type="Entypo"
                            name="email"
                            color="#0340A0"
                            size={18}
                          />{' '}
                          :- {props.user.email}
                        </Text>
                      </View>
                      <View style={styles.titles}>
                        <Text style={styles.infoText}>
                          <Icoon
                            type="FontAwesome"
                            name="mobile"
                            color="#0340A0"
                            size={18}
                          />{' '}
                          :- {props.user.phone}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.proView}>
                    <TouchableNativeFeedback onPress={cancelFunc}>
                      <View
                        style={{
                          ...styles.btn,
                          backgroundColor: '#2155A8',
                          marginRight: 5,
                          width: '40%',
                        }}>
                        <Text style={{...styles.titleText, fontSize: 15}}>
                          <Icoon
                            type="Entypo"
                            name="squared-cross"
                            color="#FFFFFF"
                            size={15}
                          />{' '}
                          Cancel
                        </Text>
                      </View>
                    </TouchableNativeFeedback>
                    {!press ? (
                      <TouchableNativeFeedback onPress={onStartContract}>
                        <View style={styles.btn}>
                          <Text style={{...styles.titleText, fontSize: 15}}>
                            <Icon
                              type="FontAwesome"
                              name="check-square-o"
                              color="#FFFFFF"
                              size={16}
                            />
                            {'  '}
                            Start Contract
                          </Text>
                        </View>
                      </TouchableNativeFeedback>
                    ) : (
                      <TouchableNativeFeedback onPress={callNow}>
                        <View
                          style={{
                            ...styles.btn,
                            backgroundColor: '#48A06D',
                            marginRight: 5,
                          }}>
                          <Text style={{...styles.titleText, fontSize: 15}}>
                            <Icon
                              type="FontAwesome"
                              name="phone"
                              color="#FFFFFF"
                              size={18}
                              style={{paddingTop: 5}}
                            />
                            {'  '}
                            Call Now
                          </Text>
                        </View>
                      </TouchableNativeFeedback>
                    )}
                  </View>
                </Fragment>
              )}
            </ScrollView>
          </View>
        )}
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
    height: Dimensions.get('window').height / 2.8,
    width: '100%',
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
    elevation: 10,
    overflow: 'hidden',
  },
  titleView: {
    width: '100%',
    backgroundColor: '#2257A9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    padding: 3,
    fontSize: 12,
    fontFamily: 'ebrima',
    color: '#FFFFFF',
  },
  proView: {
    width: '100%',
    marginTop: 3,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  smView: {
    width: '40%',
    padding: 5,
    alignItems: 'center',
  },
  info: {
    width: '60%',
    padding: 5,
  },
  titles: {
    marginTop: 5,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  infoText: {
    fontFamily: 'ebrima',
    color: '#0340A0',
    fontWeight: '500',
  },
  btn: {
    width: '50%',
    backgroundColor: '#0342A5',
    padding: 5,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
});

export default ProfileModal;
