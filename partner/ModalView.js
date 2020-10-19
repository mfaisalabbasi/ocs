import React, {useState,useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableNativeFeedback,
  Platform,
  Linking,
} from 'react-native';
import Icoon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {nullCustomer} from '../store/actions/user';

const ModalView = props => {
  const dispatch = useDispatch();
  const [press, setpress] = useState(false);
  const onCancel = () => {
    props.closeProfile();
    setpress(false);
    props.closeDirect();
    props.currentlocation();
    props.poli();
    dispatch(nullCustomer());
  };
  const getDirect = () => {
    props.getDirection();
    setpress(true);
  };
  const callNow = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${props.reqCustomer.phone}`;
    } else {
      number = `tel:${props.reqCustomer.phone}`;
    }
    Linking.openURL(number);
  };

  //---------Reverse geocode
const [address, setaddress] = useState(null)
const fetchNearby = async () => {
  const req = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.6ae5458d22712d8adf1548f4610d6784&lat=${props.reqCustomer.location.latitude}&lon=${props.reqCustomer.location.longitude}&format=json`)

 const res = await req.json()
 setaddress(res.display_name)
}
useEffect(() => {
props.reqCustomer.email && fetchNearby()
 
}, [props.reqCustomer.email])
  return (
    <Modal
      transparent={true}
      visible={props.job}
      onRequestClose={props.closeProfile}
      animationType="slide">
      <View style={styles.modelContainer}>
        <View style={styles.model}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>
              {props.reqCustomer.name} want to hire you .
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={{
              width: Dimensions.get('window').width,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            showsVerticalScrollIndicator={false}>
            <View style={styles.proView}>
              <View style={styles.smView}>
                <Image
                  source={
                    props.reqCustomer.profileUrl
                      ? {uri: props.reqCustomer.profileUrl}
                      : require('../assets/images/profile.png')
                  }
                  style={{
                    resizeMode: 'cover',
                    aspectRatio: 1,
                    width: '100%',
                    height: 105,

                    borderRadius: 200,
                  }}
                />
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
                    :- {props.reqCustomer.name}
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
                    :- {props.reqCustomer.phone}
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
                    :- {address ? `Nr, ${address.substring(0,50)}` : props.reqCustomer.email}
                  </Text>
                </View>
                
              </View>
            </View>
            <View style={styles.proView}>
              <TouchableNativeFeedback onPress={onCancel}>
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
                    Reject
                  </Text>
                </View>
              </TouchableNativeFeedback>
              {press ? (
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
                        size={19}
                        style={{paddingTop: 5}}
                      />
                      {'  '}
                      Call Now
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              ) : (
                <TouchableNativeFeedback onPress={getDirect}>
                  <View style={styles.btn}>
                    <Text style={{...styles.titleText, fontSize: 15}}>
                      <Icon
                        type="FontAwesome"
                        name="check-square-o"
                        color="#FFFFFF"
                        size={16}
                      />{' '}
                      Accept
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              )}
            </View>
          </ScrollView>
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
    padding: 5,
    fontSize: 12,
    fontFamily: 'ebrima',
    color: '#FFFFFF',
  },
  proView: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  smView: {
    width: '35%',
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  info: {
    width: '60%',
    padding: 3,
  },
  titles: {
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
    elevation: 2,
  },
});
export default ModalView;