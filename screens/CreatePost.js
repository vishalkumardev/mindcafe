import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  PermissionsAndroid,
  Image,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {PhotoIcon, XMarkIcon} from 'react-native-heroicons/solid';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Global from './utitiles/Global';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';

const CreatePost = ({navigation}) => {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Input, setInput] = useState('');
  const [Url, setUrl] = useState('');
  const [userId, setuserId] = useState('');
  const [type, settype] = useState('anom');
  const [SelectedIndex, setSelectedIndex] = useState(0);

  const getData = async () => {
    setLoading(true);
    const user = await AsyncStorage.getItem('Userid');
    setuserId(user);
    const response = await fetch(Global.BASE_URL + `myProfiles&userId=${user}`);
    const data = await response.json();
    setData(data.response);
    setButton(data.response.name);
    setLoading(false);
  };

  const setButton = name => {
    setRadioButtons([
      {
        id: '1',
        label: 'Anonymous',
        value: 'anonymous',
        selected: false,
      },
      {
        id: '2',
        label: name,
        value: `User`,
        selected: true,
      },
    ]);
  };

  const [radioButtons, setRadioButtons] = useState([
    {
      id: '1',
      label: 'Anonymous',
      value: 'anonymous',
    },
    {
      id: '2',
      label: `${Data.name == undefined ? 'User' : Data.name}`,
      value: `User`,
    },
  ]);

  const Post = async e => {
    e.preventDefault();
    var bodyFormData = new FormData();
    bodyFormData.append('type', type);
    bodyFormData.append('content', Input);
    bodyFormData.append('userId', userId);
    bodyFormData.append('images', {
      uri: Url,
      type: 'image/jpeg',
      name: `img-${Date.now()}.jpg`,
    });
    axios({
      method: 'post',
      url: `https://www.mindcafe.app/postMessage.php`,
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(function (response) {
        if (response.data.status == 1) {
          Alert.alert('Post Upload Successfully');
          navigation.navigate('Home');
        }
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  const ImagePicker = async () => {
    let options = {
      saveToPhotos: true,
      mediaType: 'photo',
    };

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchImageLibrary(options);
      setUrl(result.assets[0].uri);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  function onPressRadioButton(index) {
    setSelectedIndex(index);
    if (index == 0) {
      settype('anom');
    } else {
      settype('name');
    }
  }

  return (
    <>
      {Loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color="#121A3A" size={'large'} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignSelf: 'center',
              alignItems: 'center',
              paddingVertical: 15,
              backgroundColor: '#fafafa',
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Poppins-Medium',
                color: Colors.dark,
              }}>
              Create Post
            </Text>
            <XMarkIcon
              color="#000"
              size={24}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View
            style={{
              marginVertical: 10,
              backgroundColor: '#fafafa',
              minHeight: 400,
              width: '95%',
              alignSelf: 'center',
              borderRadius: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              <Image
                source={{uri: Data.img}}
                resizeMode="contain"
                style={{width: 40, height: 40, borderRadius: 20}}
              />
              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 13,
                  fontFamily: 'Poppins-Regular',
                  color: Colors.dark,
                }}>
                {Data.name}
              </Text>
            </View>
            <TextInput
              placeholder={`Hey ${Data.name}... Start sharing Anonymously on this "Intentionally"  Old-School Platform`}
              style={{
                paddingHorizontal: 20,
                borderRadius: 10,
                fontSize: 12,
                fontFamily: 'Poppins-Regular',
                color: Colors.dark,
              }}
              placeholderTextColor={Colors.dark}
              multiline
              value={Input}
              onChangeText={setInput}
            />

            {Url == '' ? (
              <></>
            ) : (
              <Image
                source={{uri: Url}}
                resizeMode="stretch"
                style={{
                  alignSelf: 'center',
                  width: '95%',
                  height: 300,
                  marginBottom: 20,
                  borderRadius: 10,
                }}
              />
            )}
            <TouchableOpacity
              style={{position: 'absolute', bottom: 10, right: 15}}
              onPress={ImagePicker}>
              <PhotoIcon color="#97667c" size={32} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginVertical: 10,
              backgroundColor: '#fafafa',
              width: '95%',
              alignSelf: 'center',
              borderRadius: 15,
              paddingHorizontal: 20,
              paddingVertical: 15,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Poppins-Medium',
                color: '#000',
              }}>
              Post As
            </Text>
            <View style={{marginTop: 10}}>
              {radioButtons.map((value, index) => {
                return (
                  <View style={{flexDirection: 'row', margin: 10}}>
                    <TouchableOpacity
                      style={{
                        height: 24,
                        width: 24,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: '#000',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => onPressRadioButton(index)}>
                      {SelectedIndex == index ? (
                        <View
                          style={{
                            height: 16,
                            width: 16,
                            borderRadius: 8,
                            backgroundColor: 'black',
                          }}></View>
                      ) : null}
                    </TouchableOpacity>
                    <Text style={{marginLeft: 10, color: Colors.dark}}>
                      {value.label}
                    </Text>
                  </View>
                );
              })}
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#97667c',
                paddingVertical: 8,
                borderRadius: 5,
                marginTop: 20,
                width: '30%',
                alignSelf: 'flex-start',
              }}
              onPress={Post}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Poppins-Medium',
                  color: '#fff',
                  textAlign: 'center',
                }}>
                Post
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default CreatePost;
