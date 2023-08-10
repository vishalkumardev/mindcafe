import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {BookOpenIcon} from 'react-native-heroicons/outline';
import Global from '../utitiles/Global';
import {Colors} from '../utitiles/Colors';

const Allmind = ({navigation}) => {
  const [Courses, setCourses] = useState([]);
  const [Loading, setLoading] = useState(false);
  const getCourses = async () => {
    setLoading(true);
    const response = await fetch(Global.BASE_URL + `courseList`);
    const data = await response.json();
    setCourses(data.allmind);
    setLoading(false);
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
                style={{borderRadius: 15, height: 30, width: 30}}
              />
              <Text style={styles.author_name}>{item.expert}</Text>
            </View>
          </View>
          <View style={styles.container_2}>
            <BookOpenIcon color="#000" size={24} />
            <Text style={styles.course_session}>{item.session} Lessons</Text>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              navigation.navigate('CourseDetails', {
                id: item.programId,
                name: item.title,
              })
            }>
            <Text style={styles.btn_text}>Start Mind Treat</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <>
      {Loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color="#121A3A" size={'large'} />
        </View>
      ) : (
        <View style={styles.Container}>
          <FlatList
            data={Courses}
            renderItem={({item}) => <PostItem item={item} />}
            keyExtractor={item => item.programId}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </>
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
    margin: 0,
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
    fontSize: 16,
    fontWeight: '600',
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
});

export default Allmind;
