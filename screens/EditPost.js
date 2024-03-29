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
} from 'react-native';
import {PhotoIcon, XMarkIcon} from 'react-native-heroicons/solid';
import {TrashIcon} from 'react-native-heroicons/outline';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import Global from './utitiles/Global';
import {Colors} from './utitiles/Colors';

const EditPost = ({navigation, route}) => {
  const {item} = route.params;
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Input, setInput] = useState('');
  const [Url, setUrl] = useState('');
  const [userId, setuserId] = useState('');
  const [type, settype] = useState('anom');
  const [SelectedIndex, setSelectedIndex] = useState(0);

  const getData = async () => {
    setInput(item.content);
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
      selected: false,
    },
    {
      id: '2',
      label: `${Data.name == undefined ? 'User' : Data.name}`,
      value: `User`,
      selected: true,
    },
  ]);

  const Post = async e => {
    e.preventDefault();
    setLoading(true);
    var bodyFormData = new FormData();
    bodyFormData.append('type', type);
    bodyFormData.append('content', Input);
    bodyFormData.append('userId', userId);
    
    if (Url !== "") {
      bodyFormData.append('images', {
        uri: Url,
        type: 'image/jpeg',
        name: `img-${Date.now()}.jpg`,
      });
    } 
    axios({
      method: 'post',
      url: `https://www.mindcafe.app/webservice/postMessage.php`,
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
    setLoading(false);
  };

  const handleDelete = () => {
    Alert.alert('Hold on!', 'Are you sure you want to delete post ?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'YES',
        onPress: async () => {
          const response = await fetch(
            Global.BASE_URL +
              `deletePost&userId=${userId}&postId=${item.postId}`,
          );
          const data = await response.json();
          if (data.response.status == 1) {
            Alert.alert('Post Deleted Successfully');
            navigation.goBack();
          }
        },
      },
    ]);
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
          Edit Post
        </Text>
        <XMarkIcon color="#000" size={24} onPress={() => navigation.goBack()} />
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
            paddingVertical: 15,
            borderRadius: 10,
            fontSize: 14,
            fontFamily: 'Poppins-Regular',
            color: Colors.dark,
          }}
          multiline
          placeholderTextColor={Colors.dark}
          value={Input}
          onChangeText={setInput}
        />
        {item.img == undefined ? (
          <></>
        ) : (
          <Image
            source={{uri: item.img}}
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
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#97667c',
            paddingVertical: 8,
            borderRadius: 5,
            marginTop: 20,
            width: '40%',
            alignSelf: 'flex-start',
          }}
          onPress={Post}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Poppins-Medium',
              color: '#fff',
              textAlign: 'center',
            }}>
            Update Post
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDelete}>
          <TrashIcon
            color="#a61725"
            size={24}
            style={{alignSelf: 'flex-end'}}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditPost;
