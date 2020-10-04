import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome';
import {customerProfile, nullProfile} from '../store/actions/user';

const CustomLogo = props => {
  const dispatch = useDispatch();
  const userid = useSelector(state => state.register.user.localId);
  const user = useSelector(state => state.user.user);
  const er = useSelector(state => state.user.profileImgError);

  useEffect(() => {}, [user]);
  const ocs = 'On Click Services';
  const [filename, setfilename] = useState(null);
  const [image, setimage] = useState(null);
  const [progress, setprogress] = useState(false);
  const [percent, setpercent] = useState(null);
  const [press, setpress] = useState(false);

  const uploadFunc = async () => {
    setpress(true);
    const {uri} = image;
    const uploadtask = storage()
      .ref()
      .child('customers')
      .child(user.email)
      .putFile(uri);

    uploadtask.on('state_changed', taskSnapshot => {
      setprogress(true);

      const uploading =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;
      setpercent(uploading);
    });

    const result = await uploadtask;

    const url = await storage()
      .ref()
      .child(`customers/${user.email}`)
      .getDownloadURL();
    // setUser({...user, imgUrl: url});
    setfilename(null);
    setprogress(false);
    setpress(false);
    dispatch(customerProfile(userid, url));
  };
  const options = {
    title: 'Choose profile Picture',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const imgPicker = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        setfilename(response.fileName);
        setimage(source);
      }
    });
    dispatch(nullProfile());
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.screen}>
        <View style={styles.Logo}>
          <View
            style={{
              width: '100%',
              height: '70%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={
                user.profileUrl
                  ? {uri: user.profileUrl}
                  : require('../assets/images/profile.png')
              }
              style={{
                flex: 1,
                width: '60%',
                height: '100%',
                resizeMode: 'cover',
                aspectRatio: 1,
                borderRadius: 100,
                backgroundColor: '#EBF5FB',
              }}
            />
            {er ? (
              <Text style={{fontFamily: 'ebrima', color: 'red', fontSize: 8}}>
                Something went wrong try later
              </Text>
            ) : null}
          </View>
          <View style={styles.nameContainer}>
            <View style={styles.nameText}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '900',
                  fontFamily: 'ebrima',
                  marginVertical: 1,
                }}>
                {user === null ? ocs : user.name}
              </Text>
            </View>
          </View>
          {filename ? (
            <TouchableNativeFeedback onPress={uploadFunc}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#498DF6',
                  elevation: 0,
                  overflow: 'hidden',
                  width: '80%',
                  borderRadius: 30,
                  height: '15%',
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontFamily: 'ebrima',
                    fontSize: 13,
                  }}>
                  {press
                    ? 'Uploading Profile .'
                    : `Click to Upload [${filename.substring(
                        filename.length - 8,
                      )}]`}
                </Text>
              </View>
            </TouchableNativeFeedback>
          ) : (
            <TouchableNativeFeedback onPress={imgPicker}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#EBF5FB',
                  elevation: 0,
                  overflow: 'hidden',
                  width: '80%',
                  borderRadius: 30,
                  height: '15%',
                }}>
                <Text
                  style={{
                    color: '#0A7DC9',
                    fontFamily: 'ebrima',
                    fontSize: 13,
                  }}>
                  <Icon
                    type="FontAwesome"
                    name="picture-o"
                    color="#0A7DC9"
                    size={11}
                  />{' '}
                  Choose Profile{' '}
                </Text>
              </View>
            </TouchableNativeFeedback>
          )}

          {progress ? (
            <View style={{marginVertical: 10}}>
              <Progress.Bar progress={percent} width={200} />
            </View>
          ) : null}
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
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D4E6F1',
    marginTop: -3,
  },
  nameContainer: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
});
export default CustomLogo;
