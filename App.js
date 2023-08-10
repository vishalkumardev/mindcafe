import React, {useEffect} from 'react';
import {UserAuthContextProvider} from './screens/UserAuthContext';
import Stack from './screens/Stack';
import OneSignal from 'react-native-onesignal';
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

  return (
    <UserAuthContextProvider>
      <Stack />
    </UserAuthContextProvider>
  );
}
