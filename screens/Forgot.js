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

const Forgot = ({navigation}) => {
  const [Email, setEmail] = useState('');
  const [Loading, setLoading] = useState(false);

  const handleLogin = async e => {
    var validRegex = /\S+@\S+\.\S+/;
    e.preventDefault();
    if (!Email.match(validRegex)) {
      Alert.alert('Please Enter Valid Email Id');
    } else {
      setLoading(true);
      const response = await fetch(
        `https://www.mindcafe.app/forgetPasswordApi.php?email=${Email}`,
      );
      const data = await response.json();
      Alert.alert(data.response.message);
      navigation.navigate('Login');
      setLoading(false);
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

        <View style={{marginVertical: '8%'}}>
          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btn_text}> Send Reset Link</Text>
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

export default Forgot;
