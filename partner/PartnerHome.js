import React, {useState, useEffect, Fragment} from 'react';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  StatusBar,
  Dimensions,
  Text,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icooon from 'react-native-vector-icons/MaterialIcons';
import Icoooon from 'react-native-vector-icons/Fontisto';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Circle, Marker, Polyline} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {getPartner, partnerId, updateStatus} from '../store/actions/user';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {DeviceToken, updatePartnerLocation} from '../store/actions/auth';
import PushNotification from 'react-native-push-notification';
import ModalView from './ModalView';

const PartnerHome = props => {
  //----------------------------------------------Navigation Setups----------------------------------------
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    dispatch(updateStatus(userid, isEnabled));
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
              <Text style={{color: '#21618C', fontWeight: '900'}}>
                {' '}
                {isEnabled ? 'Active' : 'Offline'}{' '}
              </Text>
              <Switch
                trackColor={{false: '#767577', true: '#D6DBDF'}}
                thumbColor={isEnabled ? '#2ECC71' : '#f4f3f4'}
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
  const userid = useSelector(state => state.register.user.localId);
  const [open, setopen] = useState(false);
  const [reqcustomer, setreqcustomer] = useState({});

  useEffect(() => {
    dispatch(getPartner(userid));
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
  const LATITUDE = 33.68439;
  const LONGITUDE = 73.047554;

  const [mapstate, setmapstate] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
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

  const myGeo = () => {
    Geolocation.getCurrentPosition(
      position => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      userid &&  dispatch(updatePartnerLocation(userid, location));
        setmapstate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        })
          .then(data => {
            myGeo();
          })
          .catch(err => {});
      },
      {enableHighAccuracy: true, timeout: 200000},
    );
  };

  useEffect(() => {
    myGeo();
    dispatch(partnerId(userid));
    const watchId = Geolocation.watchPosition(
      position => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      userid &&  dispatch(updatePartnerLocation(userid, location));
        setmapstate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 200000},
    );

    return () => {
      if (watchId) {
        Geolocation.clearWatch(watchId);
      }
    };
    
  }, []);
  //---------------------------------------------------------------Device Token

  PushNotification.configure({
    onRegister: function(token) {
      // console.log('Seller TOKEN:', token);
      dispatch(DeviceToken(userid, token));
    },
    onNotification: function(notification) {
      // console.log('Sello NOTIFICATION:', notification);
      setreqcustomer(notification.data);
      setopen(true);
    },

    onAction: function(notification) {
      console.log('ACTION:', notification.action);

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

  //------mapref
  let mapref;
  const currentLocation = () => {
    mapref.fitToCoordinates([mapstate], {animated: true});
  };
  const [poli, setpoli] = useState(false);
  const onMapChange = () => {
    mapref.fitToSuppliedMarkers(['data'], {
      animated: true,
      edgePadding: {
        top: 50,
        right: 50,
        bottom: Dimensions.get('window').height / 1.5,
        left: 50,
      },
    });
    setpoli(true);
  };

  //------------------Customer Profile || Model View
  const data = useSelector(state => state.user.requestcustomer);
  const [found, setfound] = useState(false);
  const [custLocation, setcustLocation] = useState({
    latitude: 33.643011,
    longitude: 73.040394,
  });
  // const data = props.route.params;
  const locationArray = [
    {
      latitude: mapstate.latitude,
      longitude: mapstate.longitude,
    },
    {
      latitude: custLocation.latitude,
      longitude: custLocation.longitude,
    },
  ];

  useEffect(() => {
    if (data.email) {
      setopen(true);
      setreqcustomer(data);
      setcustLocation({
        latitude: data.location.latitude,
        longitude: data.location.longitude,
      });
      setfound(true);
    }
  }, [data]);
  //---------------------------------------------------------------Return Section
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="#2257A9" barStyle="light-content" />

      <View style={styles.mapArea}>
        {mapstate.latitude !== null && (
          <MapView
            ref={ref => {
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
            {found
              ? locationArray.map(item => (
                  <Fragment key={item.latitude}>
                    {poli ? (
                      <Polyline
                        coordinates={locationArray}
                        strokeWidth={5}
                        strokeColor="#498DF6"
                        fillColor="rgba(255,0,0,0.5)"
                        lineDashPattern={[5]}
                      />
                    ) : null}

                    <Marker
                      coordinate={item}
                      identifier={'data'}
                      pinColor="#498DF6"
                      opacity={0.9}
                    />
                  </Fragment>
                ))
              : null}
          </MapView>
        )}
      </View>

      <View style={styles.custom}>
        <TouchableNativeFeedback onPress={mapTypeHandle}>
          <View style={styles.custombtn}>
            <Icoooon type="Fontisto" name="earth" color="#2257A9" size={16} />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={currentLocation}>
          <View style={styles.custombtn}>
            <Icooon
              type="MaterialIcons"
              name="my-location"
              color="#2257A9"
              size={20}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
      {found ? (
        <TouchableNativeFeedback onPress={() => setopen(true)}>
          <View style={styles.selectOptions}>
            <Text style={styles.chooseBtn}> Open Profile </Text>
            <Icon
              type="Ionicons"
              name="ios-arrow-up"
              size={25}
              color="#FFFFFF"
            />
          </View>
        </TouchableNativeFeedback>
      ) : (
        <TouchableNativeFeedback
          onPress={() => props.navigation.navigate('Notifications')}>
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
      )}

      <ModalView
        job={open}
        closeProfile={() => setopen(false)}
        reqCustomer={reqcustomer}
        getDirection={onMapChange}
        closeDirect={() => setfound(false)}
        currentlocation={currentLocation}
        poli={() => setpoli(false)}
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
    width: 35,
    marginLeft: 'auto',
    marginRight: 15,
    marginBottom: 15,
  },
  custombtn: {
    width: '100%',
    height: 35,
    backgroundColor: '#fff',
    elevation: 3,
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectOptions: {
    width: '96%',
    backgroundColor: '#326ECC',
    height: '9%',
    zIndex: 1,
    marginBottom: 8,
    marginTop: 1,
    borderRadius: 10,
    elevation: 1,
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
