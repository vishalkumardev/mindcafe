import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {XMarkIcon} from 'react-native-heroicons/solid';
import Global from './utitiles/Global';
import {Colors} from './utitiles/Colors';

const Notification = ({navigation}) => {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const getNotification = async () => {
    setLoading(true);
    const user = await AsyncStorage.getItem('Userid');
    const response = await fetch(
      Global.BASE_URL + `notification&userId=${user}`,
    );
    const data = await response.json();
    setData(data.response);
    await fetch(Global.BASE_URL + `updateNotification&userId=${user}`);
    setLoading(false);
  };
  useEffect(() => {
    getNotification();
  }, []);
  return (
    <View>
      <View
        style={{
          backgroundColor: '#fafafa',
          paddingVertical: 15,
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 14,
            fontFamily: 'Poppins-Medium',
            color: Colors.dark,
          }}>
          Notification
        </Text>
        <XMarkIcon color="#000" size={24} onPress={() => navigation.goBack()} />
      </View>
      {Loading == true ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '40%',
          }}>
          <ActivityIndicator color="#121A3A" size={'large'} />
        </View>
      ) : (
        <FlatList
          data={Data}
          ListEmptyComponent={
            <View>
              <Text
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: 'Poppins-SemiBold',
                  marginTop: 30,
                  color: Colors.dark,
                }}>
                No Notification Found
              </Text>
            </View>
          }
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  backgroundColor: '#fafafa',
                  marginVertical: 10,
                  paddingVertical: 15,
                  paddingHorizontal: 15,
                  width: '90%',
                  alignSelf: 'center',
                  borderRadius: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                onPress={() =>
                  navigation.navigate('UserProfile', {
                    userId: item.senderId,
                  })
                }>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: 'Poppins-Regular',
                    color: Colors.dark,
                  }}>
                  {item.title}
                </Text>
                {item.status === 'read' ? null : (
                  <View
                    style={{
                      backgroundColor: '#97667c',
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                    }}></View>
                )}
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Notification;
