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

const AvailblePartner = props => {
  const dispatch = useDispatch();
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
          <ScrollView
            contentContainerStyle={{
              width: Dimensions.get('window').width,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            showsVerticalScrollIndicator={false}>
            <TouchableNativeFeedback>
              <View
                style={{
                  width: '95%',
                  height: 65,
                  backgroundColor: '#FFFFFF',
                  marginTop: 5,
                  borderRadius: 5,
                  elevation: 1.2,
                  marginBottom: 5,
                  flexDirection: 'row',
                  overflow: 'hidden',
                }}>
                <View
                  style={{
                    width: '30%',
                    height: '100%',
                    backgroundColor: 'lightblue',
                  }}
                />
                <View
                  style={{
                    width: '70%',
                    height: '100%',
                    backgroundColor: 'lightyellow',
                  }}
                />
              </View>
            </TouchableNativeFeedback>
          </ScrollView>
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
    width: '100%',
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
    overflow: 'hidden',
  },
  titleView: {
    width: '100%',
    backgroundColor: '#2257A9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleText: {
    padding: 3,
    fontSize: 12,
    fontFamily: 'ebrima',
    color: '#FFFFFF',
  },
  proView: {
    width: '100%',
    marginTop: 2,
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  smView: {
    width: '40%',
    padding: 3,
    alignItems: 'center',
  },
  info: {
    width: '60%',
    padding: 3,
  },
  titles: {
    marginTop: 3,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  infoText: {
    fontFamily: 'ebrima',
    color: '#0340A0',
    fontWeight: '500',
  },
  btn: {
    width: '50%',
    backgroundColor: '#0342A5',
    padding: 5,
    height: 37,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
});

export default AvailblePartner;
