import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
  Share,
  ScrollView,
} from 'react-native';
import {UserCircleIcon, PlusCircleIcon} from 'react-native-heroicons/outline';
import {PaperAirplaneIcon, ShareIcon} from 'react-native-heroicons/solid';
import Global from '../utitiles/Global';
import {Colors} from '../utitiles/Colors';

const UserProfile = ({navigation, route}) => {
  const {userId} = route.params;
  const [Data, setData] = useState([]);
  const [Post, setPost] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [myId, setmyId] = useState('');
  const [Add, setAdd] = useState(false);

  const getData = async () => {
    setLoading(true);
    const user = await AsyncStorage.getItem('Userid');
    setmyId(user);
    const response = await fetch(
      Global.BASE_URL + `myProfiles&userId=${userId}&friendId=${user}`,
    );
    const data = await response.json();
    setData(data.response);
    setPost(data.response.myPost);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const Addfriend = async () => {
    const response = await fetch(
      Global.BASE_URL + `addFriend&userId=${myId}&friendId=${userId}`,
    );
    const data = await response.json();
    if (data.response.status == 1) {
      ToastAndroid.show('Friend Request Sent', ToastAndroid.SHORT);
      setAdd(true);
    }
  };

  const AcceptFriend = async () => {
    const response = await fetch(
      Global.BASE_URL +
        `updateFriendStatus&userId=${myId}&friendId=${userId}&status="accept"`,
    );
    const data = await response.json();
    if (data.response.status == 1) {
      ToastAndroid.show('Accepted', ToastAndroid.SHORT);
    }
    getData();
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
        </View>
        <View style={styles.container_3}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              color: Colors.dark,
            }}>
            {item.content}
          </Text>
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
    <View style={{flex: 1}}>
      {Loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color="#121A3A" size={'large'} />
        </View>
      ) : (
        <ScrollView
          style={styles.card_container}
          showsVerticalScrollIndicator={false}>
          {Data.cover === null ? (
            <View> </View>
          ) : (
            <Image
              source={{uri: Data.cover}}
              resizeMode="center"
              style={{width: '100%', height: 110}}
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

              {Data.friendStatus == 0 ? (
                <View>
                  {Data.friendDetail == null ? (
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={Addfriend}
                      disabled={Add}>
                      <PlusCircleIcon
                        color="#97667c"
                        size={20}
                        style={{marginRight: 5}}
                      />
                      <Text style={styles.btn_text}>
                        {Add ? 'Pending' : 'Add Friend'}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.btn} onPress={AcceptFriend}>
                      <PlusCircleIcon
                        color="#97667c"
                        size={20}
                        style={{marginRight: 5}}
                      />
                      <Text style={styles.btn_text}>Accept</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ) : (
                <TouchableOpacity
                  style={[styles.btn, {backgroundColor: '#fff'}]}
                  onPress={() =>
                    navigation.navigate('Chatscreen', {
                      id: userId,
                      name: Data.name,
                    })
                  }>
                  <Text style={styles.btn_text}>Message</Text>
                  <PaperAirplaneIcon
                    color="#97667c"
                    size={18}
                    style={{marginLeft: 5}}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.container_7}>
              <Text style={styles.profile_name}>{Data.name}</Text>
              <Text style={styles.profile_connection}>
                {Data.connection} Connection
              </Text>
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
                    color: Colors.primary,
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
                <View>
                  <TouchableOpacity>
                    <Text style={{fontSize: 12, color: Colors.light}}>
                      Accept
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          {Post == null ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50%',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FAFAFA',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    fontFamily: 'Poppins-Medium',
                  }}>
                  Don't Have any Post
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={Post}
              renderItem={({item}) => <PostItem item={item} />}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          )}
        </ScrollView>
      )}
    </View>
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
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn_text: {
    color: '#a37589',
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  input_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 15,
    marginVertical: 10,
  },
  form_container: {
    width: '90%',
  },
  TextInput: {
    marginHorizontal: 12,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.dark,
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
    color: Colors.dark,
  },
});

export default UserProfile;
