import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from './utitiles/Colors';
import {Picker} from '@react-native-picker/picker';
import Rating from './components/Rating';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Booking = ({navigation, route}) => {
  const {psychologistId} = route.params;
  const [Name, setName] = useState('');
  const [Age, setAge] = useState('');
  const [Profession, setProfession] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [SelectedIndex, setSelectedIndex] = useState(100);
  const [type, settype] = useState('');
  const [Energy, setEnergy] = useState(0);
  const [Perception, setPerception] = useState(0);
  const [Dynamics, setDynamics] = useState(0);

  const BookAppointment = () => {
    if (Name.length < 4) {
      Alert.alert('Please Enter Valid Name');
    } else if (Age == '') {
      Alert.alert('Please Enter Valid Age');
    } else if (Profession == '') {
      Alert.alert('Please Enter Valid Profession');
    } else if (SelectedIndex == 100) {
      Alert.alert('Please Fill  Valid Details');
    } else if (selectedValue == 'None') {
      Alert.alert('Please Select Valid Options');
    } else if (Energy == 0) {
      Alert.alert('Please Fill Valid Energy Level');
    } else if (Dynamics == 0) {
      Alert.alert('Please Fill Valid Relationship Dyanimcs Level');
    } else if (Perception == 0) {
      Alert.alert('Please Fill Valid  Self Perception Level');
    } else {
      navigation.navigate('DateandTime', {
        Name,
        Age,
        Profession,
        type,
        Energy,
        Dynamics,
        Perception,
        selectedValue,
        psychologistId,
      });
    }
  };
  function onPressRadioButton(index) {
    setSelectedIndex(index);
    if (index == 0) {
      settype('yes');
    } else {
      settype('no');
    }
  }
  const [radioButtons, setRadioButtons] = useState([
    {
      id: '1',
      label: 'Yes',
      value: 'Yes',
    },
    {
      id: '2',
      label: 'No',
      value: `No`,
    },
  ]);

  useEffect(() => {
    AsyncStorage.getItem('UserName').then(value => {
      setName(value);
    });
  }, []);

  return (
    <ScrollView style={{backgroundColor: Colors.light, flex: 1}}>
      <Text
        style={{
          textAlign: 'center',
          marginVertical: 15,
          fontSize: 16,
          fontFamily: 'Poppins-Medium',
          color: Colors.dark,
        }}>
        Book New Appointment
      </Text>

      <View
        style={{
          width: '90%',
          alignSelf: 'center',
        }}>
        <Text style={styles.Labeltext}>Name</Text>
        <TextInput
          placeholder="Enter Name"
          value={Name}
          style={styles.input}
          onChangeText={setName}
          placeholderTextColor={Colors.dark}
        />
        <Text style={styles.Labeltext}>Age</Text>
        <TextInput
          placeholder="Enter Age"
          value={Age}
          style={styles.input}
          onChangeText={setAge}
          keyboardType="number-pad"
          placeholderTextColor={Colors.dark}
        />
        <Text style={styles.Labeltext}>Profession</Text>
        <TextInput
          placeholder="Enter Profession"
          value={Profession}
          style={styles.input}
          onChangeText={setProfession}
          placeholderTextColor={Colors.dark}
        />
        <Text style={styles.Labeltext}>Something important to know about</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          style={{marginVertical: 12, color: Colors.dark}}>
          <Picker.Item label="Select Know about" value="None" />
          <Picker.Item label="Family" value="Family" />
          <Picker.Item label="Childhood" value="Childhood" />
          <Picker.Item label="Growing Up" value="Growing Up" />
        </Picker>
        <Text style={styles.Labeltext}>
          Have you been in therapy or healing before
        </Text>
        <View style={{flexDirection: 'row', marginVertical: 12}}>
          {radioButtons.map((value, index) => {
            return (
              <View style={{flexDirection: 'row', margin: 12}}>
                <TouchableOpacity
                  style={{
                    height: 16,
                    width: 16,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#000',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => onPressRadioButton(index)}>
                  {SelectedIndex == index ? (
                    <View
                      style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: 'black',
                      }}></View>
                  ) : null}
                </TouchableOpacity>
                <Text style={{marginLeft: 12, color: Colors.dark}}>
                  {value.label}
                </Text>
              </View>
            );
          })}
        </View>
        <Text style={styles.Labeltext}>
          On a Scale of 1 to 5 ( 1 being weakest and 5 being the strongest) Rate
        </Text>
        <View style={{marginVertical: 12}}>
          <Text style={styles.Labeltext}>Energy Level</Text>
          <Rating value={Energy} setValue={setEnergy} />
        </View>
        <View style={{marginVertical: 12}}>
          <Text style={styles.Labeltext}>Your Self Perception</Text>
          <Rating value={Perception} setValue={setPerception} />
        </View>
        <View style={{marginVertical: 12}}>
          <Text style={styles.Labeltext}>Your Relationship Dynamics</Text>
          <Rating value={Dynamics} setValue={setDynamics} />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.secondary,
            paddingVertical: 15,
            marginVertical: 20,
            borderRadius: 5,
          }}
          onPress={BookAppointment}>
          <Text style={{color: Colors.light, textAlign: 'center'}}>
            Book Appointment
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Booking;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark,
  },
  Labeltext: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark,
    marginHorizontal: 5,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 0.2,
    paddingHorizontal: 15,
    marginVertical: 12,
    borderRadius: 2,
    color: Colors.dark,
  },
});
