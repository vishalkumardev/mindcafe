import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {XMarkIcon} from 'react-native-heroicons/solid';
import {Colors} from '../utitiles/Colors';
import Global from '../utitiles/Global';

const Search = ({navigation}) => {
  const [Data, setData] = useState([]);
  const [Search, setSearch] = useState('');
  const handleSearch = async text => {
    setSearch(text);
    if (text.length > 2) {
      const response = await fetch(Global.BASE_URL + `search&name=${text}`);
      const data = await response.json();
      setData(data.response);
    } else {
      setData([]);
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#fafafa',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 5,
        }}>
        <TextInput
          placeholder="Search...."
          style={{
            width: '80%',
            flex: 1,
            fontFamily: 'Poppins-Regular',
            color: Colors.dark,
          }}
          placeholderTextColor={Colors.dark}
          onChangeText={text => handleSearch(text)}
          autoFocus={true}
        />
        <XMarkIcon color="#000" size={24} onPress={() => navigation.goBack()} />
      </View>
      {Search.length < 1 ? (
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 100,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Poppins-Regular',
                color: Colors.dark,
              }}>
              No User Found
            </Text>
          </View>
        </View>
      ) : null}

      <FlatList
        data={Data}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{
                backgroundColor: '#fafafa',
                marginVertical: 10,
                width: '95%',
                alignSelf: 'center',
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderRadius: 5,
              }}
              onPress={() =>
                navigation.navigate('UserProfile', {
                  userId: item.userId,
                })
              }>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{uri: item.profile}}
                  resizeMode="contain"
                  style={{width: 60, height: 60, borderRadius: 30}}
                />
                <Text
                  style={{
                    fontSize: 14,
                    marginLeft: 20,
                    fontFamily: 'Poppins-Regular',
                    color: Colors.dark,
                  }}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Search;
