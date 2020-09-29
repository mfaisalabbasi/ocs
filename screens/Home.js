import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  StatusBar,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icooon from 'react-native-vector-icons/MaterialIcons';
import Icoooon from 'react-native-vector-icons/Fontisto';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, Callout} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {getUser, allSeller} from '../store/actions/user';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import ServicesModal from './ServicesModal';
import {updateLocation} from '../store/actions/auth';
import ProfileModal from './ProfileModal';
import HaversineGeolocation from 'haversine-geolocation';

const Home = props => {
  //----------------------------------------------Navigation Setups----------------------------------------

  let mymap;
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
        <View style={styles.header}>
          <View style={styles.icon}>
            <Icon
              type="Ionicons"
              name="ios-notifications-outline"
              color="#2257A9"
              size={22}
              onPress={() => props.navigation.navigate('Notifications')}
            />
          </View>
        </View>
      );
    },
  });

  //----------------------------------------------Getting User----------------------------------------
  const [service, setservice] = useState('Choose');
  const dispatch = useDispatch();
  const userid = useSelector(state => state.register.user.localId);
  const customer = useSelector(state => state.user.user);
  let sellers = useSelector(state => state.user.sellers);
  const loading = useSelector(state => state.user.loading);
  useEffect(() => {
    dispatch(getUser(userid));
  }, []);

  //---------------------------------------------Handling custom , select and states -----------------

  const [state, setstate] = useState(false);
  const [openprofile, setopenprofile] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const [mapbtn, setmapbtn] = useState({
    open: false,
  });

  const onSelect = src => {
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
  const LATITUDE_DELTA = 0.009;
  const LONGITUDE_DELTA = 0.009;
  // const LATITUDE = 33.68439;
  // const LONGITUDE = 73.047554;

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

  const myGeo = () => {
    Geolocation.getCurrentPosition(
      position => {
        dispatch(updateLocation(userid, position.coords));
        setmapstate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
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
  }, []);

  const currentLocation = () => {
    mymap.fitToCoordinates([mapstate], {animated: true});
  };

  //------------------------------------handle profile

  const handleProfile = () => {
    setopenprofile(true);
  };

  const currentPoint = {
    latitude: mapstate.latitude,
    longitude: mapstate.longitude,
    accuracy: mapstate.accuracy,
  };
  let data = HaversineGeolocation.getClosestPosition(
    currentPoint,
    sellers,
    'mi',
  );

  const onConfirm = () => {
    dispatch(allSeller(service));
    setconfirm(false);
    if (!loading) {
      setTimeout(() => setopenprofile(true), 3000);
    }
  };

  //---------------------------------------------------------------Return Section
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="#2257A9" barStyle="light-content" />
      {loading ? (
        <View style={styles.indicator}>
          <ActivityIndicator size="small" color="#2257A9" />
          <Text style={styles.indicatorTxt}>
            Looking for {service} service.
          </Text>
        </View>
      ) : (
        <View style={styles.mapArea}>
          {mapstate.latitude !== null && (
            <MapView
              ref={ref => {
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
              onMapReady={() =>
                mymap.fitToSuppliedMarkers(['data'], {animated: true})
              }
              on
              mapType={mapbtn.open ? 'satellite' : 'standard'}>
              {sellers.map((seller, index) => (
                <Marker
                  coordinate={data}
                  key={index}
                  identifier={'data'}
                  onPress={() => handleProfile(data)}>
                  <Image
                    source={require('../assets/images/avatar.png')}
                    style={{width: 30, height: 30}}
                  />
                </Marker>
              ))}
            </MapView>
          )}
        </View>
      )}

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
      {data.email ? (
        <TouchableNativeFeedback onPress={() => handleProfile(data)}>
          <View style={styles.selectOptions}>
            <Text style={styles.chooseBtn}>Open Profile</Text>
            <Icon
              type="Ionicons"
              name="ios-arrow-dropdown"
              size={20}
              color="#FFFFFF"
            />
          </View>
        </TouchableNativeFeedback>
      ) : (
        <TouchableNativeFeedback onPress={() => setstate(true)}>
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
              backgroundColor: '#333333',
              marginVertical: 3,
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
        user={data}
        curloc={currentLocation}
        setsrvc={setservice}
        customer={customer}
        localId={userid}
        sellers={sellers}
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
    width: 30,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 3,
    elevation: 5,
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
    height: '8.5%',
    zIndex: 1,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  chooseBtn: {
    color: '#FFFFFF',
    marginRight: 7,
    fontSize: 16,
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
