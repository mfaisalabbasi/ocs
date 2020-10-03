import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {updateRadius} from '../../store/actions/user';

const Radius = () => {
  const userid = useSelector(state => state.register.user.localId);
  const current = useSelector(state => state.user.user.radius);
  const [check, setcheck] = useState(true);

  const dispatch = useDispatch();
  const [value, setvalue] = useState(50);

  const handleSlide = () => {
    dispatch(updateRadius(userid, value));
  };

  const valChange = props => {
    setcheck(false);
    setvalue(props);
  };
  return (
    <View style={styles.screen}>
      <View style={styles.top}>
        <Icon type="FontAwesome" name="map-marker" color="#0A7DC9" size={30} />
        <Text style={styles.title}>
          Your Radius :- {check ? current : value.toFixed()}km
        </Text>
        <Text style={{...styles.title, fontSize: 10, marginVertical: 3}}>
          Choose Radius in which you would like to serve clients
        </Text>
      </View>
      <View style={{...styles.top, width: '90%'}}>
        <Slider
          style={{
            width: '100%',
            height: 30,
          }}
          minimumValue={0}
          maximumValue={100}
          value={value}
          onValueChange={valChange}
          minimumTrackTintColor="#0A7DC9"
          maximumTrackTintColor="gray"
          thumbTintColor="#0A7DC9"
          onSlidingComplete={handleSlide}
        />
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: -4,
          }}>
          <Text style={{...styles.title, fontSize: 10}}>1km</Text>
          <Text style={{...styles.title, fontSize: 10}}>100km</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  top: {
    width: '98%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  title: {
    color: '#0A7DC9',
    fontFamily: 'ebrima',
    fontSize: 18,
  },
});
export default Radius;
