import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Allmind from './Allmind';
import Mymind from './Mymind';
import UpcomingTreat from './UpcomingTreat';

const MindStack = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Poppins-Regular',
        },
      }}>
      <Tab.Screen name="All Mind Treats " component={Allmind} />
      <Tab.Screen name="My Mind Treats" component={Mymind} />
      <Tab.Screen name="Upcoming " component={UpcomingTreat} />
    </Tab.Navigator>
  );
};

export default MindStack;
