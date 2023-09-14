import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {UserAuthContext} from './UserAuthContext';
import Global from './utitiles/Global';
import {Colors} from './utitiles/Colors';
import { DocumentArrowDownIcon } from 'react-native-heroicons/solid';

const OrderHistory = ({navigation}) => {
  const [Order, setOrder] = useState([]);
  const [Loading, setLoading] = useState(false);
  const {User} = useContext(UserAuthContext);
  const getOrderHistory = async () => {
    setLoading(true);
    const response = await fetch(Global.BASE_URL + `myOrder&userId=${User}`);
    const data = await response.json();
    setOrder(data.response);
    setLoading(false);
  };
  useEffect(() => {
    getOrderHistory();
  }, []);

  return (
    <>
      {Loading ? (
        <View style={{flex:1,justifyContent:"center", alignItems:"center"}}>
          <ActivityIndicator color={Colors.primary} size={30} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={Order}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    marginHorizontal: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    marginVertical: 5,
                    backgroundColor: Colors.light,
                    borderRadius: 5,
                  }}>
                  <Text
                    style={{
                      position: 'absolute',
                      right: 10,
                      fontSize: 16,
                      top: 3,
                      color: Colors.primary,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    {' '}
                    ₹ {item.amount}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: Colors.dark,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    {' '}
                    Order Id : Mindcafe-00{item.orderId}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: Colors.dark,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    {' '}
                    Order Date : {item.orderDate}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: Colors.dark,
                      fontFamily: 'Poppins-Medium',
                    }}>
                    {' '}
                    Program : {item.program}
                  </Text>

                  <TouchableOpacity
                    style={{position: 'absolute', bottom: 10, right: 10}}
                    onPress={() =>
                      navigation.navigate(`ProgressReport`, {
                        url: item.invoice,
                      })
                    }>
                    <DocumentArrowDownIcon color={Colors.secondary} size={20} />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      )}
    </>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({});
