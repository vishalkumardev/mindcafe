import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {StarIcon} from 'react-native-heroicons/solid';
import {Colors} from '../utitiles/Colors';

const Rating = ({value, setValue}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row', marginVertical: 5}}>
      <TouchableOpacity
        onPress={() => setValue(1)}
        style={{marginHorizontal: 2}}>
        <StarIcon color={value >= 1 ? Colors.secondary : 'gray'} size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setValue(2)}
        style={{marginHorizontal: 2}}>
        <StarIcon color={value >= 2 ? Colors.secondary : 'gray'} size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setValue(3)}
        style={{marginHorizontal: 2}}>
        <StarIcon color={value >= 3 ? Colors.secondary : 'gray'} size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setValue(4)}
        style={{marginHorizontal: 2}}>
        <StarIcon color={value >= 4 ? Colors.secondary : 'gray'} size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setValue(5)}
        style={{marginHorizontal: 2}}>
        <StarIcon color={value == 5 ? Colors.secondary : 'gray'} size={24} />
      </TouchableOpacity>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({});
