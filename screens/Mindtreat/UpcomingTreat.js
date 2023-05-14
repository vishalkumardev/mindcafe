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

const UpcomingTreat = ({navigation}) => {
  const [Courses, setCourses] = useState([]);
  const getCourses = async () => {
    const user = await AsyncStorage.getItem('Userid');
    const response = await fetch(Global.BASE_URL + `courseList&userId=${user}`);
    const data = await response.json();
    setCourses(data.upComing);
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
            })
          }>
          <Image
            source={{uri: item.img}}
            resizeMode="cover"
            style={styles.Courses_img}
          />
        </TouchableOpacity>
        <View style={styles.container_1}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Poppins-Medium',
              marginTop: 10,
              width: '100%',
              textAlign: 'justify',
              color: Colors.dark,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Poppins-Regular',
              width: '100%',
              textAlign: 'justify',
              color: Colors.dark,
            }}>
            {item.shortContent}
          </Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate('CourseDetails', {
                id: item.programId,
                name: item.title,
              })
            }>
            <Text style={styles.btn_text}>Upcoming</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.Container}>
      <FlatList
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
    flex: 1,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    textAlign: 'justify',
    marginTop: 10,
  },
  author_name: {
    marginLeft: 5,
    fontSize: 13,
    color: '#A37589',
    fontFamily: 'Poppins-SemiBold',
  },
  course_session: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
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
    fontSize: 13,
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
export default UpcomingTreat;
