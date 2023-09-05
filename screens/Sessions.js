import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  ArrowRightIcon,
} from 'react-native-heroicons/outline';
import Global from './utitiles/Global';
import {Colors} from './utitiles/Colors';

const Sessions = ({navigation, route}) => {
  const {id} = route.params;
  const [Content, setContent] = useState([]);
  const [SubContent, setSubContent] = useState(0);
  const [Toggle, setToggle] = useState(false);
  const [Loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const response = await fetch(
      Global.BASE_URL + `courseDetail&programId=${id}`,
    );
    const data = await response.json();
    setContent(data.response.content);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const navigateToScreen = (type, video_url, description, sub_id) => {
    if (type === 'video') {
      navigation.navigate('Video', {
        url: video_url,
        id: sub_id,
      });
    } else if (type === 'quiz') {
      navigation.navigate('Quiz', {
        id: sub_id,
      });
    } else if (type === 'content') {
      navigation.navigate('Content', {
        description: description,
        id: sub_id,
      });
    }
  };

  return (
    <>
      {Loading ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color="#121A3A" size={'large'} />
        </View>
      ) : (
        <View>
          <FlatList
            data={Content}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#fafafa',
                    paddingVertical: 15,
                    paddingHorizontal: 15,
                    marginVertical: 10,
                    width: '95%',
                    alignSelf: 'center',
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    setToggle(!Toggle);
                    setSubContent(index + 1);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '600',
                        fontFamily: 'Poppins-Regular',
                        flex: 1,
                        color: Colors.dark,
                      }}>
                      {item.title}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setToggle(!Toggle);
                        setSubContent(index + 1);
                      }}>
                      {Toggle && SubContent == index + 1 ? (
                        <ChevronDoubleUpIcon color={'#97667c'} size={16} />
                      ) : (
                        <ChevronDoubleDownIcon color={'#97667c'} size={16} />
                      )}
                    </TouchableOpacity>
                  </View>
                  {Toggle && SubContent == index + 1 ? (
                    <FlatList
                      data={item.session}
                      style={{marginVertical: 10}}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '95%',
                            marginVertical: 10,
                            paddingVertical: 16,
                            paddingHorizontal: 15,
                            backgroundColor: '#FFF',
                            alignItems: 'center',
                            borderRadius: 10,
                            alignSelf: 'flex-end',
                          }}
                          onPress={() =>
                            navigateToScreen(
                              item.type,
                              item.video,
                              item.description,
                              item.subContentId,
                            )
                          }>
                          <Text
                            style={{
                              fontSize: 13,
                              fontFamily: 'Poppins-Regular',
                              color: Colors.dark,
                            }}>
                            {item.title}
                          </Text>
                          <ArrowRightIcon color="#97667c" size={16} />
                        </TouchableOpacity>
                      )}
                    />
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default Sessions;
