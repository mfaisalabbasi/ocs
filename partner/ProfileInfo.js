import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  Text,
  Modal,
  Dimensions,
  Image,
  Linking,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geocoder from 'react-native-geocoding';

const ProfileInfo = (props) => {
  const callNow = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = `telprompt:${props.info.phone}`;
    } else {
      number = `tel:${props.info.phone}`;
    }
    Linking.openURL(number);
  };

  const [address, setaddress] = useState();
  Geocoder.init('AIzaSyClqm-gEevCnkyiD45oWeFibRZ8VbmIHDc');
  useEffect(() => {
    const fetchNearby = async () => {
      const rever =
        props.info &&
        (await Geocoder.from({
          latitude: props.info && props.info.location.latitude,
          longitude: props.info && props.info.location.longitude,
        }));

      setaddress(rever && rever.results && rever.results[0].formatted_address);
    };
    fetchNearby();
  }, [props.info]);

  const goBackFunc = () => {
    props.setopenprofileinfo();
    props.current();
  };
  return (
    <Modal
      transparent={true}
      visible={props.openprofileinfo}
      onRequestClose={props.setopenprofileinfo}
      animationType="slide">
      <View style={styles.modelContainer}>
        <View style={styles.model}>
          <Image
            source={
              props.info && props.info.profileUrl
                ? {uri: props.info.profileUrl}
                : require('../assets/images/person.jpg')
            }
            style={styles.img}
          />
          <Text style={styles.cong}>{props.info && props.info.name}</Text>
          <View style={styles.card}>
            <View
              style={{
                height: 40,
                width: '48%',
                marginRight: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.contact}>
                {' '}
                <Icon
                  type="FontAwesome"
                  name="phone"
                  color="#0051A2"
                  size={15}
                />
                {' :- '}
                {props.info && props.info.phone}
              </Text>
            </View>
            <View
              style={{
                height: 40,
                width: '48%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.contact}>Status :- Good</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.hd}>
              <Text
                style={{
                  color: '#2471A3',
                  fontSize: 15,
                  color: '#0051A2',
                  fontWeight: '900',
                }}>
                Location :-
              </Text>
              {address ? address.substring(0, 300) : 'customer location'}
            </Text>
          </View>
          <View
            style={{
              ...styles.card,
              borderBottomWidth: 0,
              justifyContent: 'space-between',
            }}>
            <TouchableNativeFeedback onPress={goBackFunc}>
              <View
                style={{
                  ...styles.btn,
                  backgroundColor: '#5DADE2',
                }}>
                <Text style={styles.btnTxt}>Go Back</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback onPress={callNow}>
              <View
                style={{
                  ...styles.btn,
                  backgroundColor: '#28B463',
                }}>
                <Text style={styles.btnTxt}>
                  Call Now{' '}
                  <Icon
                    type="FontAwesome"
                    name="phone"
                    color="#ffffff"
                    size={15}
                  />
                </Text>
              </View>
            </TouchableNativeFeedback>
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
    height: Dimensions.get('window').height / 2.2,
    width: '96%',
    borderRadius: 15,
    elevation: 10,
    overflow: 'visible',
    marginBottom: 10,
    alignItems: 'center',
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginTop: -30,
  },
  cong: {
    marginVertical: 3,
    fontSize: 12,
    fontFamily: 'ebrima',
    color: '#566573',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '95%',
    marginBottom: 10,
    marginHorizontal: 1,
    borderRadius: 2,
    alignItems: 'center',
    overflow: 'hidden',
    overflow: 'hidden',
    borderBottomColor: '#808B96',
    borderBottomWidth: 0.5,
    padding: 5,
  },
  hd: {fontSize: 11, fontFamily: 'ebrima', color: 'gray', textAlign: 'center'},
  contact: {fontFamily: 'ebrima', color: '#0051A2'},
  btnTxt: {
    fontFamily: 'ebrima',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  //------------------------
  btn: {
    width: '49%',
    backgroundColor: '#F2C229',
    height: 38,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    marginBottom: 6,
  },
});

export default ProfileInfo;
