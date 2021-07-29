import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const About = (props) => {
  useEffect(() => {
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
  }, []);

  return (
    <ScrollView style={styles.scrn}>
      <View style={styles.container}>
        <View style={styles.img}>
          <Image
            source={require('../assets/images/about.png')}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'center',
              borderRadius: 5,
            }}
          />
        </View>
        <View style={styles.content}>
          <Text style={{lineHeight: 20, fontFamily: 'ebrima'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontFamily: 'ebrima',
                color: '#498DF6',
              }}>
              On{'  '} Click{'  '} Services{'  '} (OCS)
            </Text>
            {'  '}
            is platform that brings all doorstep service provider on just few
            clicks. If you are at home and you want to hire someone for your
            service, normally for that you must have to go out for hiring
            purpose but now ocs provide you provider nearby you within clicks,
            But How it works ? All you need to do is login into customer
            section, at home screen you will see Choose category tap on that
            option and select service that you looking for, by pressing confirm
            ocs will filter nearby service provider for you of your category.
            Now you will see the profile of provider by pressing start contract
            provider will get Notification you want to hire him/her and you can
            also call him/her directly ocs will show you their details. And good
            news is that OCS will not show just single Provider, it will also
            show you the list of other Availble provider according to your
            current position. You can Hire one of them that you feel suitable
            for your work. OCS is Covering Almost All doorstep service, Some of
            them are given below. Phone:- 03135100799
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
    padding: 5,
  },
  img: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    marginBottom: -8,
  },
  content: {
    width: '100%',
    padding: 5,
  },
});
export default About;
