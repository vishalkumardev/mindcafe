import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';

const Splash = ({navigation}) => {
  const getUser = async () => {
    const user = await AsyncStorage.getItem('Userid');
    if (user === '' || user === null || user === undefined) {
      navigation.navigate('Onboarding');
    } else {
      navigation.navigate('Main');
    }
  };
  useEffect(() => {
    setTimeout(() => {
      getUser();
    }, 3000);
  }, []);

  return (
    <View style={styles.Container}>
      <Animatable.Image
        source={require('../assets/logo.png')}
        style={styles.Image}
        resizeMode="contain"
        animation="zoomInUp"
        duration={3000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAEDE4',
  },
  Image: {
    width: '60%',
  },
});

export default Splash;
