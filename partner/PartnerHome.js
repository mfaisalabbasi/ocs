import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  StatusBar,
  Text,
  Switch,
  PermissionsAndroid,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icooon from 'react-native-vector-icons/MaterialIcons';
import Icoooon from 'react-native-vector-icons/Fontisto';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {getPartner, partnerId, updateStatus} from '../store/actions/user';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {DeviceToken, updatePartnerLocation} from '../store/actions/auth';
import RegisterModal from './RegisterModal';
import messaging from '@react-native-firebase/messaging';
import ProfileInfo from './ProfileInfo';

const PartnerHome = (props) => {
  //----------------------------------------------Navigation Setups----------------------------------------
  const [isEnabled, setIsEnabled] = useState(true);
  const userid = useSelector((state) => state.otp.user.uid);
  const user = useSelector((state) => state.user.user);
  const service = useSelector((state) => state.otpredu.user.service);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    userid &&
      user &&
      user.phone &&
      dispatch(updateStatus(userid, isEnabled, service));
    props.navigation.setOptions({
      headerShown: true,
      headerTitle: '',
      headerTransparent: true,
      headerLeft: () => {
        return (
          <View style={styles.header}>
            <Icon
              type="Ionicons"
              name="ios-menu"
              color="#333333"
              size={33}
              onPress={() => props.navigation.toggleDrawer()}
            />
          </View>
        );
      },
      headerRight: () => {
        return (
          <View style={styles.header}>
            <View style={{...styles.icon, width: 'auto', flexDirection: 'row'}}>
              <Text style={{color: '#0080FE', fontWeight: '900'}}>
                {' '}
                {isEnabled ? 'Active' : 'Offline'}{' '}
              </Text>
              <Switch
                trackColor={{false: '#767577', true: '#D6DBDF'}}
                thumbColor={isEnabled ? '#0398FA' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
        );
      },
    });
  }, [isEnabled]);

  //----------------------------------------------Getting User----------------------------------------
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPartner(userid, service));
  }, []);

  //---------------------------------------------Handling custom , select and states -----------------

  const [mapbtn, setmapbtn] = useState({
    open: false,
  });

  const mapTypeHandle = () => {
    setmapbtn({
      open: !mapbtn.open,
    });
  };

  //--------------------------------------------------------------- Handling Map ---------------------
  const LATITUDE_DELTA = 0.009;
  const LONGITUDE_DELTA = 0.009;

  const [mapstate, setmapstate] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    error: null,
  });

  const getMapRegion = () => ({
    latitude: mapstate.latitude,
    longitude: mapstate.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const mapReady = () => {
    mapref.fitToSuppliedMarkers(['data'], {
      animated: true,
      edgePadding: {
        top: 80,
        bottom: Dimensions.get('screen').height / 0.9,
        right: 0,
        left: 0,
      },
    });
  };

  const myGeo = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          userid &&
            user &&
            user.phone &&
            dispatch(updatePartnerLocation(userid, location, service));
          setmapstate({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
          })
            .then((data) => {
              myGeo();
            })
            .catch((err) => {});
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 100000},
      );
    } else {
      console.log('location Debied');
    }
  };

  //---------------------------------------------------------------Handling Notification
  const [tnx, settnx] = useState(false);

  useEffect(() => {
    myGeo();
    messaging()
      .getToken()
      .then((token) => {
        return (
          userid &&
          user &&
          user.phone &&
          dispatch(DeviceToken(userid, token, service))
        );
      });

    return messaging().onTokenRefresh((token) => {
      userid &&
        user &&
        user.phone &&
        dispatch(DeviceToken(userid, token, service));
    });
  }, [props, tnx]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {});
    return unsubscribe;
  }, []);

  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      props.navigation.navigate(remoteMessage.data.route);
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          props.navigation.navigate(remoteMessage.data.route);
        }
      });
  }, []);

  //------mapref
  let mapref;
  const currentLocation = () => {
    mapref.fitToCoordinates([mapstate], {animated: true});
  };

  //-----------------------------------------Profile Info
  const [openprofileinfo, setopenprofileinfo] = useState(false);
  const [singleMarker, setsingleMarker] = useState(false);
  useEffect(() => {
    props.route.params && setopenprofileinfo(true);
    props.route.params &&
      props.route.params.customer &&
      props.route.params.customer.location &&
      setsingleMarker(true);
  }, [props]);

  //----------------------Registration Form

  const [newUser, setnewUser] = useState(false);

  const checkNotification = () => {
    if (!user.phone) {
      setnewUser(true);
    } else {
      props.navigation.navigate('Notifications');
      setnewUser(false);
    }
  };

  //---------------------------------------------------------------Return Section
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="#0080FE" barStyle="light-content" />
      <View style={styles.mapArea}>
        {mapstate.latitude !== null && (
          <MapView
            ref={(ref) => {
              mapref = ref;
            }}
            maxZoomLevel={18}
            loadingEnabled={true}
            loadingIndicatorColor="#326ECC"
            style={styles.map}
            initialRegion={getMapRegion()}
            region={getMapRegion()}
            showsUserLocation={true}
            showsMyLocationButton={false}
            showsCompass={false}
            mapType={mapbtn.open ? 'satellite' : 'standard'}>
            {singleMarker ? (
              <Marker
                key={props.route.params.customer.phone}
                identifier={'data'}
                coordinate={{
                  latitude: props.route.params.customer.location.latitude,
                  longitude: props.route.params.customer.location.longitude,
                }}>
                <Image
                  key={props.route.params.latitude}
                  onLoad={mapReady}
                  source={require('../assets/images/avatar.png')}
                  style={{
                    flex: 1,
                    width: 25,
                    height: 25,
                    resizeMode: 'cover',
                    aspectRatio: 1,
                    borderRadius: 100,
                  }}
                />
              </Marker>
            ) : null}
          </MapView>
        )}
      </View>
      <View style={styles.custom}>
        <TouchableNativeFeedback onPress={mapTypeHandle}>
          <View style={styles.custombtn}>
            <Icoooon type="Fontisto" name="earth" color="#2257A9" size={15} />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={currentLocation}>
          <View style={styles.custombtn}>
            <Icooon
              type="MaterialIcons"
              name="my-location"
              color="#2257A9"
              size={18}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
      <TouchableNativeFeedback onPress={checkNotification}>
        <View style={styles.selectOptions}>
          <Text style={styles.chooseBtn}> Check Job Requests</Text>
          <Icooon
            type="MaterialIcons"
            name="find-in-page"
            size={23}
            color="#FFFFFF"
          />
        </View>
      </TouchableNativeFeedback>

      <ProfileInfo
        openprofileinfo={openprofileinfo}
        setopenprofileinfo={() => {
          setopenprofileinfo(false);
          setsingleMarker(false);
        }}
        info={props.route.params && props.route.params.customer}
        current={currentLocation}
      />
      <RegisterModal
        new={newUser}
        closing={() => setnewUser(false)}
        tnx={tnx}
        closetnx={() => settnx(false)}
        opentnx={() => settnx(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  header: {
    marginHorizontal: 15,
  },
  icon: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 3,
    paddingHorizontal: 3,
  },
  mapArea: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  custom: {
    width: 25,
    marginLeft: 'auto',
    marginRight: 10,
    marginBottom: 5,
  },
  custombtn: {
    width: '100%',
    height: 25,
    backgroundColor: '#fff',
    elevation: 3,
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectOptions: {
    width: '70%',
    backgroundColor: '#0398FA',
    height: '7.1%',
    zIndex: 1,
    marginBottom: 30,
    borderRadius: 50,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  chooseBtn: {
    color: '#FFFFFF',
    marginRight: 3,
    fontSize: 16,
    fontFamily: 'ebrima',
    fontWeight: '900',
  },
});
export default PartnerHome;
