import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  Text,
  Modal,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icoon from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import {nullSeller} from '../store/actions/user';

const ProfileModal = props => {
  const dispatch = useDispatch();
  const cancelFunc = () => {
    props.setopenprofile();
    props.curloc();
    props.stfond(false);
    props.setsrvc('Choose');
    dispatch(nullSeller());
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
            <Text style={styles.titleText}>
              Electration is 10km away from you.
            </Text>
          </View>
          <ScrollView
            contentContainerStyle={{
              width: Dimensions.get('window').width,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            showsVerticalScrollIndicator={false}>
            <View style={styles.proView}>
              <View style={styles.smView}>
                <Image
                  source={require('../assets/images/profile.jpg')}
                  style={{
                    width: '100%',
                    height: 100,
                    resizeMode: 'cover',
                    borderRadius: 200,
                  }}
                />
                <Text style={styles.infoText}>
                  <Icoon type="Entypo" name="star" color="#0340A0" size={18} />
                  <Icoon type="Entypo" name="star" color="#0340A0" size={18} />
                  <Icoon type="Entypo" name="star" color="#0340A0" size={18} />
                </Text>
              </View>
              <View style={styles.info}>
                <View style={styles.titles}>
                  <Text style={styles.infoText}>
                    <Icon
                      type="FontAwesome"
                      name="user-circle-o"
                      color="#0340A0"
                      size={18}
                    />{' '}
                    :- {props.user.name}
                  </Text>
                </View>
                <View style={styles.titles}>
                  <Text style={styles.infoText}>
                    <Icoon
                      type="Entypo"
                      name="email"
                      color="#0340A0"
                      size={18}
                    />{' '}
                    :- {props.user.email}
                  </Text>
                </View>
                <View style={styles.titles}>
                  <Text style={styles.infoText}>
                    <Icoon
                      type="FontAwesome"
                      name="mobile"
                      color="#0340A0"
                      size={18}
                    />{' '}
                    :- {props.user.phone}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.proView}>
              <TouchableNativeFeedback onPress={cancelFunc}>
                <View
                  style={{
                    ...styles.btn,
                    backgroundColor: '#2155A8',
                    marginRight: 5,
                  }}>
                  <Text style={{...styles.titleText, fontSize: 15}}>
                    Cancel
                  </Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback>
                <View style={styles.btn}>
                  <Text style={{...styles.titleText, fontSize: 15}}>
                    Start Contract
                  </Text>
                </View>
              </TouchableNativeFeedback>
            </View>
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
    backgroundColor: '#FFFFFF',
    height: Dimensions.get('window').height / 2.5,
    width: '100%',
    borderTopEndRadius: 15,
    borderTopLeftRadius: 15,
    elevation: 10,
    overflow: 'hidden',
  },
  titleView: {
    width: '100%',
    backgroundColor: '#2257A9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    padding: 5,
    fontSize: 12,
    fontFamily: 'ebrima',
    color: '#FFFFFF',
  },
  proView: {
    width: '100%',
    marginTop: 3,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  smView: {
    width: '40%',
    padding: 5,
    alignItems: 'center',
  },
  info: {
    width: '60%',
    padding: 5,
  },
  titles: {
    marginTop: 5,
    paddingVertical: 5,
    justifyContent: 'center',
  },
  infoText: {
    fontFamily: 'ebrima',
    color: '#0340A0',
    fontWeight: 'bold',
  },
  btn: {
    width: '45%',
    backgroundColor: '#0342A5',
    padding: 5,
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
});

export default ProfileModal;
