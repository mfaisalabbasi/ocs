import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
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
            source={require('../assets/images/about.png')}
            style={{width: '100%', height: '100%'}}
          />
        </View>
        <View style={styles.content}>
          <Text style={{lineHeight: 20, fontFamily: 'ebrima'}}>
            <Text style={{fontWeight: 'bold', fontFamily: 'ebrima'}}>
              On{'  '} Click{'  '} Services{'  '} (OCS)
            </Text>
            {'  '}
            is non-partisan, non-political and non-governmental reasearch
            orgnization based in islamabad. The SRI endeavors to create better
            understanding about security , counter terrorism, Strategic and
            social issues, and ongoing conflicts in the region among the
            conserned stackholder through undertaking independent, impartial and
            objective research and analysis. The SRI aspires to create awareness
            among all segments of the pakistani society and government to
            jointly strive for peaceful, tolerant and progressive Pakistan with
            the help of short videos and documenttaries.
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
    height: 200,
  },
  content: {
    width: '100%',
    padding: 10,
  },
});
export default About;
