import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Global from './utitiles/Global';
import React, {useState, useEffect} from 'react';
import {Colors} from './utitiles/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DateandTime = ({navigation, route}) => {
  const {
    Name,
    Age,
    Profession,
    type,
    Energy,
    Dynamics,
    Perception,
    selectedValue,
    psychologistId,
  } = route.params;
  const [selected, setSelected] = useState('');
  const [Data, setData] = useState([]);
  const [open, setopen] = useState(false);
  const [Timeslot, setTimeslot] = useState([]);
  const [userId, setuserId] = useState('');
  const [selectedIndex, setselectedIndex] = useState(100);

  // const [Slot, setSlot] = useState([
  //   {timeSlot: '10:00am  -  10:30am'},
  //   {timeSlot: '10:30am  -  11:00am'},
  //   {timeSlot: '11:00am  -  11:30am'},
  //   {timeSlot: '11:30am  -  12:00pm'},
  //   {timeSlot: '12:00pm  -  12:30pm'},
  //   {timeSlot: '12:30pm  -  1:00pm'},
  //   {timeSlot: '1:00pm  -  1:30pm'},
  //   {timeSlot: '1:30pm  -  2:00pm'},
  //   {timeSlot: '3:00pm  -  3:30pm'},
  //   {timeSlot: '3:30pm  -  4:00pm'},
  //   {timeSlot: '4:00pm  -  4:30pm'},
  //   {timeSlot: '4:30pm  -  5:00pm'},
  //   {timeSlot: '5:00pm  -  5:30pm'},
  //   {timeSlot: '5:30pm  -  6:00pm'},
  //   {timeSlot: '6:00pm  -  6:30pm'},
  //   {timeSlot: '6:30pm  -  7:00pm'},
  // ]);

  const checkDate = date => {
    const ans = Data.find(data => {
      return data.availableDate == date;
    });
    if (ans == undefined) {
      Alert.alert('Slots are not Available');
    } else {
      if (ans.type == 'full_day') {
        Alert.alert('Slots are unavailable due to Holiday');
      } else {
        setTimeslot(ans.timeSlot);
        setSelected(date);
        setopen(false);
      }
    }
  };

  const getSlots = async () => {
    const response = await fetch(
      Global.BASE_URL + `calendar&psychologistId=${psychologistId}`,
    );
    const data = await response.json();
    setData(data.response);
  };

  const bookAppointment = async () => {
    const response = await fetch(
      Global.BASE_URL +
        `therapyAppointment&userId=${userId}&age=${Age}&profession=${Profession}&knowAbout=${selectedValue}&therapyHealing=${type}&energyLevel=${Energy}&selfPerception=${Perception}&relationship=${Dynamics}&appointmentDate=${selected}&appointmentTime=${Timeslot[selectedIndex].timeSlot}`,
    );
    const data = await response.json();
    if (data.response.status == 1) {
      Alert.alert('Appointment Booked Successfully');
      navigation.navigate('Therapy');
    } else {
      Alert.alert(data.response.message);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem('Userid').then(value => {
      setuserId(value);
    });
    getSlots();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: Colors.light}}>
      <View style={{width: '95%', alignSelf: 'center', marginVertical: 10}}>
        <Text style={styles.Labeltext}>Choose Date</Text>

        {open ? (
          <Calendar
            onDayPress={day => {
              checkDate(day.dateString);
            }}
            markedDates={{
              [selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: 'orange',
              },
            }}
            minDate={Date.now()}
            maxDate={Date.now() + 518400000}
          />
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: Colors.secondary,
              paddingVertical: 15,
              marginVertical: 10,
              borderRadius: 5,
            }}
            onPress={() => setopen(true)}>
            <Text style={{color: Colors.light, textAlign: 'center'}}>
              {selected == '' ? 'Choose Date' : selected}
            </Text>
          </TouchableOpacity>
        )}

        <Text style={styles.Labeltext}>Choose Slots</Text>

        <FlatList
          style
          data={Timeslot}
          numColumns={2}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                style={{
                  width: '45%',
                  backgroundColor:
                    index == selectedIndex ? Colors.secondary : Colors.lighdark,
                  marginHorizontal: '2.5%',
                  paddingVertical: 10,
                  marginVertical: 10,
                  borderRadius: 5,
                }}
                onPress={() => setselectedIndex(index)}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    fontSize: 12,
                    textAlign: 'center',
                    color: index == selectedIndex ? Colors.light : Colors.dark,
                  }}>
                  {item.timeSlot}
                </Text>
              </TouchableOpacity>
            );
          }}
        />

        {selectedIndex !== 100 ? (
          <TouchableOpacity
            style={{
              backgroundColor: Colors.secondary,
              paddingVertical: 15,
              marginVertical: 10,
              borderRadius: 5,
            }}
            onPress={bookAppointment}>
            <Text style={{color: Colors.light, textAlign: 'center'}}>
              Book Appointment
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default DateandTime;

const styles = StyleSheet.create({
  Labeltext: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: Colors.dark,
    marginHorizontal: 5,
  },
});
