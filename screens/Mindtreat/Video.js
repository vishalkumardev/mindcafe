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
import {WebView} from 'react-native-webview';
import Global from '../utitiles/Global';

const Video = ({navigation, route}) => {
  const {url, id} = route.params;
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
  return (
    <>
      <WebView
        originWhitelist={['*']}
        source={{
          uri: url,
        }}
      />
      {id == 'false' ? null : (
        <TouchableOpacity
          style={{backgroundColor: '#97667c', paddingVertical: 15}}
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
      )}
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
  },
  div: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});

export default Video;
