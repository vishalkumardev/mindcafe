import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import Global from '../utitiles/Global';
import {Colors} from '../utitiles/Colors';

const Content = ({route, navigation}) => {
  const {description, id} = route.params;
  const markAsCompleted = async () => {
    const user = await AsyncStorage.getItem('Userid');
    const response = await fetch(
      Global.BASE_URL + `markComplete&contentId=${id}&userId=${user}`,
    );
    const data = await response.json();
    if (data.response.status == 1) {
      ToastAndroid.show('Mark Completed', ToastAndroid.SHORT);
      navigation.goBack();
    }
  };

  console.log(typeof description)
  return (
    <>
      <ScrollView style={{flex: 1, paddingHorizontal: 15, marginVertical: 15}}>
        <HTMLView value={description} stylesheet={styles} />
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: '#97667c',
          paddingVertical: 15,
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
        onPress={markAsCompleted}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#fff',
            textAlign: 'center',
            fontFamily: 'Poppins-Medium',
          }}>
          Marks as Completed
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366',
    fontFamily: 'Poppins-SemiBold', // make links coloured pink
  },
  p: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark,
  },
  div: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark,
  },
  b: {
    color: Colors.dark,
  },
});

export default Content;
