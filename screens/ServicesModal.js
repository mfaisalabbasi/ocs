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
  const services = [
    {
      name: 'Mechanics',
      color: 'blue',
      icon: 'gears',
    },
    {
      name: 'Electration',
      color: '#E67E22',
      icon: 'lightbulb-o',
    },
    {
      name: 'Plumber',
      color: '#B401A7',
      icon: 'wrench',
    },
    {
      name: 'First Aid',
      color: 'red',
      icon: 'heartbeat',
    },
    {
      name: 'Carpenter',
      color: 'green',
      icon: 'tree',
    },
    {
      name: 'Saloon',
      color: '#321C31',
      icon: 'cut',
    },
  ];
  return (
    <Modal
      transparent={true}
      visible={props.visState}
      onRequestClose={props.setvisState}
      animationType="slide">
      <View style={styles.modelContainer}>
        <View style={styles.model}>
          <ScrollView
            contentContainerStyle={{
              width: Dimensions.get('window').width,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
            showsVerticalScrollIndicator={false}>
            {services.map((src, index) => (
              <TouchableNativeFeedback
                onPress={() => props.selectFunc(src.name)}
                key={index}>
                <View style={styles.item}>
                  <View style={styles.icon2}>
                    <Icoon
                      type="FontAwesome"
                      name={src.icon}
                      color={src.color}
                      size={35}
                    />
                  </View>
                  <View style={styles.title}>
                    <Text style={styles.titTxt}>{src.name}</Text>
                    <Text style={styles.smTxt}>
                      Looking for {src.name} ? it's just one click away from you
                      now !!!
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: -1,
    flexDirection: 'row',
  },
  model: {
    backgroundColor: '#F8F9F9',
    height: Dimensions.get('window').height / 1.07,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    elevation: 2,
  },
  titleView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
  },
  titleText: {
    color: '#2257A9',
    fontFamily: 'ebrima',
    fontWeight: 'bold',
  },
  item: {
    width: '43%',
    height: 150,
    margin: 5,
    elevation: 1.2,
    marginTop: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  icon2: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    height: '60%',
    margin: 2,
    alignItems: 'center',
  },
  titTxt: {
    fontFamily: 'ebrima',
    fontWeight: 'bold',
    color: '#2257A9',
  },
  smTxt: {
    fontFamily: 'ebrima',
    fontSize: 10,
    padding: 5,
    color: 'gray',
  },
});

export default ModalPop;
