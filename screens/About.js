import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const About = props => {
  props.navigation.setOptions({
    headerLeft: () => {
      return (
        <View style={styles.header}>
          <Icon
            type="Ionicons"
            name="ios-menu"
            color="#FFFFFF"
            size={33}
            onPress={() => props.navigation.toggleDrawer()}
          />
        </View>
      );
    },
  });
  return (
    <ScrollView style={styles.scrn}>
      <View style={styles.container}>
        <View style={styles.img}>
          <Image
            source={require('../assets/images/logo.png')}
            style={{width: '80%',resizeMode:'center', marginHorizontal:10}}
          />
        </View>
        <View style={styles.content}>
          <Text style={{lineHeight: 20, fontFamily: 'ebrima'}}>
            <Text style={{fontWeight: 'bold', fontFamily: 'ebrima', color:'#498DF6'}}>
              On{'  '} Click{'  '} Services{'  '} (OCS)
            </Text>
            {'  '}
            is is a platform that help needy people to get doorstep services by just using some smart phone clicks, and OCS also
            help skillful person that are looking for job nearby.
            it's free free of cost you just need to choose service that you are looking for and ocs will show you
            providers profile nearby you in just few seconds.
            Or if You want to be a OCS partner, you just need to signing into Partner section with your specific skill and OCS will take care of you for comfort and nearby job.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrn: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    marginHorizontal: 15,
  },
  container: {
    width: '99%',
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 10,
    marginTop: 10,
  },
  img: {
    width: '100%',
    height: 120,
    justifyContent:'center',
    
  },
  content: {
    width: '100%',
    padding: 10,
  },
});
export default About;
