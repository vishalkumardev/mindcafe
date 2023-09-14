import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  UserCircleIcon,
  UserPlusIcon,
  XMarkIcon,
} from 'react-native-heroicons/solid';
import Global from './utitiles/Global';
import {Colors} from './utitiles/Colors';

const Notification = ({navigation}) => {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [myId, setmyId] = useState('');

  const getNotification = async () => {
    setLoading(true);
    const user = await AsyncStorage.getItem('Userid');
    setmyId(user);
    const response = await fetch(
      Global.BASE_URL + `notification&userId=${user}`,
    );
    const data = await response.json();
    setData(data.response);
    await fetch(Global.BASE_URL + `updateNotification&userId=${user}`);
    setLoading(false);
  };
  useEffect(() => {
    getNotification();
  }, []);

  const AcceptFriend = async (status, friendId, notificationId) => {
    const response = await fetch(
      `https://www.mindcafe.app/webservice/activity.php?method=updateFriendStatus&userId=${myId}&senderId=${friendId}&status=${status}&notificationId=${notificationId}`,
    );
    const data = await response.json();
    if (data.response.status == 1) {
      ToastAndroid.show(
        status == 'accept' ? 'Accepted ' : 'Rejected',
        ToastAndroid.SHORT,
      );
    }
    getNotification();
  };
  return (
    <View>
      <View
        style={{
          backgroundColor: '#fafafa',
          paddingVertical: 15,
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'Poppins-Medium',
            color: Colors.dark,
          }}>
          Notification
        </Text>
        <XMarkIcon color="#000" size={24} onPress={() => navigation.goBack()} />
      </View>
      {Loading == true ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '40%',
          }}>
          <ActivityIndicator color="#121A3A" size={'large'} />
        </View>
      ) : (
        <FlatList
          data={Data}
          style={{marginBottom: 70}}
          showsVerticalScrollIndicator={false}
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
                No Notification Found
              </Text>
            </View>
          }
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: '#fafafa',
                  marginVertical: 10,
                  paddingVertical: 15,
                  paddingHorizontal: 15,
                  width: '95%',
                  alignSelf: 'center',
                  borderRadius: 5,
                }}
                onPress={() => {
                  if (item.typeComment == 'name') {
                    navigation.navigate('UserProfile', {
                      userId: item.senderId,
                    });
                  }
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <UserCircleIcon color={Colors.primary} size={36} />
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: 'Poppins-Regular',
                        color: Colors.dark,
                        marginLeft: 10,
                        flex: 1,
                      }}>
                      {item.title}
                    </Text>
                    {item.type == 'like' ? (
                      <HeartIcon color={Colors.primary} size={18} />
                    ) : item.type == 'reply' ? (
                      <ChatBubbleOvalLeftIcon
                        color={Colors.primary}
                        size={18}
                      />
                    ) : item.type == 'request' ? (
                      <UserPlusIcon color={Colors.primary} size={18} />
                    ) : null}
                  </View>

                  {item.status === 'read' ? null : (
                    <View
                      style={{
                        backgroundColor: '#97667c',
                        width: 5,
                        height: 5,
                        borderRadius: 5,
                      }}></View>
                  )}
                </View>

                {item.button == 'Pending' ? (
                  <View
                    style={{
                      flex: 1,
                      width: '95%',
                      alignSelf: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: Colors.primary,
                        width: '45%',
                        paddingVertical: 8,
                        borderRadius: 5,
                        marginTop: 10,
                      }}
                      onPress={() =>
                        AcceptFriend(
                          'accept',
                          item.senderId,
                          item.notificationId,
                        )
                      }>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Medium',
                          textAlign: 'center',
                          color: Colors.light,
                          fontSize: 12,
                        }}>
                        Accept
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: Colors.dark,
                        width: '45%',
                        paddingVertical: 8,
                        borderRadius: 5,
                        marginTop: 10,
                      }}
                      onPress={() =>
                        AcceptFriend(
                          'reject',
                          item.senderId,
                          item.notificationId,
                        )
                      }>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Medium',
                          textAlign: 'center',
                          color: Colors.light,
                          fontSize: 12,
                        }}>
                        Reject
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Notification;
