import React, {useState} from 'react';
import {StyleSheet, View, TouchableNativeFeedback, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';

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
              color="#3680F3"
              size={22}
              onPress={() => props.navigation.toggleDrawer()}
            />
          </View>
        </View>
      );
    },
  });
  return (
    <View style={styles.screen}>
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
    width: '90%',
    backgroundColor: '#3680F3',
    height: '8%',
    zIndex: 1,
    marginVertical: 30,
    borderRadius: 10,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default Home;
