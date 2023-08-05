import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ArrowLeftOnRectangleIcon,
  BuildingStorefrontIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  PhoneIcon,
  UserCircleIcon,
} from 'react-native-heroicons/solid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Global from './utitiles/Global';
import {Colors} from './utitiles/Colors';

const Social = ({navigation}) => {
  const [ProfilePhotoUrl, setProfilePhotoUrl] = useState('');
  const [Name, setName] = useState('');
  const [MobileNumber, setMobileNumber] = useState('');
  const [Email, setEmail] = useState('');
  const [Loading, setLoading] = useState(false);

  const getUserProfile = async () => {
    setLoading(true);
    const user = await AsyncStorage.getItem('Userid');
    const response = await fetch(Global.BASE_URL + `myProfiles&userId=${user}`);
    const data = await response.json();
    setMobileNumber(data.response.phone);
    setName(data.response.name);
    setEmail(data.response.email);
    setProfilePhotoUrl(data.response.img);
    setLoading(false);
  };

  // const LogOut = () => {
  //   navigation.navigate('Login');
  // };
  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <>
      {Loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color="#121A3A" size={'large'} />
        </View>
      ) : (
        <View>
          <TouchableOpacity
            style={{
              width: '95%',
              borderRadius: 10,
              backgroundColor: Colors.light,
              alignSelf: 'center',
              marginTop: 10,
              padding: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('Profile')}>
            <Image
              source={{uri: ProfilePhotoUrl}}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                resizeMode: 'cover',
              }}
            />
            <View style={{marginLeft: 20}}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins-Medium',
                  color: Colors.dark,
                }}>
                {Name}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins-Medium',
                  color: Colors.dark,
                }}>
                {Email}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins-Medium',
                  color: Colors.dark,
                }}>
                {' '}
                +91 {MobileNumber}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              width: '95%',
              alignSelf: 'center',
              marginVertical: 10,
              backgroundColor: Colors.light,
              paddingHorizontal: 10,
              borderRadius: 15,
            }}>
            <TouchableOpacity
              style={{
                paddingVertical: 15,
                borderRadius: 5,
                paddingHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() =>
                Linking.openURL('https://mindcafe.app/about_us.php')
              }>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <UserCircleIcon color={Colors.primary} size={30} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Poppins-SemiBold',
                    color: Colors.dark,
                    marginLeft: 10,
                  }}>
                  About Us
                </Text>
              </View>
              <ChevronRightIcon color={Colors.secondary} size={18} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 15,
                borderRadius: 5,
                paddingHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() => Linking.openURL('https://mindcafe.app/blog.php')}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <PencilSquareIcon color={Colors.primary} size={30} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Poppins-SemiBold',
                    color: Colors.dark,
                    marginLeft: 10,
                  }}>
                  Blogs
                </Text>
              </View>
              <ChevronRightIcon color={Colors.secondary} size={18} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 15,
                borderRadius: 5,
                paddingHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() =>
                Linking.openURL('https://mindcafe.app/contact_us.php')
              }>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <PhoneIcon color={Colors.primary} size={24} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Poppins-SemiBold',
                    color: Colors.dark,
                    marginLeft: 10,
                  }}>
                  Contact Us
                </Text>
              </View>
              <ChevronRightIcon color={Colors.secondary} size={18} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 15,
                borderRadius: 5,
                paddingHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() => Linking.openURL('https://business.mindcafe.app')}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <BuildingStorefrontIcon color={Colors.primary} size={30} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Poppins-SemiBold',
                    color: Colors.dark,
                    marginLeft: 10,
                  }}>
                  Corporate
                </Text>
              </View>
              <ChevronRightIcon color={Colors.secondary} size={18} />
            </TouchableOpacity>
          </View>
          {/* 
          <TouchableOpacity
            style={{
              backgroundColor: '#97667c',
              paddingVertical: 10,
              borderRadius: 5,
              marginVertical: 10,
              width: '37%',
              alignSelf: 'center',
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            onPress={LogOut}>
            <ArrowLeftOnRectangleIcon color="#fff" size={24} />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                marginHorizontal: 10,
                fontFamily: 'Poppins-Regular',
                color: '#fff',
              }}>
              Logout
            </Text>
          </TouchableOpacity> */}
        </View>
      )}
      <View
        style={{
          width: '80%',
          alignSelf: 'center',
          position: 'absolute',
          bottom: 0,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() =>
              Linking.openURL('https://www.facebook.com/mindcafeapp/')
            }>
            <Image
              source={require('../assets/facebook.png')}
              style={{width: 36, height: 36}}
              resizeMode="contain"
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                fontFamily: 'Poppins-Regular',
                marginTop: 10,
                color: Colors.dark,
              }}>
              Facebook
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() =>
              Linking.openURL('https://www.instagram.com/mindcafeindia/')
            }>
            <Image
              source={require('../assets/instagram.png')}
              style={{width: 36, height: 36}}
              resizeMode="contain"
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                fontFamily: 'Poppins-Regular',
                marginTop: 10,
                color: Colors.dark,
              }}>
              Instagram
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() =>
              Linking.openURL('https://www.youtube.com/@mindcafeindia2341')
            }>
            <Image
              source={require('../assets/youtube.png')}
              style={{width: 36, height: 36}}
              resizeMode="contain"
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                fontFamily: 'Poppins-Regular',
                marginTop: 10,
                color: Colors.dark,
              }}>
              Youtube
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() =>
              Linking.openURL('https://www.linkedin.com/company/mindcafe-app/')
            }>
            <Image
              source={require('../assets/linkedin.png')}
              style={{width: 36, height: 36}}
              resizeMode="contain"
            />
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                fontFamily: 'Poppins-Regular',
                marginTop: 10,
                color: Colors.dark,
              }}>
              LinkedIn
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Social;
