import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './screens/Splash';
import Onboarding from './screens/Onboarding';
import Login from './screens/Login';
import CourseDetails from './screens/Mindtreat/CourseDetails';
import ExpertDetails from './screens/ExpertDetails';
import Success from './screens/Mindtreat/Success';
import Failure from './screens/Mindtreat/Failure';
import Chatscreen from './screens/Chatscreen';
import OneSignal from 'react-native-onesignal';
import Sessions from './screens/Sessions';
import Video from './screens/Mindtreat/Video';
import Quiz from './screens/Mindtreat/Quiz';
import Content from './screens/Mindtreat/Content';
import CreatePost from './screens/CreatePost';
import Comment from './screens/components/Comment';
import Search from './screens/searchScreen/Search';
import UserProfile from './screens/searchScreen/UserProfile';
import Notification from './screens/Notification';
import Signup from './screens/Signup';
import Main from './screens/Main';
import Social from './screens/Social';
import EditPost from './screens/EditPost';
import Otp from './screens/Otp';

export default function App() {
  useEffect(() => {
    OneSignal.setAppId('112eb03b-0338-4c25-b143-b85e8586f2f1');
    OneSignal.promptForPushNotificationsWithUserResponse();

    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        let notification = notificationReceivedEvent.getNotification();
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        notificationReceivedEvent.complete(notification);
      },
    );
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('OneSignal: notification opened:', notification);
    });
  }, []);

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 16,
          },
        }}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
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
          name="EditPost"
          component={EditPost}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
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
          name="Main"
          component={Main}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Social" component={Social} />
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
        <Stack.Screen name="Sessions" component={Sessions} />
        <Stack.Screen name="Content" component={Content} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="Video" component={Video} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
