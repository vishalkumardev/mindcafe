import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import HTMLView from 'react-native-htmlview';
import {Colors} from '../utitiles/Colors';

const QuestionItem = ({data, selectedOption, AnsToggle}) => {
  return (
    <View style={{width: width}}>
      <Text
        style={{
          marginHorizontal: 20,
          fontFamily: 'Poppins-Regular',
          fontSize: 14,
          color: Colors.dark,
        }}>
        {data.question}
      </Text>
      <FlatList
        data={data.options}
        style={{marginTop: 10}}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={
              data.marked == index + 1
                ? AnsToggle
                  ? data.marked == index + 1 && data.answer == index + 1
                    ? {
                        width: '90%',
                        backgroundColor: 'green',
                        alignSelf: 'center',
                        marginVertical: 10,
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        borderRadius: 5,
                        marginBottom: data.options.length == index ? 150 : 0,
                      }
                    : {
                        width: '90%',
                        backgroundColor: 'red',
                        alignSelf: 'center',
                        marginVertical: 10,
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        borderRadius: 5,
                        marginBottom: data.options.length == index ? 150 : 0,
                      }
                  : {
                      width: '90%',
                      backgroundColor: '#97667c',
                      alignSelf: 'center',
                      marginVertical: 10,
                      paddingVertical: 10,
                      paddingHorizontal: 15,
                      borderRadius: 5,
                      marginBottom: data.options.length == index ? 150 : 0,
                    }
                : data.answer == index + 1 && AnsToggle == true
                ? {
                    width: '90%',
                    backgroundColor: 'green',
                    alignSelf: 'center',
                    marginVertical: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                    marginBottom: data.options.length == index ? 150 : 0,
                  }
                : {
                    width: '90%',
                    backgroundColor: 'gray',
                    alignSelf: 'center',
                    marginVertical: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                    marginBottom: data.options.length == index ? 150 : 0,
                  }
            }
            disabled={AnsToggle ? true : false}
            onPress={() => {
              selectedOption(index + 1);
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  color: '#fff',
                  flex: 1,
                  marginRight: 10,
                  fontFamily: 'Poppins-Regular',
                  fontSize: 13,
                  textAlign: 'auto',
                }}>
                {item}
              </Text>
              {AnsToggle ? (
                <View>
                  {data.marked == index + 1 ? (
                    <Text style={{fontSize: 16, color: '#fff'}}>
                      Your Answer
                    </Text>
                  ) : null}

                  {data.answer == index + 1 ? (
                    <Text style={{fontSize: 16, color: '#fff'}}>
                      Correct Answer
                    </Text>
                  ) : null}
                </View>
              ) : null}
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <View>
            {AnsToggle ? (
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  backgroundColor: '#FAFAFA',
                  padding: 10,
                  borderRadius: 8,
                  marginTop: 10,
                }}>
                <HTMLView value={data.explanation} stylesheet={styles} />
              </View>
            ) : null}
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  a: {
    fontWeight: '300',
    color: '#FF3366',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark, // make links coloured pink
  },
  p: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark,
  },
  div: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.dark,
  },
  b: {
    color: Colors.dark,
  },
});

export default QuestionItem;
