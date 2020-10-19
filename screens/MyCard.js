import React, {useEffect} from 'react';
import {
  TouchableNativeFeedback,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {getNear} from '../store/actions/user';
const MyCard = props => {
  const dispatch = useDispatch();
  const handlePress = () => {
    dispatch(getNear(props.dta));
    props.closeModal();
  };

  return (
    <TouchableNativeFeedback onPress={handlePress}>
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
            {`${props.dta.name} is Availble near your location, click to get more info.!`}
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
const styles = StyleSheet.create({
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
    width: '20%',
    height: '100%',
    padding: 2,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: '#EBF5FB',
  },
  address: {
    width: '72%',
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
export default MyCard;
