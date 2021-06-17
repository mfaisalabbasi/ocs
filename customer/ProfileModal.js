import React, {Fragment, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  Text,
  Modal,
  Dimensions,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icoon from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {nullNear, nullSeller} from '../store/actions/user';
import {clearOrder, submitOrder} from '../store/actions/order';
import {AppEventsLogger} from 'react-native-fbsdk';
const ProfileModal = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.order.loading);
  const err = useSelector((state) => state.order.error);
  const er = useSelector((state) => state.user.sellersError);
  useEffect(() => {
    props.sellers.length && props.stprofile();
  }, [props.sellers]);
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
    setconfirmOrder(false);
    dispatch(clearOrder());
    AppEventsLogger.logEvent('Cancel Pressed');
  };

  //---------------------------------sellers Array
  const Box = ({item}) => {
    return (
      <View style={styles.bx}>
        <View style={styles.sec1}>
          <Image
            source={
              item.profile
                ? {uri: item.profileUrl}
                : require('../assets/images/person.jpg')
            }
            style={styles.icon}
          />
        </View>
        <View style={styles.sec2}>
          <Text style={{fontSize: 11}}>{item.name}</Text>
          <Text style={styles.hd}>{item.service}</Text>
        </View>
      </View>
    );
  };
  //--------------------------------Order Now Func
  const [confirmOrder, setconfirmOrder] = useState(false);
  const confirmed = useSelector((state) => state.order.confirmed);
  const orderNow = () => {
    setconfirmOrder(true);
    AppEventsLogger.logEvent('order now');
    AppEventsLogger.logEvent('fb_mobile_add_to_cart');
  };
  const onOrderConfirm = () => {
    dispatch(submitOrder(user, props.service));
    AppEventsLogger.logEvent('confirm order');
    AppEventsLogger.logEvent('fb_mobile_purchase');
  };
  return (
    <Modal
      transparent={true}
      visible={props.openprofile}
      onRequestClose={props.setopenprofile}
      animationType="slide">
      <View style={styles.modelContainer}>
        <View style={styles.model}>
          <Image
            source={require('../assets/images/ocs.png')}
            style={styles.img}
          />
          <Text style={styles.cong}>
            {er
              ? 'Opps Not Found'
              : confirmed
              ? 'Request Submitted Successfully'
              : 'Congratulation!'}
          </Text>

          <Text style={styles.hd}>
            {er
              ? 'Something went wrong kindly try Later'
              : confirmed
              ? 'Thanks, we will contact you soon!'
              : 'We Found More Than #100 Parnters Nearby you'}{' '}
          </Text>
          <View style={styles.con}>
            {er ? (
              <View style={styles.center}>
                <Image
                  source={require('../assets/images/404.jpg')}
                  style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                />
              </View>
            ) : confirmed ? (
              <View style={styles.center}>
                <Image
                  source={require('../assets/images/order.png')}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                    aspectRatio: 1.5,
                  }}
                />
              </View>
            ) : loading ? (
              <View style={styles.center}>
                <ActivityIndicator size="small" color="#498DF6" />
                <Text style={{color: '#498DF6', fontFamily: 'ebrima'}}>
                  Submitting Order
                </Text>
              </View>
            ) : (
              props.sellers
                .slice(0, 4)
                .map((item) => <Box item={item} key={item.date + Date.now()} />)
            )}
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {er ? (
              <TouchableNativeFeedback onPress={cancelFunc}>
                <View
                  style={{
                    ...styles.btn,
                    backgroundColor: '#34495E',
                    height: 50,
                    marginTop: 8,
                  }}>
                  <Text style={styles.btnTxt}>
                    Kindly try later{' '}
                    <Icoon
                      type="Entypo"
                      name="squared-cross"
                      color="#FFFFFF"
                      size={15}
                    />
                  </Text>
                </View>
              </TouchableNativeFeedback>
            ) : confirmed ? (
              <TouchableNativeFeedback onPress={cancelFunc}>
                <View
                  style={{
                    ...styles.btn,
                    backgroundColor: '#51A8FF',
                    height: 50,
                    marginTop: 8,
                  }}>
                  <Text style={styles.btnTxt}>Go Back </Text>
                </View>
              </TouchableNativeFeedback>
            ) : confirmOrder ? (
              <Fragment>
                <Text style={styles.hd}>Click to confirm your Order</Text>
                <TouchableNativeFeedback onPress={onOrderConfirm}>
                  <View
                    style={{
                      ...styles.btn,
                      backgroundColor: 'green',
                      marginVertical: 5,
                      height: 40,
                    }}>
                    <Text style={styles.btnTxt}>Confirm Order</Text>
                  </View>
                </TouchableNativeFeedback>
                <TouchableOpacity onPress={() => setconfirmOrder(false)}>
                  <Text
                    style={{
                      ...styles.hd,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    }}>
                    Go Back
                  </Text>
                </TouchableOpacity>
              </Fragment>
            ) : (
              <Fragment>
                <TouchableNativeFeedback onPress={orderNow}>
                  <View style={styles.btn}>
                    <Text style={styles.btnTxt}>
                      Order Now{' '}
                      <Icon
                        type="FontAwesome"
                        name="handshake-o"
                        color="#FFFFFF"
                        size={15}
                      />
                    </Text>
                  </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={cancelFunc}>
                  <View style={{...styles.btn, backgroundColor: '#F2C229'}}>
                    <Text style={styles.btnTxt}>Cancel</Text>
                  </View>
                </TouchableNativeFeedback>
              </Fragment>
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
  },
  img: {
    width: 45,
    height: 45,
    borderRadius: 50,
    marginTop: -22,
  },
  cong: {
    marginVertical: 3,
    fontSize: 15,
    fontFamily: 'ebrima',
    color: 'green',
    fontWeight: 'bold',
  },
  hd: {fontSize: 11, fontFamily: 'ebrima', color: 'gray'},
  con: {
    width: '100%',
    height: '47%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 3,
    paddingTop: 7,
  },
  center: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bx: {
    width: '48%',
    height: '37%',
    margin: 3,
    marginTop: 7,
    flexDirection: 'row',
    backgroundColor: '#F8F9F9',
    elevation: 0.5,
    borderRadius: 5,
  },
  icon: {width: '95%', height: '70%', borderRadius: 30},
  sec1: {width: '24%', height: '100%', justifyContent: 'center'},
  sec2: {justifyContent: 'center', padding: 3, width: '76%'},
  btnTxt: {
    fontFamily: 'ebrima',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  //------------------------
  btn: {
    width: '90%',
    backgroundColor: '#0398FA',
    height: 40,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    marginBottom: 6,
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
