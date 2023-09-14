import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
  TextInput,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  RefreshControl,
  PermissionsAndroid,
  Share,
  Alert,
} from 'react-native';
import {
  UserCircleIcon,
  PlusCircleIcon,
  EllipsisVerticalIcon,
} from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CameraIcon,
  PlusIcon,
  ShareIcon,
  XMarkIcon,
} from 'react-native-heroicons/solid';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Global from './utitiles/Global';
import {Colors} from './utitiles/Colors';
import {UserAuthContext} from './UserAuthContext';
import axios from 'axios';

const Profile = ({navigation}) => {
  const [Data, setData] = useState([]);
  const [Post, setPost] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [Toggle, setToggle] = useState(false);
  const [coverPhotoUrl, setcoverPhotoUrl] = useState('');
  const [ProfilePhotoUrl, setProfilePhotoUrl] = useState('');
  const [Name, setName] = useState('');
  const [MobileNumber, setMobileNumber] = useState('');
  const [Connection, setConnection] = useState(false);
  const [Friend, setFriend] = useState([]);
  const [SearchData, setSearchData] = useState([]);
  const {UserType} = useContext(UserAuthContext);
  const [userId, setuserId] = useState('');
  const getUserProfile = async () => {
    setLoading(true);
    const user = await AsyncStorage.getItem('Userid');
    setuserId(user);
    const response = await fetch(Global.BASE_URL + `myProfiles&userId=${user}`);
    const data = await response.json();
    setData(data.response);
    setPost(data.response.myPost);
    setMobileNumber(data.response.phone);
    setName(data.response.name);
    setProfilePhotoUrl(data.response.img);
    setcoverPhotoUrl(data.response.cover);
    setLoading(false);
  };

  const getFriend = async () => {
    const user = await AsyncStorage.getItem('Userid');
    const response = await fetch(
      Global.BASE_URL + `friendList&user_id=${user}`,
    );
    const parsedData = await response.json();
    setFriend(parsedData.response);
    setSearchData(parsedData.response);
  };

  useEffect(() => {
    getFriend();
  }, []);

  const Updateprofie = async e => {
    e.preventDefault();
    if (Name.length <= 3) {
      Alert.alert('Please type Valid Name');
    } else if (MobileNumber.length <= 2) {
      Alert.alert('Please type Valid Mobile Number');
    } else {
      setLoading(true);
      var bodyFormData = new FormData();
      bodyFormData.append('name', Name);
      bodyFormData.append('phone', MobileNumber);
      bodyFormData.append('userId', userId);

      if (Data.img !== ProfilePhotoUrl) {
        bodyFormData.append('images', {
          uri: ProfilePhotoUrl,
          type: 'image/jpeg',
          name: `img-${Date.now()}.jpg`,
        });
      }
    }
    axios({
      method: 'post',
      url: `https://www.mindcafe.app/webservice/updateProfile.php`,
      data: bodyFormData,
      headers: {'Content-Type': 'multipart/form-data'},
    })
      .then(function (response) {
        if (response.data.status == true) {
          Alert.alert('Profile Updated Successfully');
          navigation.navigate('Profile');
        }
      })
      .catch(function (response) {
        console.log(response);
      });
    setLoading(false);
  };

  const ProfileImagePicker = async () => {
    let options = {
      saveToPhotos: true,
      mediaType: 'photo',
    };

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await launchImageLibrary(options);
      setProfilePhotoUrl(result.assets[0].uri);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleSearch = async text => {
    if (text.length > 0) {
      let templist = Friend.filter(item => {
        return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setFriend(templist);
    } else {
      setFriend(SearchData);
    }
  };

  const PostItem = ({item}) => {
    return (
      <View style={styles.main_container}>
        <View style={styles.container_1}>
          {Data.img == null ? (
            <UserCircleIcon color="#A37589" size={32} />
          ) : (
            <Image
              source={{uri: Data.img}}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                resizeMode: 'center',
              }}
            />
          )}
          <View style={styles.container_2}>
            <Text
              style={{
                fontSize: 13,
                fontFamily: 'Poppins-SemiBold',
                color: '#97667c',
                color: Colors.dark,
              }}>
              {item.user}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Poppins-Regular',
                color: Colors.dark,
              }}>
              {item.time}
            </Text>
          </View>
          <TouchableOpacity
            style={{position: 'absolute', top: 5, right: 5}}
            onPress={() =>
              navigation.navigate('EditPost', {
                item: item,
              })
            }>
            <EllipsisVerticalIcon color="#97667c" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.container_3}>
          <Text style={{color: Colors.dark}}>{item.content}</Text>
        </View>
        {item.img == null ? (
          <></>
        ) : (
          <Image
            source={{uri: item.img}}
            resizeMode="stretch"
            style={{
              width: '100%',
              height: 300,
              marginBottom: 20,
              borderRadius: 10,
            }}
          />
        )}
      </View>
    );
  };

  return (
    <>
      {Loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color="#121A3A" size={'large'} />
        </View>
      ) : (
        <ScrollView
          style={styles.card_container}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl onRefresh={getUserProfile} />}>
          {Data.cover === null ? (
            <View> </View>
          ) : (
            <Image
              source={{uri: 'https://www.mindcafe.app/img/cover/profile.png'}}
              resizeMode="center"
              style={{width: '100%', height: 110, resizeMode: 'cover'}}
            />
          )}
          <View style={styles.container_5}>
            <View style={styles.container_6}>
              {Data.img === null ? (
                <View> </View>
              ) : (
                <Image
                  source={{uri: Data.img}}
                  resizeMode="contain"
                  style={{width: 72, height: 72, borderRadius: 36}}
                />
              )}
              <TouchableOpacity
                style={styles.btn}
                onPress={() => setToggle(true)}>
                <Text style={styles.btn_text}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.container_7}>
           
              <Text style={styles.profile_name}>{Data.name}</Text>
              <TouchableOpacity onPress={() => setConnection(true)}>
                <Text style={styles.profile_connection}>
                  {Data.connection} Connection
                </Text>
              </TouchableOpacity>
              {UserType == 'employee' ? (
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: Colors.dark,
                    fontSize: 12,
                  }}>
                  Employee ID : 000{Data.employeeId}
                </Text>
              ) : null}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Poppins-Regular',
                    color: Colors.dark,
                  }}>
                  Share Profile
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    Share.share({
                      message: `https://mindcafe.app/profile.php?id=${Data.userId}`,
                    })
                  }>
                  <ShareIcon
                    color="#97667c"
                    size={20}
                    style={{marginLeft: 15}}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 15,
                }}>
                <PlusCircleIcon color="#121A3A" size={24} />
                <Text
                  style={{
                    color: Colors.dark,
                    marginLeft: 10,
                    textAlign: 'justify',
                  }}>
                  <Text style={{color: Colors.primary}}> Hey {Data.name}</Text>,
                  Start sharing Anonymously on this "Intentionally" Old-School
                  Platform.
                </Text>
              </View>
            </View>
          </View>
          <FlatList
            data={Post}
            ListEmptyComponent={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 100,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#FAFAFA',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => navigation.navigate('CreatePost')}>
                  <PlusCircleIcon
                    color="#000"
                    size={24}
                    style={{marginHorizontal: 6}}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '500',
                      fontFamily: 'Poppins-Medium',
                      color: Colors.dark,
                    }}>
                    Make your first post
                  </Text>
                </TouchableOpacity>
              </View>
            }
            renderItem={({item}) => <PostItem item={item} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </ScrollView>
      )}

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 40,
          right: 30,
          backgroundColor: '#97667c',
          width: 50,
          height: 50,
          borderRadius: 25,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('CreatePost')}>
        <PlusIcon color="#fff" size={26} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={Connection}
        onRequestClose={() => {
          setConnection(false);
        }}>
        <View style={{height: '100%', backgroundColor: '#fff', flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#fafafa',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 5,
            }}>
            <TextInput
              placeholder="Search...."
              style={{
                width: '80%',
                flex: 1,
                fontFamily: 'Poppins-Regular',
                color: Colors.dark,
              }}
              placeholderTextColor={Colors.dark}
              onChangeText={text => handleSearch(text)}
            />
            <XMarkIcon
              color="#000"
              size={24}
              onPress={() => setConnection(false)}
            />
          </View>
          <FlatList
            data={Friend}
            ListEmptyComponent={
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    fontFamily: 'Poppins-SemiBold',
                    marginTop: 30,
                    color: Colors.dark,
                  }}>
                  No Connection Found
                </Text>
              </View>
            }
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#fafafa',
                    marginVertical: 10,
                    width: '95%',
                    alignSelf: 'center',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 5,
                  }}
                  onPress={() =>
                    navigation.navigate('UserProfile', {
                      userId: item.friend_id,
                    })
                  }>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={{uri: item.profile}}
                      resizeMode="contain"
                      style={{width: 60, height: 60, borderRadius: 30}}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        marginLeft: 20,
                        fontFamily: 'Poppins-SemiBold',
                        color: Colors.dark,
                      }}>
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={Toggle}
        onRequestClose={() => {
          setToggle(false);
        }}>
        <View style={{height: '100%', backgroundColor: '#fff', flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 10,
              backgroundColor: '#fafafa',
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Poppins-Medium',
                color: Colors.dark,
              }}>
              Edit Profile
            </Text>
            <XMarkIcon
              color="#000"
              size={24}
              onPress={() => setToggle(false)}
            />
          </View>

          <View style={styles.container_5}>
            <View style={{marginVertical: 20, alignSelf: 'center'}}>
              <Image
                source={{
                  uri: ProfilePhotoUrl == '' ? Data.img : ProfilePhotoUrl,
                }}
                resizeMode="contain"
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 36,
                  backgroundColor: '#f0f0f0',
                }}
              />
              <TouchableOpacity onPress={ProfileImagePicker}>
                <Text
                  style={{
                    color: '#97667c',
                    marginTop: 10,
                  }}>
                  Select Image
                </Text>
              </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
              style={{width: '90%', alignSelf: 'center'}}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View style={{marginVertical: 5}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Poppins-SemiBold',
                    color: Colors.dark,
                  }}>
                  Full Name
                </Text>
                <TextInput
                  style={{
                    fontSize: 14,
                    fontFamily: 'Poppins-Regular',
                    borderColor: '#97667C',
                    borderBottomWidth: 1,
                    color: Colors.dark,
                  }}
                  placeholder="Enter your Name"
                  value={Name}
                  onChangeText={setName}
                  placeholderTextColor={Colors.dark}
                />
              </View>
              <View style={{marginVertical: 5}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Poppins-SemiBold',
                    color: Colors.dark,
                  }}>
                  Phone Number
                </Text>
                <TextInput
                  style={{
                    fontSize: 14,
                    fontFamily: 'Poppins-Regular',
                    borderColor: '#97667C',
                    borderBottomWidth: 1,
                    color: Colors.dark,
                  }}
                  placeholder="Enter your Phone Number"
                  value={MobileNumber}
                  placeholderTextColor={Colors.dark}
                  onChangeText={setMobileNumber}
                />
              </View>
              <TouchableOpacity
                style={{
                  paddingVertical: 15,
                  backgroundColor: '#97667c',
                  borderRadius: 20,
                  marginTop: 20,
                }}
                onPress={Updateprofie}>
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: 16,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Update Profile
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  Image: {
    width: '100%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  container_5: {
    width: '100%',
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  container_6: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    zIndex: 1,
    top: '-5%',
  },
  userImage: {
    zIndex: 1,
  },
  main_container: {
    alignSelf: 'center',
    width: '95%',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 10,
  },
  container_1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container_2: {
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  container_3: {
    marginVertical: 10,
  },
  container_4: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 5,
  },
  text_name: {
    fontSize: 12,
    fontWeight: '500',
    color: '#A37589',
    color: Colors.dark,
  },
  text_time: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000',
  },
  btn: {
    position: 'absolute',
    top: 60,
    right: 20,
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#fafafa',
  },
  btn_text: {
    color: '#a37589',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },

  form_container: {
    width: '90%',
  },
  TextInput: {
    marginHorizontal: 12,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  container_7: {
    width: '90%',
    alignSelf: 'center',
  },
  profile_name: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark,
  },
  profile_connection: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#A37589',
  },
});

export default Profile;
