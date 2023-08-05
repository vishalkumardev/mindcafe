import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {MagnifyingGlassIcon, PlusIcon} from 'react-native-heroicons/solid';
import Global from './utitiles/Global';
import {Colors} from './utitiles/Colors';

const Message = ({navigation}) => {
  const [Data, setData] = useState([]);
  const [SearchData, setSearchData] = useState();
  const [Loading, setLoading] = useState(false);

  const handleSearch = text => {
    if (text.length > 0) {
      let templist = Data.filter(item => {
        return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setData(templist);
    } else {
      setData(SearchData);
    }
  };

  const getData = async () => {
    setLoading(true);
    const user = await AsyncStorage.getItem('Userid');
    const response = await fetch(
      Global.BASE_URL + `friendList&user_id=${user}`,
    );
    const parsedData = await response.json();
    setData(parsedData.response);
    setSearchData(parsedData.response);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const Chatlist = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'flex-start',
          backgroundColor: '#FAFAFA',
          marginVertical: 10,
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
        onPress={() =>
          navigation.navigate('Chatscreen', {
            name: item.name,
            id: item.friend_id,
          })
        }>
        <Image
          source={{uri: item.profile}}
          resizeMode="contain"
          style={{width: 48, height: 48, borderRadius: 24}}
        />
        <View style={{flex: 1, marginLeft: 15}}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              marginBottom: 3,
              fontFamily: 'Poppins-Regular',
              color: Colors.dark,
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontFamily: 'Poppins-Regular',
              color: Colors.dark,
            }}>
            {item.message}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 12,
            fontFamily: 'Poppins-Regular',
            color: Colors.dark,
          }}>
          {item.time}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      {Data == null ? null : (
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            backgroundColor: '#FAFAFA',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 20,
            borderRadius: 25,
            paddingHorizontal: 15,
          }}>
          <MagnifyingGlassIcon
            color="#000"
            size={24}
            style={{marginRight: 10}}
          />
          <TextInput
            placeholder="Find your Friend"
            style={{
              flex: 1,
              fontFamily: 'Poppins-Regular',
              color: Colors.dark,
            }}
            placeholderTextColor={Colors.dark}
            onChangeText={handleSearch}
          />
        </View>
      )}
      <View style={{width: '90%', alignSelf: 'center', marginTop: 10}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            marginVertical: 10,
            fontFamily: 'Poppins-Medium',
            color: Colors.dark,
          }}>
          Message
        </Text>
        {Loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color="#121A3A" size={'large'} />
          </View>
        ) : (
          <View>
            {Data == null ? (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontFamily: 'Poppins-Medium',
                  marginTop: 50,
                }}>
                No Previous Chat Found
              </Text>
            ) : (
              <FlatList
                data={Data}
                renderItem={({item}) => <Chatlist item={item} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        )}
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 40,
          right: 30,
          backgroundColor: '#97667c',
          width: 50,
          height: 50,
          borderRadius: 25,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Search')}>
        <PlusIcon color="#fff" size={26} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Message;
