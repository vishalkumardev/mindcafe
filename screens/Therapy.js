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
import {DocumentArrowDownIcon} from 'react-native-heroicons/outline';

const Therapy = ({navigation}) => {
  const isFocused = useIsFocused();
  const [Package, setpackage] = useState(false);
  const [Data, setData] = useState('');
  const [Appointment, setAppointment] = useState([]);
  const [User, setUser] = useState('');
  const [isValid, setisValid] = useState(true);
  const [feedback, setfeedback] = useState(false);

  const getData = async Id => {
    const response = await fetch(
      Global.BASE_URL + `therapyDashboard&userId=${Id}`,
    );
    const data = await response.json();
    setData(data);
    setpackage(data.packageStatus == 1 ? true : false)
    setAppointment(data.response);
    if (data.response !== null) {
      data.response.map(value => {
        if (value.status == 'pending') {
          setisValid(false);
        }
        if (value.feedback === 0 && value.status == 'completed') {
          setfeedback(true);
        }
      });
    }
  };
  const bookAppointment = () => {
    if (!Package) {
      Alert.alert('Package Expired');
    } else if (isValid == true) {
      navigation.navigate('Booking', {
        psychologistId: Data.psychologistId,
      });
    } else if (feedback == true) {
      Alert.alert('Please Submit Appointment Feedback');
    } else {
      Alert.alert('Slot Already Pending');
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('Userid').then(value => {
      setUser(value);
      getData(value);
      setisValid(true);
      setfeedback(false);
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
          zIndex: 10,
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
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: 500,
              }}>
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

              <Text style={[styles.text, {marginTop: 20}]}>
                Book your First Appointment Today
              </Text>
            </View>
          }
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
                  marginVertical: 5,
                  marginBottom: Appointment.length == index + 1 ? 130 : 0,
                }}>
                <Text style={styles.text}>
                  Appointment Date : {item.appointmentDate}
                </Text>
                <Text style={styles.text}>
                  Appointment Time : {item.appointmentTime}
                </Text>
                {item.status == 'completed' ? (
                  <TouchableOpacity
                    style={{position: 'absolute', bottom: 10, right: 10}}
                    onPress={() =>
                      navigation.navigate(`ProgressReport`, {
                        url: item.progressReport,
                      })
                    }>
                    <DocumentArrowDownIcon color={Colors.secondary} size={20} />
                  </TouchableOpacity>
                ) : null}

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
                {item.status == 'completed' && item.feedback == 0 ? (
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
