import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {XCircleIcon} from 'react-native-heroicons/solid';
const Failure = ({route, navigation}) => {
  return (
    <View
      style={{
        backgroundColor: '#EE5F4F',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <XCircleIcon color="#fff" size={200} style={{alignSelf: 'center'}} />
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            fontWeight: '700',
            color: '#fff',
          }}>
          Your Order has been Failed.
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            padding: 15,
            marginTop: 50,
            borderRadius: 10,
          }}
          onPress={() => navigation.goBack()}>
          <Text
            style={{
              fontSize: 14,
              textAlign: 'center',
              color: '#000',
            }}>
            Try Again
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Failure;
