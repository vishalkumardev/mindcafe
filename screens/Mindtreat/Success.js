import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {CheckBadgeIcon} from 'react-native-heroicons/solid';
const Success = ({route, navigation}) => {
  const {price} = route.params;
  return (
    <View
      style={{
        backgroundColor: '#97667C',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <CheckBadgeIcon color="#fff" size={200} style={{alignSelf: 'center'}} />
        <Text
          style={{
            fontSize: 28,
            textAlign: 'center',
            fontWeight: '700',
            color: '#fff',
          }}>
          Rs. {price}
        </Text>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            fontWeight: '700',
            color: '#fff',
          }}>
          Your Order has been Placed
        </Text>
        <Text
          style={{
            fontSize: 24,
            textAlign: 'center',
            fontWeight: '700',
            color: '#fff',
            marginTop: 10,
          }}>
          Thank you
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            padding: 20,
            marginVertical: 20,
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate('My Mind Treats')}>
          <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
              color: '#97667C',
              fontWeight: '700',
            }}>
            Enjoy the Program
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Success;
