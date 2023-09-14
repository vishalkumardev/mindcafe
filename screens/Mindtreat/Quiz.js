import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import QuestionItem from './QuestionItem';
import Global from '../utitiles/Global';
import {Colors} from '../utitiles/Colors';
const {width, height} = Dimensions.get('window');

const Quiz = ({navigation, route}) => {
  const {id} = route.params;
  console.log(id);
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [CurrentIndex, setCurrentIndex] = useState(1);
  const [Marks, setMarks] = useState(0);
  const [Toggle, setToggle] = useState(false);
  const [AnsToggle, setAnsToggle] = useState(false);
  const ListRef = useRef();

  const onSeleceted = (index, x) => {
    let tempData = Data;
    tempData.map((item, ind) => {
      if (index === ind) {
        item.marked = x;
      }
    });

    let temp = [];
    tempData.map(item => {
      temp.push(item);
    });
    setData(temp);
  };

  const markAsCompleted = async () => {
    const user = await AsyncStorage.getItem('Userid');
    const response = await fetch(
      Global.BASE_URL + `markComplete&contentId=${id}&userId=${user}`,
    );
    const data = await response.json();
  };

  const GetScore = () => {
    Alert.alert('', 'Are you want to submit your answer ?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          let marks = 0;
          Data.map(item => {
            if (item.marked == item.answer) marks = marks + 5;
          });
          setMarks(marks);
          setToggle(true);
        },
      },
    ]);
    markAsCompleted();
  };
  const getData = async () => {
    setLoading(true);
    const response = await fetch(Global.BASE_URL + `quiz&subContentId=${id}`);
    const data = await response.json();
    setData(data.response);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {Loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color="#121A3A" size={'large'} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: 16,
              marginTop: 20,
              marginLeft: 20,
              color: Colors.dark,
            }}>
            Questions:{CurrentIndex}/{Data.length}
          </Text>
          <View style={{marginTop: 10}}>
            <FlatList
              data={Data}
              ref={ListRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              onScroll={e => {
                const x = e.nativeEvent.contentOffset.x / width + 1;
                setCurrentIndex(Math.round(x));
              }}
              renderItem={({item, index}) => (
                <QuestionItem
                  AnsToggle={AnsToggle}
                  selectedOption={x => {
                    onSeleceted(index, x);
                  }}
                  data={item}
                />
              )}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 30,
              width: '90%',
              alignSelf: 'center',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: CurrentIndex > 1 ? '#97667C' : '#FAFAFA',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 5,
                }}
                onPress={() => {
                  if (CurrentIndex > 1) {
                    ListRef.current.scrollToIndex({
                      animated: true,
                      index: CurrentIndex - 2,
                    });
                  }
                }}>
                <Text
                  style={{
                    color: CurrentIndex > 1 ? '#FFF' : '#000',
                    fontSize: 16,
                  }}>
                  Previous
                </Text>
              </TouchableOpacity>
              {CurrentIndex == Data.length && AnsToggle == false ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: 'green',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 5,
                  }}
                  onPress={GetScore}>
                  <Text style={{color: '#fff', fontSize: 16}}>Submit</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#97667C',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    if (CurrentIndex < Data.length) {
                      ListRef.current.scrollToIndex({
                        animated: true,
                        index: CurrentIndex,
                      });
                    }
                  }}>
                  <Text style={{color: '#fff', fontSize: 16}}>Next</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Modal animationType="slide" transparent={true} visible={Toggle}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,.5)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#fff',
                  width: '90%',

                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: '600',
                    alignSelf: 'center',
                    marginTop: 20,
                    color: Colors.dark,
                  }}>
                  Your Score
                </Text>
                <Text
                  style={{
                    fontSize: 40,
                    fontWeight: '800',
                    alignSelf: 'center',
                    marginTop: 20,
                    color: '#97667c',
                  }}>
                  {Marks + '/' + Data.length * 5}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    alignSelf: 'center',
                    marginVertical: 20,
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                    color: Colors.dark,
                  }}
                  onPress={() => {
                    setAnsToggle(true);
                    setToggle(false);
                    ListRef.current.scrollToIndex({
                      animated: true,
                      index: 0,
                    });
                  }}>
                  View Answer
                </Text>
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    marginVertical: 30,
                    backgroundColor: '#97667C',
                    paddingHorizontal: 40,
                    paddingVertical: 15,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    setToggle(!Toggle);
                    navigation.goBack();
                  }}>
                  <Text style={{color: '#fff', fontSize: 16}}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default Quiz;
