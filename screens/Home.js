import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
  BackHandler,
  Image,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import {
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeIcon,
} from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {PlusIcon} from 'react-native-heroicons/solid';
import PostItem from './components/PostItem';
import {Colors} from './utitiles/Colors';
import Global from './utitiles/Global';
import {Text} from 'react-native-animatable';

const Home = ({navigation}) => {
  const [Data, setData] = useState();
  const [id, setid] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [Notify, setNotify] = useState(0);
  const Navigation = useNavigation();

  const getPost = async () => {
    const user = await AsyncStorage.getItem('Userid');
    setid(user);
    setLoading(true);
    const response = await fetch(Global.BASE_URL + `happenings&userId=${user}`);
    const data = await response.json();
    setData(data.response);
    setNotify(data.response.notification);
    setLoading(false);
  };

  const PostLike = async (postId, ind) => {
    const tempData = Data;
    tempData.map((item, index) => {
      if (index == ind) {
        if (item.holdLike == 0) {
          item.holdLike = 1;
          item.like++;
        } else if (item.holdLike == 1) {
          item.holdLike = 0;
          item.userLike = 0;
          item.like--;
        }
      }

      let temp = [];
      tempData.map(item => {
        temp.push(item);
      });
      setData(temp);
    });
    const response = await fetch(
      Global.BASE_URL + `postLike&userId=${id}&postId=${postId}`,
    );
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    const unsuscribe = Navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      Alert.alert('Alert!', 'Are you Want to exit this app ?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => BackHandler.exitApp()},
      ]);
    });
    return unsuscribe;
  }, [Navigation]);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#ffffff',
          paddingHorizontal: 8,
          paddingVertical: 5,
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1000,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Social')}>
          <Image
            source={require('../assets/icon.png')}
            style={styles.Image}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon color="#000" size={24} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Message')}>
            <EnvelopeIcon color="#000" size={24} style={styles.TextInput} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <BellIcon color="#000" size={24} />
            {Notify == undefined ? null : (
              <View
                style={{
                  backgroundColor: Colors.primary,
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: -7,
                  right: -2,
                }}>
                <Text>{Notify}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {Loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color="#121A3A" size={'large'} />
        </View>
      ) : (
        <View style={styles.Container}>
          <FlatList
            refreshing={false}
            onRefresh={getPost}
            data={Data}
            style={{marginBottom: 70}}
            renderItem={({item, index}) => (
              <PostItem
                item={item}
                index={index}
                userId={id}
                PostLike={PostLike}
              />
            )}
            keyExtractor={item => item.postId}
            showsVerticalScrollIndicator={false}
          />
        </View>
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
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: '100%',
  },
  main_container: {
    alignSelf: 'center',
    width: '95%',
    borderRadius: 20,
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 10,
    shadowColor: '#0000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
  },
  container_1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  container_2: {
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  container_3: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  container_4: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 5,
  },
  text_name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#A37589',
    fontFamily: 'Poppins-SemiBold',
  },
  text_time: {
    fontSize: 12,
    fontWeight: '700',
    color: '#e1e1e1',
    fontFamily: 'Poppins-Medium',
  },
  Courses_img: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  Image: {
    width: 40,
    height: 48,
  },
  form_container: {
    width: '75%',
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  input_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 15,
  },

  TextInput: {
    width: '100%',
    marginHorizontal: 17,
    fontFamily: 'Poppins-SemiBold',
  },
  btn: {
    backgroundColor: '#121A3A',
    paddingVertical: 15,
    margin: 10,
    borderRadius: 15,
  },
  btn_text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  text_container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
  },
  PostmodalView: {
    padding: 20,
    paddingTop: 40,
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default Home;
