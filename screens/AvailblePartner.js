import React from 'react';
import {StyleSheet, View, Text, Modal, Dimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import MyCard from './MyCard';

const AvailblePartner = props => {
  const nearby = useSelector(state => state.user.nearestPartners);

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
            renderItem={itemdata => (
              <MyCard dta={itemdata.item} closeModal={props.setopenprofile} />
            )}
            keyExtractor={(item, index) => 'key' + index}
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
    backgroundColor: '#3498DB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginBottom: 5,
    elevation: 3,
  },
  titleText: {
    padding: 2,
    fontSize: 16,
    fontFamily: 'ebrima',
    color: '#FFFFFF',
    fontWeight: '900',
  },
});

export default AvailblePartner;
