import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from './utitiles/Colors';
import Global from './utitiles/Global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const Therapy = ({navigation}) => {
  const isFocused = useIsFocused();

  const [Data, setData] = useState('');
  const [Appointment, setAppointment] = useState([]);
  const [User, setUser] = useState('');
  const [isValid, setisValid] = useState(true);

  const getData = async Id => {
    const response = await fetch(
      Global.BASE_URL + `therapyDashboard&userId=${Id}`,
    );
    const data = await response.json();
    setData(data);
    setAppointment(data.response);
    if (data.response !== null) {
      data.response.map(value => {
        if (value.status == 'pending') {
          setisValid(false);
        }
      });
    } else {
      isValid(true);
    }
  };
  const bookAppointment = () => {
    if (isValid == true) {
      navigation.navigate('Booking', {
        psychologistId: Data.psychologistId,
      });
    } else {
      Alert.alert('Slot Already Pending');
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('Userid').then(value => {
      setUser(value);
      getData(value);
    });
  }, [isFocused]);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          backgroundColor: '#fff',
          elevation: 4,
          padding: 16,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          marginVertical: 10,
          paddingVertical: 10,
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}>
        <Text style={styles.text}>Coupon Code : {Data.couponCode}</Text>
        <Text style={styles.text}>Discount : {Data.couponValue}</Text>
      </View>

      <View
        style={{
          width: '100%',
          alignSelf: 'center',
          paddingVertical: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          elevation: 4,
          padding: 16,
        }}>
        <Text style={styles.text}>Appointment</Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
          }}
          onPress={bookAppointment}>
          <Text style={{fontSize: 14, color: Colors.light}}>
            Book Appointment
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Appointment}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: '95%',
                  alignSelf: 'center',
                  backgroundColor: '#fff',
                  elevation: 4,
                  padding: 16,
                  borderRadius: 8,
                  paddingVertical: 20,
                  marginVertical: 10,
                }}>
                <Text style={styles.text}>
                  Appointment Date : {item.appointmentDate}
                </Text>
                <Text style={styles.text}>
                  Appointment Time : {item.appointmentTime}
                </Text>
                <Text
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 10,
                    paddingHorizontal: 5,
                    paddingVertical: 1,
                    borderRadius: 5,
                    backgroundColor:
                      item.status == 'completed' ? 'green' : Colors.lighdark,
                    color: item.status == 'completed' ? 'white' : 'black',
                  }}>
                  {item.status}
                </Text>
                <Text style={styles.text}>
                  Psychologist : {item.psychologist}
                </Text>
                {item.status == 'approved' ? (
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                      backgroundColor: Colors.secondary,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 5,
                      width: '35%',
                    }}
                    onPress={() => {
                      Linking.openURL(`${item.meetingLink}`);
                    }}>
                    <Text style={{color: Colors.light, textAlign: 'center'}}>
                      Start Meeting
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {item.status == 'completed' ? (
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                      backgroundColor: Colors.secondary,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 5,
                      width: '35%',
                    }}
                    onPress={() =>
                      navigation.navigate('Feedback', {
                        id: item.appointmentId,
                      })
                    }>
                    <Text style={{color: Colors.light, textAlign: 'center'}}>
                      Give Feedback
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Therapy;

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark,
  },
});
