import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Modal,
  Alert,
} from 'react-native';
import {
  XMarkIcon,
  UserCircleIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
} from 'react-native-heroicons/outline';
import {PaperAirplaneIcon} from 'react-native-heroicons/solid';
import {Colors} from '../utitiles/Colors';
import Global from '../utitiles/Global';

const Comment = ({navigation, route}) => {
  const {postid} = route.params;
  const [Data, setData] = useState([]);
  const [Input_messsage, setInput_messsage] = useState('');
  const [userId, setuserId] = useState('');
  const [Toggle, setToggle] = useState(false);
  const [Reply, setReply] = useState('');
  const [commentId, setcommentId] = useState('');
  const [type, settype] = useState('anom');
  const [SelectedIndex, setSelectedIndex] = useState(0);

  const getData = async () => {
    const user = await AsyncStorage.getItem('Userid');
    const userName = await AsyncStorage.getItem('UserName');
    setuserId(user);
    const response = await fetch(
      Global.BASE_URL + `viewComment&postId=${postid}`,
    );
    const data = await response.json();
    setData(data.response);
    setButton(userName);
  };

  useEffect(() => {
    getData();
  }, []);

  const PostLike = async (ind, commentId) => {
    const tempData = Data;
    tempData.map((item, index) => {
      if (index == ind) {
        if (item.liked == 0) {
          item.liked = 1;
          item.commentLike++;
        } else if (item.liked == 1) {
          item.liked = 0;
          item.commentLike--;
        }
      }

      let temp = [];
      tempData.map(item => {
        temp.push(item);
      });
      setData(temp);
    });

    const response = await fetch(
      Global.BASE_URL +
        `likeComment&postId=${postid}&userId=${userId}&commentId=${commentId}`,
    );
    const data = await response.json();
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
      label: `User`,
      value: `User`,
      selected: true,
    },
  ]);

  function onPressRadioButton(index) {
    setSelectedIndex(index);
    if (index == 0) {
      settype('anom');
    } else {
      settype('name');
    }
  }

  const PostComment = async () => {
    if (Input_messsage.length <= 2) {
      Alert.alert('Please type Comment !');
    } else {
      const response = await fetch(
        Global.BASE_URL +
          `submitComment&postId=${postid}&userId=${userId}&comment=${Input_messsage}&type=${type}`,
      );
      const data = await response.json();
      if (data.response.status == 1) {
        ToastAndroid.show('Comment Post', ToastAndroid.SHORT);
        getData();
      }
      setInput_messsage('');
    }
  };

  const ReplyComment = async () => {
    if (Reply.length <= 2) {
      Alert.alert('Please type Comment !');
    } else {
      const response = await fetch(
        Global.BASE_URL +
          `submitReply&postId=${postid}&userId=${userId}&commentId=${commentId}&reply=${Reply}&type=${type}`,
      );
      const data = await response.json();
      if (data.response.status == 1) {
        ToastAndroid.show('Comment Post', ToastAndroid.SHORT);
        getData();
      }
      setReply('');
      setToggle(false);
    }
  };

  return (
    <>
      <View>
        <FlatList
          data={Data}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flex: 1,
                  marginVertical: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  backgroundColor: '#fafafa',
                  marginHorizontal: 10,
                  borderRadius: 15,
                  marginBottom: Data.length - 1 == index ? 120 : 0,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <UserCircleIcon color="#A37589" size={32} />
                  <View style={{flexDirection: 'column', marginHorizontal: 10}}>
                    {item.type == 'anom' ? (
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#A37589',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        Anonymous
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#A37589',
                          fontFamily: 'Poppins-SemiBold',
                        }}>
                        {item.user}
                      </Text>
                    )}
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '700',
                        color: '#e1e1e1',
                        fontFamily: 'Poppins-Medium',
                      }}>
                      {item.time}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'Poppins-Regular',
                    color: Colors.dark,
                    marginTop: 10,
                  }}>
                  {item.comment}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => PostLike(index, item.commentId)}>
                    {item.liked === 1 ? (
                      <HeartIcon size={24} style={styles.icon} fill="#97667c" />
                    ) : (
                      <HeartIcon
                        color="#A37589"
                        size={24}
                        style={styles.icon}
                      />
                    )}
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        marginLeft: 4,
                        color: Colors.dark,
                      }}>
                      {item.commentLike} Likes
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 10,
                    }}
                    onPress={() => {
                      setToggle(true);
                      setcommentId(item.commentId);
                    }}>
                    <ChatBubbleOvalLeftIcon
                      color="#A37589"
                      size={24}
                      style={styles.icon}
                    />
                    {item.comment == null ? (
                      <></>
                    ) : (
                      <Text
                        style={{
                          color: Colors.dark,
                          fontFamily: 'Poppins-Regular',
                        }}>
                        {' '}
                        Reply
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
                <View>
                  <FlatList
                    data={item.reply}
                    style={{marginTop: 10}}
                    renderItem={({item}) => {
                      return (
                        <View
                          style={{
                            backgroundColor: '#fff',
                            marginVertical: 5,
                            padding: 10,
                            borderRadius: 10,
                            width: '90%',
                            alignSelf: 'flex-end',
                            paddingHorizontal: 15,
                          }}>
                          <View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <UserCircleIcon color="#A37589" size={32} />
                              <View
                                style={{
                                  flexDirection: 'column',
                                  marginHorizontal: 10,
                                }}>
                                {item.type == 'anom' ? (
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: '#A37589',
                                      fontFamily: 'Poppins-SemiBold',
                                    }}>
                                    Anonymous
                                  </Text>
                                ) : (
                                  <Text
                                    style={{
                                      fontSize: 14,
                                      color: '#A37589',
                                      fontFamily: 'Poppins-SemiBold',
                                    }}>
                                    {item.user_id}
                                  </Text>
                                )}
                              </View>
                            </View>
                            <Text
                              style={{
                                fontSize: 12,
                                fontFamily: 'Poppins-Regular',
                                color: Colors.dark,
                              }}>
                              {item.reply}
                            </Text>
                          </View>
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          paddingHorizontal: 15,
          paddingVertical: 7,
          backgroundColor: '#fafafa',
        }}>
        <TextInput
          placeholder="Type your comment here"
          style={{flex: 1, fontFamily: 'Poppins-Medium', color: Colors.dark}}
          placeholderTextColor={Colors.dark}
          onChangeText={setInput_messsage}
          value={Input_messsage}
          keyboardType="default"
        />
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
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
          <TouchableOpacity onPress={PostComment}>
            <PaperAirplaneIcon color="#97667C" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={Toggle}
        onRequestClose={() => {
          setToggle(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setToggle(false)}>
              <XMarkIcon
                color="#000"
                style={{alignSelf: 'flex-end', marginVertical: 10}}
              />
            </TouchableOpacity>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#97667C',
                minHeight: 100,
                borderRadius: 10,
              }}>
              <TextInput
                placeholder="Write about something"
                multiline
                value={Reply}
                onChangeText={setReply}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  color: Colors.dark,
                }}
                placeholderTextColor={Colors.dark}
              />
            </View>
            <View style={{marginTop: 10}}>
              <View style={{flexDirection: 'row'}}>
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
              onPress={ReplyComment}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#97667c',
                paddingVertical: 10,
                marginVertical: 15,
                width: '30%',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 14,
                  marginRight: 10,
                  fontFamily: 'Poppins-Medium',
                }}>
                Submit
              </Text>
              <PaperAirplaneIcon color="#fff" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    paddingVertical: 10,
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

export default Comment;
