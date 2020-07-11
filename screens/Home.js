import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  StatusBar,
  Text,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icoon from 'react-native-vector-icons/FontAwesome';

import MapView from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../store/actions/user';

const Home = props => {
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

  const dispatch = useDispatch();
  const userid = useSelector(state => state.register.user.localId);
  useEffect(() => {
    dispatch(getUser(userid));
  }, []);

  // handing on select
  const services = ['Mechanics', 'Electration', 'Plumber', 'First Aid'];

  const [state, setstate] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const [service, setservice] = useState('Choose');

  const onSelect = src => {
    setstate(false);
    setconfirm(true);
    setservice(src);
  };

  const option = services.map((src, index) => (
    <TouchableNativeFeedback onPress={() => onSelect(src)} key={index}>
      <View style={styles.item}>
        <View style={styles.icon2}>
          <Icoon
            type="FontAwesome"
            name="user-circle-o"
            color="#2257A9"
            size={22}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.titTxt}>{src}</Text>
          <Text style={styles.smTxt}>
            Looking for {src} ? it's just one click away from you now !!!
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  ));
  return (
    <View style={styles.screen}>
      <StatusBar backgroundColor="#2257A9" barStyle="light-content" />
      <View style={styles.mapArea}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
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
      {confirm ? (
        <TouchableNativeFeedback
          onPress={() => alert(`Checking ${service} for you`)}>
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

      <Modal
        transparent={true}
        visible={state}
        onRequestClose={() => setstate(false)}
        animationType="slide">
        <View style={styles.modelContainer}>
          <View style={styles.model}>
            <Text style={styles.titleText}>Select Service for you</Text>
            <ScrollView
              contentContainerStyle={{
                width: Dimensions.get('window').width,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              showsVerticalScrollIndicator={false}>
              {option}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  modelContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  model: {
    backgroundColor: '#FFFFFF',
    height: 250,
    width: '100%',
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
    elevation: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    padding: 10,
    fontSize: 15,
    fontFamily: 'ebrima',
  },
  item: {
    width: '90%',
    height: 65,
    borderWidth: 0.25,
    borderRadius: 10,
    marginTop: 7,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'lightgray',
    flexDirection: 'row',
  },
  icon2: {
    width: '20%',
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
  },
  titTxt: {
    fontFamily: 'ebrima',
    fontWeight: 'bold',
    color: '#2257A9',
  },
  smTxt: {
    fontFamily: 'ebrima',
    fontSize: 10,
    padding: 1,
    color: 'gray',
  },
});
export default Home;
