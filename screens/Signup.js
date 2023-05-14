import React, {useState} from 'react';
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
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  PhoneIcon,
} from 'react-native-heroicons/solid';
import {getUniqueId} from 'react-native-device-info';
import {Colors} from './utitiles/Colors';
import Global from './utitiles/Global';
const {height} = Dimensions.get('window');

const Signup = ({navigation}) => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [MobileNumber, setMobileNumber] = useState();
  const [Name, setName] = useState('');
  const [Loading, setLoading] = useState(false);

  const handleLogin = async e => {
    var validRegex = /\S+@\S+\.\S+/;
    e.preventDefault();
    if (!Email.match(validRegex)) {
      Alert.alert('Please Enter Valid Email Id');
    } else if (MobileNumber.length < 10) {
      Alert.alert('Please Enter Valid Phone Number');
    } else if (Name.length <= 3) {
      Alert.alert('Please Enter Valid Name');
    } else if (Password.length <= 5) {
      Alert.alert('Password Should contain 6 characters');
    } else {
      setLoading(true);
      const deviceId = await getUniqueId();
      const response = await fetch(
        Global.BASE_URL +
          `createAccount&name=${Name}&email=${Email}&phone=${MobileNumber}&password=${Password}&deviceId=${deviceId}`,
      );
      const data = await response.json();
      setLoading(false);
      if (data.response.status === 1) {
        navigation.navigate('Otp', {
          phone: MobileNumber,
          otp: data.response.otp,
        });
      } else {
        Alert.alert(data.response.message);
      }
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#FAEDE4'}}>
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
            <UserIcon color="#121A3A" size={24} style={styles.TextInput} />
            <TextInput
              placeholder="Enter your Name"
              keyboardType="default"
              onChangeText={setName}
              value={Name}
              style={{flex: 1, color: Colors.dark}}
              placeholderTextColor={Colors.dark}
            />
          </View>
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
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <PhoneIcon color="#121A3A" size={24} style={styles.TextInput} />
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Poppins-Regular',
                  borderColor: '#97667C',
                  borderRightWidth: 3,
                  marginRight: 10,
                  color: Colors.dark,
                }}>
                +91{'  '}
              </Text>
            </View>

            <TextInput
              placeholder="Enter your Mobile Number"
              keyboardType="number-pad"
              value={MobileNumber}
              onChangeText={setMobileNumber}
              style={{flex: 1, color: Colors.dark}}
              placeholderTextColor={Colors.dark}
              maxLength={10}
            />
          </View>
          <View style={styles.input_container}>
            <LockClosedIcon
              color="#121A3A"
              size={24}
              style={styles.TextInput}
            />
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
              <Text style={styles.btn_text}>Register</Text>
            </TouchableOpacity>
            <View style={styles.text_container}>
              <Text style={styles.heading_3}>Already have an Account ? </Text>
              <Text
                style={styles.heading_4}
                onPress={() => navigation.navigate('Login')}>
                Login
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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

export default Signup;
