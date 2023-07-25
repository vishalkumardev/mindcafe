import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Therapy from './Therapy';
import Booking from './Booking';
import DateandTime from './DateandTime';
import Feedback from './Feedback';

const Stack = createNativeStackNavigator();
const TherapyStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Therapy" component={Therapy} />
      <Stack.Screen name="Booking" component={Booking} />
      <Stack.Screen name="DateandTime" component={DateandTime} />
      <Stack.Screen name="Feedback" component={Feedback} />
    </Stack.Navigator>
  );
};

export default TherapyStack;

const styles = StyleSheet.create({});
