import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  Dimensions,
} from 'react-native';
import Icoon from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import NotificationBox from './NotificationBox';

const Notification = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <View style={styles.header}>
            <Icoon
              type="AntDesign"
              name="arrowleft"
              color="#FFFFFF"
              size={25}
              onPress={() => navigation.navigate('Home')}
            />
          </View>
        );
      },
    });
  }, []);

  const empty = (
    <TouchableNativeFeedback>
      <View style={styles.card}>
        <View style={styles.imageCon}>
          <Image
            source={require('../assets/images/person.jpg')}
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
            <Text style={styles.head}>Dear customer, </Text>
            we will try best to serve you stay connected with us.
          </Text>
          <Text style={{fontWeight: 'bold', fontSize: 9, color: '#566573'}}>
            [ {moment().format('MMMM Do YYYY, h:mm:ss a')} ]
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );

  const notification = useSelector((state) => state.user.user.hiring);
  let loaded = [];
  if (notification) {
    const convert = Object.keys(notification);
    convert.map((noti) => loaded.push(notification[noti]));
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={loaded.reverse()}
        ListEmptyComponent={empty}
        renderItem={(itemData) => (
          <NotificationBox
            dta={itemData.item}
            navigate={() =>
              navigation.navigate('Home', {partner: itemData.item})
            }
          />
        )}
        keyExtractor={(item, index) => 'key' + index}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    marginHorizontal: 15,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 10,
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
export default Notification;
