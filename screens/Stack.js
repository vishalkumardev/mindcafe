import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {UserAuthContext} from './UserAuthContext';
import Splash from './Splash';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from './Onboarding';
import Login from './Login';
import CourseDetails from './Mindtreat/CourseDetails';
import ExpertDetails from './ExpertDetails';
import Success from './Mindtreat/Success';
import Failure from './Mindtreat/Failure';
import Chatscreen from './Chatscreen';
import Sessions from './Sessions';
import Video from './Mindtreat/Video';
import Quiz from './Mindtreat/Quiz';
import Content from './Mindtreat/Content';
import CreatePost from './CreatePost';
import Comment from './components/Comment';
import Search from './searchScreen/Search';
import UserProfile from './searchScreen/UserProfile';
import Notification from './Notification';
import Signup from './Signup';
import Main from './Main';
import Social from './Social';
import EditPost from './EditPost';
import Otp from './Otp';
import Message from './Message';
import ProgressReport from './ProgressReport';
import Forgot from './Forgot';
import {NavigationContainer} from '@react-navigation/native';

const Stack = () => {
  const Stack = createNativeStackNavigator();
  const {User} = useContext(UserAuthContext);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (Loading) return <Splash />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
          },
        }}>
        {User == null ? (
          <>
            <Stack.Screen
              name="Onboarding"
              component={Onboarding}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Otp"
              component={Otp}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Forgot"
              component={Forgot}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={Main}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EditPost"
              component={EditPost}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProgressReport"
              component={ProgressReport}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UserProfile"
              component={UserProfile}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Notification"
              component={Notification}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Social"
              component={Social}
              options={{title: 'Profile'}}
            />
            <Stack.Screen
              name="CourseDetails"
              component={CourseDetails}
              options={({route}) => ({
                title: route.params.name,
                headerTitleStyle: {
                  fontSize: 14,
                  fontWeight: '600',
                },
              })}
            />
            <Stack.Screen
              name="ExpertDetails"
              component={ExpertDetails}
              options={({route}) => ({
                title: route.params.name,
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontSize: 18,
                  fontWeight: '600',
                },
              })}
            />
            <Stack.Screen name="Comments" component={Comment} />
            <Stack.Screen
              name="Success"
              component={Success}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Failure"
              component={Failure}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CreatePost"
              component={CreatePost}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Chatscreen"
              component={Chatscreen}
              options={({route}) => ({
                title: route.params.name,
                headerTitleAlign: 'center',
                headerTitleStyle: {
                  fontSize: 16,
                  fontWeight: '400',
                },
              })}
            />
            <Stack.Screen
              name="Message"
              component={Message}
              options={{headerShown: false}}
            />

            <Stack.Screen name="Sessions" component={Sessions} />
            <Stack.Screen name="Content" component={Content} />
            <Stack.Screen name="Quiz" component={Quiz} />
            <Stack.Screen name="Video" component={Video} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stack;

const styles = StyleSheet.create({});
