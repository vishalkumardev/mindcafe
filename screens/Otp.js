import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {KeyIcon} from 'react-native-heroicons/solid';
import Global from './utitiles/Global';
import {Colors} from './utitiles/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OneSignal from 'react-native-onesignal';

const Otp = ({navigation, route}) => {
  const {phone, otp} = route.params;
  const [Otp, setOtp] = useState('');
  const [Loading, setLoading] = useState(false);
  const [VerificationOtp, setVerificationOtp] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    if (Otp == VerificationOtp) {
      setLoading(true);
      const device = await OneSignal.getDeviceState();

      const player_id = device.userId;
      const response = await fetch(
        Global.BASE_URL + `otpVerify&phone=${phone}&deviceId=${player_id}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
          },
        },
      );
      const data = await response.json();
      setLoading(false);
      if (data.response.status === 1) {
        navigation.navigate('Main');
        AsyncStorage.setItem('Userid', data.response.userId);
      } else {
        Alert.alert(data.response.message);
      }
    } else {
      Alert.alert('You have entred Wrong Otp');
    }
  };

  const Resend = async () => {
    const response = await fetch(Global.BASE_URL + `resendOtp&phone=${phone}`);
    const data = await response.json();
    if (data.response.status == 1) {
      Alert.alert('Otp has been Sent Successfully');
      setVerificationOtp(data.response.otp);
    }
  };

  useEffect(() => {
    setVerificationOtp(otp);
  }, []);

  return (
    <View style={styles.Container}>
      <Modal animationType="slide" transparent={true} visible={Loading}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator color="#121A3A" size={'large'} />
          </View>
        </View>
      </Modal>

      <Image
        source={require('../assets/logo.png')}
        style={styles.Image}
        resizeMode="contain"
      />
      <View style={styles.form_container}>
        <View style={styles.input_container}>
          <KeyIcon color="#121A3A" size={24} style={styles.TextInput} />
          <TextInput
            placeholder="Enter your Otp"
            keyboardType="number-pad"
            onChangeText={setOtp}
            value={otp}
            style={{flex: 1, color: Colors.dark}}
            placeholderTextColor={Colors.dark}
            maxLength={6}
          />
        </View>
        <TouchableOpacity onPress={Resend}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontFamily: 'Poppins-SemiBold',
              textDecorationLine: 'underline',
              color: Colors.secondary,
            }}>
            Resend OTP
          </Text>
        </TouchableOpacity>
        <View style={{marginVertical: '8%'}}>
          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btn_text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAEDE4',
  },
  Image: {
    width: 200,
    height: 200,
  },
  heading_3: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#121A3A',
  },
  heading_4: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#121A3A',
    textDecorationLine: 'underline',
  },
  btn: {
    backgroundColor: '#121A3A',
    paddingVertical: 15,
    margin: 10,
    borderRadius: 15,
  },
  btn_text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  text_container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 10,
  },
  input_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 15,
    marginVertical: 10,
  },
  form_container: {
    width: '90%',
  },
  TextInput: {
    marginHorizontal: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    opacity: 0.5,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
  },
});

export default Otp;
