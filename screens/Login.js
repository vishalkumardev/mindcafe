import React, {useState, useContext} from 'react';
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
import {EnvelopeIcon, LockClosedIcon} from 'react-native-heroicons/solid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Global from './utitiles/Global';
import {Colors} from './utitiles/Colors';
import OneSignal from 'react-native-onesignal';
import {UserAuthContext} from './UserAuthContext';

const Login = ({navigation}) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Loading, setLoading] = useState(false);
  const {getUser} = useContext(UserAuthContext);

  const Resend = async phone => {
    const response = await fetch(Global.BASE_URL + `resendOtp&phone=${phone}`);

    const data = await response.json();

    if (data.response.status == 1) {
      navigation.navigate('Otp', {
        phone: phone,
        otp: data.response.otp,
      });
    }
  };

  const handleLogin = async e => {
    var validRegex = /\S+@\S+\.\S+/;
    e.preventDefault();
    if (Password.length <= 5) {
      Alert.alert('Password Should be minimum 6 Character');
    } else if (!Email.match(validRegex)) {
      Alert.alert('Please Enter Valid Email Id');
    } else {
      setLoading(true);
      const device = await OneSignal.getDeviceState();
      const player_id = device.userId;
      const response = await fetch(
        Global.BASE_URL +
          `login&email=${Email}&password=${Password}&deviceId=${player_id}`,
      );
      const data = await response.json();
      console.log(data);
      setLoading(false);
      if (data.response.status === 1) {
        if (data.response.otpVerify == 1) {
          AsyncStorage.setItem('Userid', data.response.userId);
          AsyncStorage.setItem('UserName', data.response.name);
          AsyncStorage.setItem('type', data.response.type);
          getUser();
          navigation.navigate('Main');
        } else {
          Alert.alert('Your Mobile has not been Verified');
          Resend(data.response.phone);
        }
      } else {
        Alert.alert('User Not Registered');
      }
    }
  };
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
          <EnvelopeIcon color="#121A3A" size={24} style={styles.TextInput} />
          <TextInput
            placeholder="Enter your email"
            keyboardType="email-address"
            onChangeText={setEmail}
            value={Email}
            style={{flex: 1, color: Colors.dark}}
            placeholderTextColor={Colors.dark}
          />
        </View>
        <View style={styles.input_container}>
          <LockClosedIcon color="#121A3A" size={24} style={styles.TextInput} />
          <TextInput
            placeholder="Enter your password"
            keyboardType="default"
            secureTextEntry
            onChangeText={setPassword}
            value={Password}
            style={{flex: 1, color: Colors.dark}}
            placeholderTextColor={Colors.dark}
          />
        </View>
        <View style={{marginVertical: '8%'}}>
          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btn_text}>Login</Text>
          </TouchableOpacity>
          <View style={styles.text_container}>
            <Text style={styles.heading_3}>Don't have an Account ? </Text>
            <Text
              style={styles.heading_4}
              onPress={() => navigation.navigate('Signup')}>
              Register
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
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

export default Login;
