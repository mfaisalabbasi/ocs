import React from 'react';
import {
  TouchableNativeFeedback,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import moment from 'moment';
const Box = (props) => {
  const handlePress = () => {
    // dispatch(requestCustomer(props.dta));
    props.navigate();
  };
  return (
    <View style={styles.screen}>
      <TouchableNativeFeedback onPress={handlePress}>
        <View style={styles.card}>
          <View style={styles.imageCon}>
            <Image
              source={
                props.dta.profileUrl
                  ? {uri: props.dta.profileUrl}
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
              <Text style={styles.head}>
                {props.dta.name && props.dta.name},{' '}
              </Text>
              wants to hire you, click to get more information
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 9, color: '#566573'}}>
              [ {moment(props.dta.submitDate).fromNow()} ]
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
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
export default Box;
