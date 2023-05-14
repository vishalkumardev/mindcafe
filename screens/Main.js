import React, {useEffect} from 'react';
import {View, StyleSheet, BackHandler, Alert} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  UserCircleIcon,
  EnvelopeIcon,
  BookOpenIcon,
  HomeIcon,
  AcademicCapIcon,
} from 'react-native-heroicons/solid';
import Profile from './Profile';
import Home from './Home';
import Message from './Message';
import Qualification from './Qualification';
import MindStack from './Mindtreat/MindStack';

const Main = () => {
  const Tab = createBottomTabNavigator();
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#121A3A',
          tabBarLabelStyle: {
            fontSize: 10,
            fontFamily: 'Poppins-SemiBold',
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => <HomeIcon color={color} size={26} />,
          }}
        />
        <Tab.Screen
          name="Message"
          component={Message}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => <EnvelopeIcon color={color} size={24} />,
          }}
        />
        <Tab.Screen
          name="Mind Treats"
          component={MindStack}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => <BookOpenIcon color={color} size={24} />,
          }}
        />
        <Tab.Screen
          name="Experts"
          component={Qualification}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => (
              <AcademicCapIcon color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarIcon: ({color}) => <UserCircleIcon color={color} size={24} />,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({});

export default Main;
