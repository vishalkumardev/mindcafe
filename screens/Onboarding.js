import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';

const Onboarding = ({navigation}) => {
  useEffect(() => {
    const unsuscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      Alert.alert('Alert!', 'Are you Want to exit this app ?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => BackHandler.exitApp()},
      ]);
    });
    return unsuscribe;
  }, [navigation]);

  return (
    <View style={styles.Container}>
      <View>
        <Image
          source={require('../assets/background.png')}
          style={{height: 400}}
          resizeMode="contain"
        />
      </View>
      <View>
        <Text style={styles.heading_1}>Resolve all your Mental</Text>
        <Text style={styles.heading_2}>Problem</Text>
      </View>
      <View style={{marginVertical: '8%'}}>
        <Text style={styles.heading_3}>Take a break, let's get Started</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.btn_text}>Create an Account</Text>
        </TouchableOpacity>
        <View style={styles.text_container}>
          <Text style={styles.heading_3}>Already have an Account ? </Text>
          <Text
            style={styles.heading_4}
            onPress={() => navigation.navigate('Login')}>
            Sign In
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAEDE4',
  },
  heading_1: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '500',
    fontFamily: 'Poppins-SemiBold',
    color: '#121A3A',
  },
  heading_2: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '600',
    color: '#121A3A',
    textTransform: 'uppercase',
    fontFamily: 'Poppins-SemiBold',
  },
  heading_3: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#121A3A',
    fontFamily: 'Poppins-Medium',
  },
  heading_4: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#121A3A',
    fontFamily: 'Poppins-Medium',
    textDecorationLine: 'underline',
  },
  btn: {
    backgroundColor: '#121A3A',
    paddingVertical: 15,
    margin: 10,
    borderRadius: 30,
  },
  btn_text: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
  text_container: {
    flexDirection: 'row',
  },
});

export default Onboarding;
