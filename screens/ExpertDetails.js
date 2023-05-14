import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, ScrollView} from 'react-native';
import {CheckBadgeIcon} from 'react-native-heroicons/solid';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const ExpertDetails = ({route}) => {
  const {name, content, img} = route.params;

  return (
    <ScrollView style={styles.Container}>
      <Image
        source={require('../assets/bg_profile.png')}
        style={styles.Image}
        resizeMode="cover"
      />
      <View style={styles.container_5}>
        <Image
          source={{uri: img}}
          style={styles.userImage}
          resizeMode="contain"
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            position: 'relative',
            top: '-5%',
          }}>
          <Text style={styles.profile_name}>{name}</Text>
          <CheckBadgeIcon size={28} color="#97667C" style={{marginLeft: 15}} />
        </View>
        <View style={styles.expert_description_box}>
          <Text style={styles.expert_description}>{content}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    height: '100%',
  },
  Image: {
    width: '100%',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  container_5: {
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'column',
    alignItems: 'center',
  },
  userImage: {
    width: 150,
    height: 170,
    zIndex: 1,
    position: 'relative',
    top: '-8%',
    borderColor: '#A37589',
    borderWidth: 2,
  },
  container_7: {
    width: '90%',
    alignSelf: 'center',
  },
  profile_name: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.dark,
  },
  expert_description_box: {
    width: '90%',
    alignSelf: 'center',
  },
  expert_description: {
    fontSize: 14,
    textAlign: 'justify',
    color: Colors.dark,
  },
});

export default ExpertDetails;
