import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Modal,
  TextInput,
  Share,
} from 'react-native';
import {
  UserCircleIcon,
  HeartIcon,
  ChatBubbleOvalLeftIcon,
  ShareIcon,
  XMarkIcon,
} from 'react-native-heroicons/outline';
import {EllipsisVerticalIcon, LinkIcon} from 'react-native-heroicons/solid';
import Global from '../utitiles/Global';
import {Colors} from '../utitiles/Colors';

const PostItem = ({item, index, userId, PostLike}) => {
  console.log(item);
  const [PostToggle, setPostToggle] = useState(false);
  const [PostInput, setPostInput] = useState('');
  const [PostId, setPostId] = useState('');
  const [Data, setData] = useState([]);
  const [Toggle, setToggle] = useState(false);
  const [selectedIndex, setselectedIndex] = useState(0);
  const navigation = useNavigation();
  const SharePostToogle = (content, postId) => {
    setPostToggle(true);
    setPostInput(content);
    setPostId(postId);
  };

  const SharePost = async () => {
    const response = await fetch(
      Global.BASE_URL +
        `sharePost&postId=${PostId}&userId=${userId}&description=${PostInput}`,
    );
    ToastAndroid.show('Post Shared !', ToastAndroid.SHORT);
    setPostToggle(false);
  };

  useEffect(() => {
    setData(item);
  });

  return (
    <View>
      <View style={styles.main_container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={styles.container_1}>
            {Data.profileImg == null || Data.type == 'anom' ? (
              <UserCircleIcon color="#A37589" size={32} />
            ) : (
              <Image
                source={{uri: Data.profileImg}}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  resizeMode: 'center',
                }}
              />
            )}

            <View style={styles.container_2}>
              {Data.type == 'anom' && Data.shared == 'yes' ? (
                <Text style={styles.text_name}>
                  {Data.user} Shared Anonymous Post
                </Text>
              ) : Data.type == 'anom' ? (
                <Text style={styles.text_name}>Anonymous</Text>
              ) : (
                <Text style={styles.text_name}>{Data.user}</Text>
              )}
              <Text style={styles.text_time}>{Data.time}</Text>
            </View>
          </View>
          {userId == item.userId ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditPost', {
                  item: Data,
                })
              }>
              <EllipsisVerticalIcon color="#97667c" size={24} />
            </TouchableOpacity>
          ) : null}
        </View>

        {Data.content == undefined ? null : (
          <View style={styles.container_3}>
            {Toggle && selectedIndex == index ? (
              <Text
                style={{
                  textAlign: 'justify',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  color: Colors.dark,
                }}>
                {Data.content + '    '}
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 12,
                    marginTop: 10,
                    color: Colors.primary,
                  }}
                  onPress={() => {
                    setToggle(false);
                  }}>
                  See less
                </Text>
              </Text>
            ) : (
              <Text
                style={{
                  textAlign: 'justify',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  color: Colors.dark,
                }}>
                {Data.content.slice(0, 300)}
                {Data.content.length > 300 ? (
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 12,
                      marginTop: 10,
                      color: Colors.primary,
                    }}
                    onPress={() => {
                      setToggle(true);
                      setselectedIndex(index);
                    }}>
                    {' ' + '......' + '   '} See more
                  </Text>
                ) : null}
              </Text>
            )}
          </View>
        )}
        {Data.img == null ? (
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
        <View style={styles.container_4}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => PostLike(Data.postId, index)}>
              {Data.userLike == 1 || Data.holdLike == 1 ? (
                <HeartIcon size={24} style={styles.icon} fill="#97667c" />
              ) : (
                <HeartIcon color="#A37589" size={24} style={styles.icon} />
              )}
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 12,
                color: Colors.dark,
              }}>
              {Data.like} Likes
            </Text>
          </View>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() =>
              navigation.navigate('Comments', {
                postid: Data.postId,
              })
            }>
            <ChatBubbleOvalLeftIcon
              color="#A37589"
              size={24}
              style={styles.icon}
            />
            {Data.comment == null ? (
              <></>
            ) : (
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: 12,
                  color: Colors.dark,
                }}>
                {Data.comment} Comments
              </Text>
            )}
          </TouchableOpacity>
          {Data.shared == 'yes' ? null : (
            <TouchableOpacity
              onPress={() => SharePostToogle(Data.content, Data.postId)}>
              <ShareIcon color="#97667c" size={19} style={{marginLeft: 10}} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() =>
              Share.share({
                message: `https://mindcafe.app/happining.php#${Data.postId}`,
              })
            }>
            <LinkIcon color="#97667c" size={20} style={{marginLeft: 15}} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={PostToggle}
        onRequestClose={() => setPostToggle(false)}>
        <View style={styles.PostView}>
          <View style={styles.PostmodalView}>
            <XMarkIcon
              color="#000"
              size={30}
              style={{position: 'absolute', top: 5, right: 20}}
              onPress={() => setPostToggle(false)}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingHorizontal: 15,
                paddingVertical: 5,
                backgroundColor: '#FAFAFA',
              }}>
              <TextInput
                placeholder="How are you feel ?"
                style={{
                  flex: 1,
                  fontFamily: 'Poppins-Regular',
                  color: Colors.dark,
                }}
                value={PostInput}
                onChangeText={setPostInput}
                multiline
                placeholderTextColor={Colors.dark}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: '#97667c',
                paddingHorizontal: 20,
                paddingVertical: 5,
                marginTop: 15,
                borderRadius: 1,
                alignSelf: 'flex-start',
              }}
              onPress={SharePost}>
              <Text style={{fontFamily: 'Poppins-Regular', color: '#fff'}}>
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
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
    marginHorizontal: 12,
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

export default PostItem;
