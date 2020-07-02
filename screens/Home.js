import React, {useState, Fragment} from 'react';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  StatusBar,
  Text,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import {useSelector} from 'react-redux';

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
              onPress={() => props.navigation.toggleDrawer()}
            />
          </View>
        </View>
      );
    },
  });
  const loading = useSelector(state => state.register.loading);
  const user = useSelector(state => state.register.user);
  return (
    <View style={styles.screen}>
      {loading ? (
        <Fragment>
          <StatusBar backgroundColor="#2257A9" barStyle="light-content" />
          <ActivityIndicator size="large" color="#87A5D3" />
        </Fragment>
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
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
          <TouchableNativeFeedback>
            <View style={styles.selectOptions}>
              <Text
                style={{
                  color: '#FFFFFF',
                  marginRight: 7,
                  fontSize: 18,
                  fontFamily: 'ebrima',
                  fontWeight: '900',
                }}>
                Choose service
              </Text>
              <Icon
                type="Ionicons"
                name="ios-arrow-dropdown"
                size={20}
                color="#FFFFFF"
                onPress={() => props.navigation.toggleDrawer()}
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      )}
    </View>
    // <View style={styles.screen}>
    //   <StatusBar backgroundColor="#2257A9" barStyle="light-content" />
    //   <View style={styles.mapArea}>
    //     <MapView
    //       style={styles.map}
    //       initialRegion={{
    //         latitude: 37.78825,
    //         longitude: -122.4324,
    //         latitudeDelta: 0.0922,
    //         longitudeDelta: 0.0421,
    //       }}
    //     />
    //   </View>
    //   <TouchableNativeFeedback>
    //     <View style={styles.selectOptions}>
    //       <Text
    //         style={{
    //           color: '#FFFFFF',
    //           marginRight: 7,
    //           fontSize: 18,
    //           fontFamily: 'ebrima',
    //           fontWeight: '900',
    //         }}>
    //         Choose service
    //       </Text>
    //       <Icon
    //         type="Ionicons"
    //         name="ios-arrow-dropdown"
    //         size={20}
    //         color="#FFFFFF"
    //         onPress={() => props.navigation.toggleDrawer()}
    //       />
    //     </View>
    //   </TouchableNativeFeedback>
    // </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
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
    width: '90%',
    backgroundColor: '#326ECC',
    height: '8%',
    zIndex: 1,
    marginVertical: 30,
    borderRadius: 10,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default Home;
