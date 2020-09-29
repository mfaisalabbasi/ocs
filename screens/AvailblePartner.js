import React, {Fragment, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  Text,
  Modal,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
  Linking,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icoon from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {orderByDistance} from 'geolib';
import {FlatList} from 'react-native-gesture-handler';

const AvailblePartner = props => {
  const nearby = orderByDistance(props.mypoint, props.sellers);
  const dispatch = useDispatch();
  console.log('my nearby ', nearby);

  const MyCard = props => {
    return (
      <TouchableNativeFeedback>
        <View style={styles.card}>
          <View style={styles.img}>
            <Image
              source={
                props.dta.profileUrl
                  ? {uri: props.dta.profileUrl}
                  : require('../assets/images/profile.png')
              }
              style={styles.image}
            />
          </View>
          <View style={styles.address}>
            <Text style={styles.name}>{props.dta.name}</Text>
            <Text style={styles.txt}>
              khyaban e sir syed Rwp secter 4/B Muhammadi Chowk
            </Text>
          </View>
          <View style={styles.onBtn}>
            <Text>
              <Icon size={20} name="dot-circle-o" color="#2ECC71" />
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  };
  return (
    <Modal
      transparent={true}
      visible={props.openprofile}
      onRequestClose={props.setopenprofile}
      animationType="slide">
      <View style={styles.modelContainer}>
        <View style={styles.model}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Nearby Available Partners</Text>
          </View>
          <FlatList
            data={nearby}
            renderItem={itemdata => <MyCard dta={itemdata.item} />}
            keyExtractor={(item, index) => 'key' + index}
          />
          {/* <ScrollView
            contentContainerStyle={{
              width: Dimensions.get('window').width,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            showsVerticalScrollIndicator={false}>
            <MyCard />
          </ScrollView> */}
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
    backgroundColor: '#F8F9F9',
    height: Dimensions.get('window').height / 1.2,
    width: Dimensions.get('window').width,
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleView: {
    width: '100%',
    backgroundColor: '#2257A9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginBottom: 5,
  },
  titleText: {
    padding: 2,
    fontSize: 14,
    fontFamily: 'ebrima',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  card: {
    width: '97%',
    height: 65,
    backgroundColor: '#FFFFFF',
    marginTop: 5,
    borderRadius: 12,
    elevation: 1,
    marginBottom: 5,
    flexDirection: 'row',
    overflow: 'hidden',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  img: {
    width: '23%',
    height: '100%',
    padding: 2,
    overflow: 'hidden',
    backgroundColor: '#F2F4F4',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 50,
  },
  address: {
    width: '70%',
    height: '100%',
    padding: 3,
  },
  name: {
    paddingLeft: 3,
    fontWeight: '900',
    color: '#0A7DC9',
  },
  txt: {
    paddingLeft: 3,
    color: 'gray',
    fontSize: 10,
  },
  onBtn: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '7%',
  },
});

export default AvailblePartner;
