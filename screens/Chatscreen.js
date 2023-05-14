import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import {FlagIcon, PaperAirplaneIcon} from 'react-native-heroicons/solid';
import Global from './utitiles/Global';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Chatscreen = ({route}) => {
  const {id} = route.params;
  const [Input_messsage, setInput_messsage] = useState('');
  const [Message, setMessage] = useState([]);
  const [userId, setuserId] = useState(0);

  const sendMessage = async () => {
    if (Input_messsage.length < 1) {
      Alert.alert('Please type valid message');
    }
    const response = await fetch(
      Global.BASE_URL +
        `sendMessage&userId=${userId}&reciverId=${id}&message=${Input_messsage}`,
    );
    Message.push({
      sender: userId,
      reciver: id,
      message: Input_messsage,
    });
    setInput_messsage('');
    ToastAndroid.show('Message Sent', ToastAndroid.SHORT);
  };

  const getChat = async () => {
    const userid = await AsyncStorage.getItem('Userid');
    setuserId(userid);
    const response = await fetch(
      Global.BASE_URL + `messageDetail&userId=${userid}&reciverId=${id}`,
    );
    const data = await response.json();
    setMessage(data.response);
  };
  useEffect(() => {
    getChat();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View style={{marginVertical: 10}}>
        <FlatList
          data={Message}
          style={{marginBottom: 70}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableWithoutFeedback>
              <View style={{marginTop: 0, width: '95%', alignSelf: 'center'}}>
                <View
                  style={{
                    backgroundColor: '#99697F',
                    maxWidth: Dimensions.get('screen').width * 0.8,
                    paddingVertical: 8,
                    paddingHorizontal: 15,
                    alignSelf:
                      item.sender == userId ? 'flex-end' : 'flex-start',
                    borderRadius: 8,
                    borderBottomLeftRadius: item.sender === userId ? 8 : 0,
                    borderBottomRightRadius: item.sender === userId ? 0 : 8,
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      padding: 5,
                      color: '#fff',
                      fontFamily: 'Poppins-Regular',
                    }}>
                    {item.message}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 7,
          backgroundColor: '#fafafa',
        }}>
        <TextInput
          placeholder="Type your message here"
          style={{flex: 1, color: Colors.dark}}
          placeholderTextColor={Colors.dark}
          onChangeText={setInput_messsage}
          value={Input_messsage}
          keyboardType="default"
        />
        <TouchableOpacity onPress={sendMessage}>
          <PaperAirplaneIcon color="#97667C" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chatscreen;
