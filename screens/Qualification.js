import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
import {CheckBadgeIcon} from 'react-native-heroicons/solid';
import Global from './utitiles/Global';
const {width, height} = Dimensions.get('window');

const Qualification = ({navigation}) => {
  const [Data, setData] = useState([]);
  const [Courses, setCourses] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
    getCourses();
  }, []);

  const getData = async () => {
    setLoading(true);
    const response = await fetch(Global.BASE_URL + `expertList`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
    const data = await response.json();
    setData(data.response);
    setLoading(false);
  };

  const getCourses = async () => {
    const response = await fetch(Global.BASE_URL + `courseList&userId=2`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });
    const data = await response.json();
    setCourses(data);
  };

  const ExpertCard = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ExpertDetails', {
            img: item.photo,
            name: item.expertName,
            content: item.content,
          })
        }
        style={{width: '45%', marginHorizontal: '1.5%', marginVertical: 20}}>
        <Image
          source={{uri: item.photo}}
          style={{
            width: '100%',

            aspectRatio: 1,
            resizeMode: 'cover',
          }}
        />
        <View
          style={{
            paddingVertical: 5,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#121A3A',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              marginRight: 10,
              textAlign: 'center',
              color: '#fff',
              fontSize: 12,
            }}>
            {item.expertName}
          </Text>
          <CheckBadgeIcon size={28} color="#fff" />
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require('../assets/bg.jpg')}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              color: '#ffff',
              fontFamily: 'Poppins-Regular',
            }}>
            Our Experts
          </Text>
          <Text
            style={{
              fontSize: 12,
              textAlign: 'center',
              color: '#000',
              backgroundColor: '#fff',
              paddingHorizontal: 10,
              fontFamily: 'Poppins-Regular',
            }}>
            "Transform your health and well-being with the help of our team of
            experienced health experts."
          </Text>
        </ImageBackground>
        {Loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color="#121A3A" size={'large'} />
          </View>
        ) : (
          <View style={{flex: 1}}>
            <View style={{width: width, alignSelf: 'center', marginLeft: '2%'}}>
              <FlatList
                numColumns={2}
                data={Data}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.expertName}
                renderItem={({item, index}) => (
                  <ExpertCard item={item} index={index} />
                )}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 15,
    textTransform: 'uppercase',
    fontWeight: '700',
    fontFamily: 'Poppins-Bold',
  },
});

export default Qualification;
