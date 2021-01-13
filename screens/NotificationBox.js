import React from 'react';
import moment from 'moment';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  Dimensions,
} from 'react-native';
const NotificationBox = ({dta, navigate}) => {
  const onBoxPress = () => {
    navigate();
  };
  return (
    <TouchableNativeFeedback onPress={onBoxPress}>
      <View style={styles.card}>
        <View style={styles.imageCon}>
          <Image
            source={
              dta.profileUrl
                ? {uri: dta.profileUrl}
                : require('../assets/images/person.jpg')
            }
            style={{
              width: '70%',
              height: '70%',
              resizeMode: 'cover',
              aspectRatio: 1,
              borderRadius: 20,
            }}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.body}>
            <Text style={styles.head}>{dta.name && dta.name}, </Text>
            <Text>is on the way, click to get more information</Text>
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 9, color: '#566573'}}>
            [ {moment(dta.submitDate).fromNow()} ]
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: Dimensions.get('screen').width / 1.06,
    height: 65,
    marginBottom: 10,
    marginHorizontal: 1,
    borderRadius: 2,
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#F8F9F9',
    elevation: 0.5,
    overflow: 'hidden',
  },

  imageCon: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '80%',
    height: '100%',
    padding: 5,
  },
  head: {
    fontFamily: 'ebrima',
    fontWeight: 'bold',
    fontSize: 13,
    color: '#0140A0',
  },
  body: {
    fontWeight: '900',
    fontFamily: 'ebrima',
    fontSize: 12,
    color: '#5D6D7E',
  },
});
export default NotificationBox;
