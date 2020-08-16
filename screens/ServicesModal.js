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

const ModalPop = props => {
  const services = ['Mechanics', 'Electration', 'Plumber', 'First Aid'];
  return (
    <Modal
      transparent={true}
      visible={props.visState}
      onRequestClose={props.setvisState}
      animationType="slide">
      <View style={styles.modelContainer}>
        <View style={styles.model}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Select Service for you</Text>
          </View>
          <ScrollView
            contentContainerStyle={{
              width: Dimensions.get('window').width,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            showsVerticalScrollIndicator={false}>
            {services.map((src, index) => (
              <TouchableNativeFeedback
                onPress={() => props.selectFunc(src)}
                key={index}>
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
                      Looking for {src} ? it's just one click away from you now
                      !!!
                    </Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            ))}
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
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
    elevation: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleView: {
    width: '100%',
    backgroundColor: '#2257A9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
  titleText: {
    color: '#FFFFFF',
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

export default ModalPop;
