import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {BookOpenIcon} from 'react-native-heroicons/outline';
import Global from '../utitiles/Global';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Mymind = ({navigation}) => {
  const [Courses, setCourses] = useState([]);
  const getCourses = async () => {
    const user = await AsyncStorage.getItem('Userid');
    const response = await fetch(Global.BASE_URL + `courseList&userId=${user}`);
    const data = await response.json();
    setCourses(data.myMind);
  };

  useEffect(() => {
    getCourses();
  }, []);
  const PostItem = ({item}) => {
    return (
      <View style={styles.main_container}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CourseDetails', {
              id: item.programId,
              name: item.title,
              upcoming:0
            })
          }>
          <Image
            source={{uri: item.img}}
            resizeMode="cover"
            style={styles.Courses_img}
          />
        </TouchableOpacity>
        <View style={styles.container_1}>
          <View>
            <Text style={styles.course_name}>{item.title}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <Image
                source={{uri: item.expertImg}}
                style={{borderRadius: 15, height: 30, width: 30,marginVertical:10, marginRight:10}}
              />
              <Text style={styles.author_name}>{item.expert}</Text>
            </View>
          </View>
          <View style={styles.container_2}>
            <BookOpenIcon color="#000" size={24} />
            <Text style={styles.course_session}>{item.session} Lessons</Text>
          </View>
          <Text
            style={{
              fontSize: 13,
              fontFamily: 'Poppins-Regular',
              color: Colors.dark,
            }}>
            Progress {'    ' + item.progress}%
          </Text>
          <View style={{backgroundColor: '#fafafa', height: 10, marginTop: 10}}>
            <View
              style={{
                width: `${item.progress}%`,
                backgroundColor: '#97667c',
                height: 5,
              }}></View>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate('CourseDetails', {
                id: item.programId,
                name: item.title,
                check: item.checkSubscription,
                upcoming:0
              })
            }>
            <Text style={styles.btn_text}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.Container}>
      <FlatList
        refreshing={false}
        onRefresh={getCourses}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontFamily: 'Poppins-Medium',
              marginTop: 50,
              color: Colors.dark,
            }}>
            You Have not Purchased any Mind Treat
          </Text>
        }
        data={Courses}
        renderItem={({item}) => <PostItem item={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  main_container: {
    alignSelf: 'center',
    width: '95%',
    borderRadius: 15,
    backgroundColor: '#fff',
    marginVertical: 10,
    paddingBottom: 15,
  },

  Image: {
    width: '100%',
    borderRadius: 15,
  },
  container_1: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 5,
  },
  container_2: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  course_name: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    color: Colors.dark,
  },
  author_name: {
    marginLeft: 5,
    fontSize: 13,
    color: '#A37589',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark,
  },
  course_session: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Poppins-Medium',
    color: Colors.dark,
  },
  btn: {
    marginTop: 10,
    backgroundColor: '#121A3A',
    borderRadius: 10,
    padding: 10,
    fontFamily: 'Poppins-Regular',
  },
  btn_text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Poppins-Regular',
  },
  Courses_img: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  Courses_img: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
});

export default Mymind;
