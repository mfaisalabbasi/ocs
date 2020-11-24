import React, {Fragment, useEffect, useState} from 'react';
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
  nullNear,
  nullNotification,
  nullSeller,
  sendingNotification,
} from '../store/actions/user';
import {CustomerDeviceToken} from '../store/actions/auth';
import PushNotification from 'react-native-push-notification';
import Icooon from 'react-native-vector-icons/MaterialIcons';
import AvailblePartner from './AvailblePartner';

const ProfileModal = props => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.notification.loading);
  const err = useSelector(state => state.notification.error);
  const er = useSelector(state => state.user.sellersError);
  useEffect(() => {
    props.user.email && props.stprofile();
  }, [props.user]);
  useEffect(() => {
    err && props.stprofile();
  }, [err]);
  useEffect(() => {
    er && props.stprofile();
  }, [er]);

  const [press, setpress] = useState(false);
  const cancelFunc = () => {
    props.setopenprofile();
    props.curloc();
    props.setsrvc('Choose');
    dispatch(nullSeller());
    setpress(false);
    dispatch(nullNear());
  };
  const clearNotification = () => {
    setpress(true);
    dispatch(nullNotification());
  };

  PushNotification.configure({
    onRegister: function(token) {
   props.localId &&  dispatch(CustomerDeviceToken(props.localId, token));
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

  //-------------------Available Partners
  const [openprofile, setopenprofile] = useState(false);
  const checkAvailble = () => {
    setopenprofile(true);
    setpress(false)
  };
//---------Reverse geocode
const [address, setaddress] = useState(null)
const fetchNearby = async () => {
  const req = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.6ae5458d22712d8adf1548f4610d6784&lat=${props.user.latitude}&lon=${props.user.longitude}&format=json`)

 const res = await req.json()
 setaddress(res.display_name)
}
useEffect(() => {
fetchNearby()
 
}, [props.user.email])
  return (
    <Modal
      transparent={true}
      visible={props.openprofile}
      onRequestClose={props.setopenprofile}
      animationType="slide">
      <View style={styles.modelContainer}>
        {!props.user.email || er || err ? (
          <View style={styles.model}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>
                {er ? 'oops check your connection .!.' : 'oops .!.'}
              </Text>
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
                <Text style={{...styles.errorText, marginBottom: -5}}>
                  {err && 'Something went wrong '}
                </Text>
                <Text style={{...styles.errorText, fontSize: 12}}>
                  {er && 'Something went wrong, Partner not Found !!!'}
                </Text>
                <TouchableNativeFeedback
                  onPress={err ? clearNotification : cancelFunc}>
                  <View
                    style={{
                      ...styles.btn,
                      width: '90%',
                      marginVertical: 5,
                      padding: 10,
                    }}>
                    <Text style={{...styles.titleText, fontSize: 15}}>
                      {err ? 'Call him Directly' : 'Try Again Later'}
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
                {props.user.service} is just away from you
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
                        source={
                          props.user.profileUrl
                            ? {uri: props.user.profileUrl}
                            : require('../assets/images/profile.png')
                        }
                        style={{
                          flex: 1,
                          resizeMode: 'cover',
                          width: '100%',
                          height: 100,
                          aspectRatio: 1,
                          borderRadius: 50,
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
                            type="FontAwesome"
                            name="mobile"
                            color="#0340A0"
                            size={18}
                          />{' '}
                          :- {props.user.phone}
                        </Text>
                      </View>
                      <View style={{...styles.titles, paddingVertical:1}}>
                        <Text style={{...styles.infoText,fontSize:11}}>
                        <Icoon
                            type="FontAwesome"
                            name="location"
                            color="#0340A0"
                            size={18}
                          />{' '}
                        :- {address ? `Nr, ${address.substring(0,65)}` : props.user.email}
                        </Text>
                      </View>
                    </View>
                  </View>
                 <View style={{width:'90%',height:70,overflow:'hidden',padding:4}}>
                 <Text style={{...styles.infoText, color:'#17A589'}}>Expertise:-<Text style={{...styles.infoText,fontSize:11}}>{'  '}{props.user.expertise ? props.user.expertise.substring(0,190) : 'Partner is expert In his job, for Detail you can directly call partner!'}</Text></Text>
                 
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
                        <Text style={{...styles.titleText, fontSize: 14}}>
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
                          <Text style={{...styles.titleText, fontSize: 14}}>
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
                          <Text style={{...styles.titleText, fontSize: 14}}>
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
                  <TouchableNativeFeedback onPress={checkAvailble}>
                    <View
                      style={{
                        ...styles.btn,
                        width: '90%',
                        marginTop: 4,
                        height: 43,
                        backgroundColor: '#17A589',
                        borderRadius: 20,
                      }}>
                      <Text style={{...styles.titleText, fontSize: 14}}>
                        <Icooon
                          type="MaterialIcons"
                          name="find-in-page"
                          size={15}
                          color="#FFFFFF"
                        />{' '}
                        Check other Available {props.user.service}
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
                </Fragment>
              )}
            </ScrollView>
            <AvailblePartner
              openprofile={openprofile}
              setopenprofile={() => setopenprofile(false)}
            />
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
    height: Dimensions.get('window').height / 1.9,
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
    marginTop: 2,
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  smView: {
    width: '40%',
    padding: 3,
    alignItems: 'center',
  },
  info: {
    width: '60%',
    padding: 3,
  },
  titles: {
    marginTop: 2,
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
    height: 37,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0342A5',
    fontFamily: 'ebrima',
    marginVertical: 5,
  },
});

export default ProfileModal;
