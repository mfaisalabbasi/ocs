import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const CustomLogo = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.screen}>
        <View style={styles.Logo}>
          <Image
            source={require('../assets/images/icon.png')}
            style={{width: '100%', height: '100%', resizeMode: 'center'}}
          />
        </View>
        <View style={styles.nameContainer}>
          <View style={styles.nameText}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '900',
                fontFamily: 'ebrima',
              }}>
              Muhammad Faisal Abbasi
            </Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    margin: 0,
    padding: 0,
    height: '100%',
    width: '100%',
  },
  Logo: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  nameText: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
export default CustomLogo;
