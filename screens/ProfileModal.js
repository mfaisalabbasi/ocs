import React from 'react';
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  Text,
  Modal,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icoon from 'react-native-vector-icons/FontAwesome';

const ProfileModal = props => {
  return (
    <Modal
      transparent={true}
      visible={props.openprofile}
      onRequestClose={props.setopenprofile}
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
            showsVerticalScrollIndicator={false}
          />
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
    height: Dimensions.get('window').height / 2.2,
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
});

export default ProfileModal;
