import React, {useState, useEffect, Fragment} from 'react';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  StatusBar,
  Text,
  Image,
  Dimensions,
  PermissionsAndroid,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icooon from 'react-native-vector-icons/MaterialIcons';
import Icoooon from 'react-native-vector-icons/Fontisto';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {getUser, allSeller} from '../store/actions/user';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import ServicesModal from './ServicesModal';
import RegisterModal from './RegisterModal';
import {updateLocation, CustomerDeviceToken} from '../store/actions/auth';
import ProfileModal from './ProfileModal';
import messaging from '@react-native-firebase/messaging';
import ProfileInfo from './ProfileInfo';

const Home = (props) => {
  //----------------------------------------------Navigation Setups----------------------------------------

  let mymap;
  useEffect(() => {
    props.navigation.setOptions({
      headerShown: true,
      headerTitleStyle: {
        fontWeight: '100',
        fontSize: 18,
      },

      headerTitle: '',
      headerTintColor: '#444649',
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
          <TouchableWithoutFeedback
            onPress={() => props.navigation.navigate('Notifications')}>
            <View style={styles.header}>
              <View style={styles.icon}>
                <View style={styles.badge}>
                  <Text style={{color: 'white', fontSize: 8}}>N+</Text>
                </View>

                <Icon
                  type="Ionicons"
                  name="ios-notifications"
                  color="#0398FA"
                  size={31}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      },
    });
  }, []);

  //----------------------------------------------Getting User----------------------------------------
  const [service, setservice] = useState('Choose');
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.otp.user.uid);
  let sellers = useSelector((state) => state.user.sellers);
  const loading = useSelector((state) => state.user.loading);
  const nearest = useSelector((state) => state.user.nearestUser);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getUser(userid));
  }, [props, user]);

  //---------------------------------------------Handling custom , select and states -----------------

  const [state, setstate] = useState(false);
  const [openprofile, setopenprofile] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const [mapbtn, setmapbtn] = useState({
    open: false,
  });

  const onSelect = (src) => {
    setstate(false);
    setconfirm(true);
    setservice(src);
  };

  const mapTypeHandle = () => {
    setmapbtn({
      open: !mapbtn.open,
    });
  };

  //--------------------------------------------------------------- Handling Map ---------------------
  const [tnx, settnx] = useState(false);

  const LATITUDE_DELTA = 0.009;
  const LONGITUDE_DELTA = 0.009;

  const [mapstate, setmapstate] = useState({
    latitude: null,
    longitude: null,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    accuracy: null,
    error: null,
  });

  const getMapRegion = () => ({
    latitude: mapstate.latitude,
    longitude: mapstate.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const myGeo = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        (position) => {
          userid &&
            user &&
            user.phone &&
            dispatch(updateLocation(userid, position.coords));
          setmapstate({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
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

  useEffect(() => {
    myGeo();
  }, [props, tnx]);

  const currentLocation = () => {
    mymap.fitToCoordinates([mapstate], {animated: true});
  };

  //------------------------------------handle profile

  const handleProfile = () => {
    setopenprofile(true);
  };

  const onConfirm = () => {
    if (!user.phone) {
      setnewUser(true);
    } else {
      dispatch(allSeller(mapstate, service));
      setconfirm(false);
    }
  };

  const mapReady = () => {
    mymap &&
      mymap.fitToSuppliedMarkers(['data'], {
        animated: true,
        edgePadding: {
          top: 90,
          bottom: Dimensions.get('screen').height / 0.9,
          right: 0,
          left: 0,
        },
      });
  };
  //-----------------------------------------Profile Info
  const [openprofileinfo, setopenprofileinfo] = useState(false);
  const [singleMarker, setsingleMarker] = useState(false);
  useEffect(() => {
    props.route.params && setopenprofileinfo(true);
    props.route.params &&
      props.route.params.partner &&
      props.route.params.partner.latitude &&
      setsingleMarker(true);
  }, [props]);
  //----------------------------------------------------------Registration Section
  const [newUser, setnewUser] = useState(false);

  const chooseService = () => {
    setstate(true);
    setnewUser(false);
  };

  //---------------------------------------------------------Handling Notification

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

  useEffect(() => {
    messaging()
      .getToken()
      .then((token) => {
        return (
          userid &&
          user &&
          user.phone &&
          dispatch(CustomerDeviceToken(userid, token))
        );
      });

    return messaging().onTokenRefresh((token) => {
      userid &&
        user &&
        user.phone &&
        dispatch(CustomerDeviceToken(userid, token));
    });
  }, [props, tnx]);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log(remoteMessage);
    });

    return unsubscribe;
  }, [props, myGeo]);
  //---------------------------------------------------------------Return Section
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="#0080FE" barStyle="light-content" />
      {loading ? (
        <View style={styles.indicator}>
          <Image
            source={require('../assets/images/spinner2.gif')}
            style={{width: 50, height: 50}}
          />
          <Text style={styles.indicatorTxt}>
            Looking for {service} service.
          </Text>
        </View>
      ) : (
        <View style={styles.mapArea}>
          {mapstate.latitude !== null && (
            <MapView
              ref={(ref) => {
                mymap = ref;
              }}
              loadingEnabled={true}
              loadingIndicatorColor="#326ECC"
              initialRegion={getMapRegion()}
              style={styles.map}
              showsUserLocation={true}
              showsMyLocationButton={false}
              maxZoomLevel={18}
              showsCompass={false}
              onMapReady={() => mapReady()}
              on
              mapType={mapbtn.open ? 'satellite' : 'standard'}>
              {sellers.slice(0, 4).map((sell) => (
                <Marker
                  key={sell.date}
                  identifier={'data'}
                  coordinate={{
                    latitude: sell.latitude,
                    longitude: sell.longitude,
                  }}>
                  <Image
                    zIndex={sell.date}
                    tracksViewChanges={false}
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
              ))}
              {singleMarker ? (
                <Marker
                  identifier={'data'}
                  coordinate={{
                    latitude: props.route.params.partner.latitude,
                    longitude: props.route.params.partner.longitude,
                  }}>
                  <Image
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
      )}

      <View style={styles.custom}>
        <TouchableNativeFeedback onPress={mapTypeHandle}>
          <View style={styles.custombtn}>
            <Icoooon type="Fontisto" name="earth" color="#0051A2" size={15} />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={currentLocation}>
          <View style={styles.custombtn}>
            <Icooon
              type="MaterialIcons"
              name="my-location"
              color="#0051A2"
              size={18}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
      {sellers.length ? (
        <TouchableNativeFeedback onPress={() => handleProfile(nearest)}>
          <View style={styles.selectOptions}>
            <Text style={styles.chooseBtn}>Open Card</Text>
            <Icon
              type="Ionicons"
              name="ios-arrow-dropdown"
              size={20}
              color="#FFFFFF"
            />
          </View>
        </TouchableNativeFeedback>
      ) : (
        <TouchableNativeFeedback onPress={chooseService}>
          <View style={styles.selectOptions}>
            <Text style={styles.chooseBtn}>{service} service</Text>
            <Icon
              type="Ionicons"
              name="ios-arrow-dropdown"
              size={20}
              color="#FFFFFF"
            />
          </View>
        </TouchableNativeFeedback>
      )}

      {confirm ? (
        <TouchableNativeFeedback onPress={onConfirm}>
          <View
            style={{
              ...styles.selectOptions,
              backgroundColor: '#34495E',
              marginTop: -15,
            }}>
            <Text style={styles.chooseBtn}>Confirm</Text>
            <Icon
              type="Ionicons"
              name="ios-checkbox-outline"
              size={22}
              color="#FFFFFF"
            />
          </View>
        </TouchableNativeFeedback>
      ) : null}
      <ServicesModal
        visState={state}
        setvisState={() => setstate(false)}
        selectFunc={onSelect}
      />
      <ProfileModal
        openprofile={openprofile}
        setopenprofile={() => setopenprofile(false)}
        user={user}
        curloc={currentLocation}
        setsrvc={setservice}
        stprofile={() => setopenprofile(true)}
        sellers={sellers}
        service={service}
        localId={userid}
      />
      <ProfileInfo
        openprofileinfo={openprofileinfo}
        setopenprofileinfo={() => {
          setopenprofileinfo(false);
          setsingleMarker(false);
        }}
        info={props.route.params && props.route.params.partner}
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
    width: 40,
    alignItems: 'center',
    borderRadius: 25,
    padding: 3,
    position: 'relative',
    overflow: 'visible',
  },
  badge: {
    color: '#fff',
    position: 'absolute',
    zIndex: 10,
    top: 1,
    right: 1,
    padding: 1,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 10,
    width: 15,
    height: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
  },
  mapArea: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
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
    marginRight: 7,
    fontSize: 15,
    fontFamily: 'ebrima',
    fontWeight: '900',
  },
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginTop: '40%',
  },
  indicatorTxt: {
    color: '#2257A9',
    fontFamily: 'ebrima',
    marginTop: 5,
    fontSize: 12,
  },
});
export default Home;
