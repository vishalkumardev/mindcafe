import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from './utitiles/Colors';
import Rating from './components/Rating';
import Global from './utitiles/Global';

const Feedback = ({navigation, route}) => {
  const {id} = route.params;
  const [Energy, setEnergy] = useState(0);
  const [Perception, setPerception] = useState(0);
  const [Dynamics, setDynamics] = useState(0);
  const [Experience, setExperience] = useState('');
  const [Request, setRequest] = useState('');
  const [Gradually, setGradually] = useState('');

  const BookAppointment = async () => {
    if (Experience == '') {
      Alert.alert('Please Share Valid Experience');
    } else if (Request == '') {
      Alert.alert('Please Share Valid Profession');
    } else if (Gradually == '') {
      Alert.alert('Please Fill  Valid Details');
    } else if (Energy == 0) {
      Alert.alert('Please Fill Valid Energy Level');
    } else if (Dynamics == 0) {
      Alert.alert('Please Fill Valid Relationship Dyanimcs Level');
    } else if (Perception == 0) {
      Alert.alert('Please Fill Valid  Self Perception Level');
    } else {
      const response = await fetch(
        Global.BASE_URL +
          `therapyFeedback&afterExperience=${Experience}&afterRequest=${Request}&afterGradually=${Gradually}&afterEnergyLevels=${Energy}&afterSelfPerception=${Perception}&afterRelationship=${Dynamics}&appointmentId=${id}`,
      );
      const data = await response.json();
      if (data.response.status == 1) {
        Alert.alert('Feedback Submit Successfully');
        navigation.navigate('Therapy');
      } else {
        Alert.alert(data.response.message);
      }
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.light}}>
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
        <Text style={styles.text}>Feedback</Text>
      </View>

      <ScrollView
        style={{width: '90%', alignSelf: 'center', marginTop: 20}}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.Labeltext}>
            Share your Experience with Our Psychologist
          </Text>
          <View
            style={{
              borderColor: 'gray',
              borderWidth: 0.2,
              borderRadius: 5,
              marginVertical: 10,
            }}>
            <TextInput
              placeholder="Share your experience"
              style={{
                paddingHorizontal: 10,
                paddingVertical: 12,
                color: Colors.dark,
              }}
              placeholderTextColor={Colors.dark}
              multiline
              onChangeText={setExperience}
              value={Experience}
            />
          </View>
        </View>
        <View>
          <Text style={styles.Labeltext}>
            Gradually it became easier to open up
          </Text>
          <View
            style={{
              borderColor: 'gray',
              borderWidth: 0.2,
              borderRadius: 5,
              marginVertical: 10,
            }}>
            <TextInput
              placeholder="Gradually it became easier to open up"
              style={{
                paddingHorizontal: 10,
                paddingVertical: 12,
                color: Colors.dark,
              }}
              placeholderTextColor={Colors.dark}
              multiline
              onChangeText={setGradually}
              value={Gradually}
            />
          </View>
        </View>
        <View>
          <Text style={styles.Labeltext}>Make a Request</Text>
          <View
            style={{
              borderColor: 'gray',
              borderWidth: 0.2,
              borderRadius: 5,
              marginVertical: 10,
            }}>
            <TextInput
              placeholder="Make a Request"
              style={{
                paddingHorizontal: 10,
                paddingVertical: 12,
                color: Colors.dark,
              }}
              placeholderTextColor={Colors.dark}
              multiline
              onChangeText={setRequest}
              value={Request}
            />
          </View>
        </View>

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
            marginVertical: 10,
            borderRadius: 5,
          }}
          onPress={BookAppointment}>
          <Text style={{color: Colors.light, textAlign: 'center'}}>
            Submit Feedback
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  Labeltext: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark,
  },
});
