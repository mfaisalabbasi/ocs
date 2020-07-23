import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icooon from 'react-native-vector-icons/MaterialIcons';
import Icoooon from 'react-native-vector-icons/Fontisto';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {getPartner} from '../store/actions/user';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {updatePartnerLocation} from '../store/actions/auth';

const PartnerHome = props => {
  //----------------------------------------------Navigation Setups----------------------------------------

  props.navigation.setOptions({
    headerShown: true,
    headerTitleStyle: {
      fontWeight: '100',
      fontSize: 18,
    },

    headerTitle: 'Select service',
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
  const dispatch = useDispatch();
  const userid = useSelector(state => state.register.user.localId);
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
  const LATITUDE = 18.7934829;
  const LONGITUDE = 98.9867401;

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
        dispatch(updatePartnerLocation(userid, location));
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
      {enableHighAccuracy: true, timeout: 200000, maximumAge: 1000},
    );
  };

  useEffect(() => {
    myGeo();
  }, []);

  //---------------------------------------------------------------Return Section
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="#2257A9" barStyle="light-content" />

      <View style={styles.mapArea}>
        {mapstate.latitude !== null && (
          <MapView
            style={styles.map}
            region={getMapRegion()}
            showsUserLocation={true}
            mapType={mapbtn.open ? 'satellite' : 'standard'}
          />
        )}
      </View>

      <View style={styles.custom}>
        <TouchableNativeFeedback onPress={mapTypeHandle}>
          <View style={styles.custombtn}>
            <Icoooon type="Fontisto" name="earth" color="#2257A9" size={16} />
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={myGeo}>
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
    width: '95%',
    backgroundColor: '#326ECC',
    height: '8.5%',
    zIndex: 1,
    marginVertical: 10,
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
export default PartnerHome;
