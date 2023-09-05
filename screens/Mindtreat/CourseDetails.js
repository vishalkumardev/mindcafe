import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  ScrollView,
  TextInput,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import {
  UsersIcon,
  ListBulletIcon,
  BookOpenIcon,
  XMarkIcon,
} from 'react-native-heroicons/outline';
import {LockClosedIcon, PlayIcon} from 'react-native-heroicons/solid';
import RazorpayCheckout from 'react-native-razorpay';
import Global from '../utitiles/Global';
import {Colors} from '../utitiles/Colors';
import {UserAuthContext} from '../UserAuthContext';

const CourseDetails = ({route, navigation}) => {
  const {id, check} = route.params;
  const [Toggle, setToggle] = useState(true);
  const [Courses, setCourses] = useState({});
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [loading, setloading] = useState(false);
  const [User, setUser] = useState([]);
  const [userId, setuserId] = useState('');
  const [promo, setpromo] = useState('');
  const [Price, setPrice] = useState('');
  const [Apply, setApply] = useState(false);
  const [Suscribe, setSuscribe] = useState(false);

  const {UserType} = useContext(UserAuthContext);

  const getUserData = async () => {
    const user = await AsyncStorage.getItem('Userid');
    setuserId(user);
    const response = await fetch(Global.BASE_URL + `myProfiles&userId=${user}`);
    const data = await response.json();
    setUser(data.response);
    getData(user);
    return true;
  };

  const getData = async user => {
    setloading(true);
    const response = await fetch(
      Global.BASE_URL + `courseDetail&programId=${id}&userId=${user}`,
    );
    const data = await response.json();
    if (data.response.checkSubscribed == true) {
      setSuscribe(true);
    }
    setloading(false);
    setCourses(data.response);
    setPrice(data.response.price);
    setData(data.response.content);
    setLoading(false);
  };

  const checkoutHandler = async () => {
    var options = {
      description: 'THE PATHWAY TO PEACE!',
      image: 'https://mindcafe.app/img/Mindcafe.png',
      currency: 'INR',
      key: 'rzp_live_EXuwaKLzhhTeA5',
      amount: Price * 100,
      name: 'MindCafe',
      order_id: '',
      prefill: {
        email: User.email,
        contact: User.phone,
        name: User.name,
      },
      theme: {color: '#97667C'},
    };
    RazorpayCheckout.open(options)
      .then(async data => {
        const response = await fetch(
          Global.BASE_URL +
            `placeOrder&userId=${userId}&programId=${Courses.program_id}&txn=${data.razorpay_payment_id}&amount=${Courses.price}`,
        );
        const parsedData = await response.json();
        if (parsedData.response.status == 1) {
          navigation.navigate('Success', {
            price: Price,
          });
        }
      })
      .catch(error => {
        navigation.navigate('Failure', {
          price: Courses.price,
        });
      });
  };

  const BuyCourse = async () => {
    const response = await fetch(
      Global.BASE_URL +
        `placeOrder&userId=${userId}&programId=${
          Courses.program_id
        }&txn=${'123123'}&amount=${0}`,
    );
    const parsedData = await response.json();
    if (parsedData.response.status == 1) {
      navigation.navigate('Success', {
        price: Price,
      });
    }
  };
  const validateCoupon = async () => {
    const response = await fetch(
      Global.BASE_URL + `validateCoupon&coupon=${promo}`,
    );
    const data = await response.json();
    if (data.response.status == 1) {
      const {couponValue} = data.response;
      setPrice(Math.round(Price - (Price / 100) * couponValue));
      setApply(true);
    } else {
      ToastAndroid.show(`${data.response.message}`, ToastAndroid.SHORT);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const CourseItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          width: '95%',
          backgroundColor: '#fff',
          alignSelf: 'center',
          paddingVertical: 10,
          borderRadius: 10,
          marginVertical: 10,
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              fontFamily: 'Poppins-Medium',
              color: Colors.dark,
            }}>
            Session {index + 1} :
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              fontFamily: 'Poppins-Medium',
              color: Colors.dark,
            }}>
            {item.title}
          </Text>
        </View>
        {Suscribe == true ? null : <LockClosedIcon color="#97667C" size={24} />}
      </View>
    );
  };
  return (
    <>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color="#121A3A" size={'large'} />
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Modal animationType="slide" transparent={true} visible={Loading}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <XMarkIcon
                  color="#000"
                  size={24}
                  style={{position: 'absolute', top: 10, right: 20}}
                  onPress={() => setLoading(false)}
                />
                <Image
                  source={{uri: Courses.expertPhoto}}
                  resizeMode="contain"
                  style={{width: 200, height: 200, borderRadius: 100}}
                />
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 10,
                    fontWeight: '600',
                    color: Colors.dark,
                  }}>
                  {Courses.expert}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ExpertDetails', {
                      name: Courses.expert,
                      content: Courses.expertDesc,
                      img: Courses.expertPhoto,
                    });
                    setLoading(false);
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 12,
                      textDecorationLine: 'underline',
                      marginTop: 10,
                      color: Colors.dark,
                    }}>
                    View Profile
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {Courses.cover == null ? (
            <></>
          ) : (
            <ImageBackground
              source={{uri: Courses.cover}}
              resizeMode="cover"
              style={{
                width: '100%',
                height: 200,
                resizeMode: 'cover',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              delay={3000}
              animation="fadeIn">
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#fafafa',
                  paddingHorizontal: 15,
                  paddingVertical: 7,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onPress={() => {
                  navigation.navigate('Video', {
                    url: Courses.video,
                    id: 'false',
                  });
                }}>
                <PlayIcon color="#000" size={30} />
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: 'Poppins-SemiBold',
                    color: Colors.dark,
                  }}>
                  Watch Intro
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          )}

          <View style={styles.box_icon}>
            <View style={styles.icon_box}>
              <BookOpenIcon color="#000" size={30} />
              <Text style={styles.icon_text}>{Courses.lesson} Lessons</Text>
            </View>
            <View style={styles.icon_box}>
              <ListBulletIcon color="#000" size={30} />
              <Text style={styles.icon_text}>{Courses.quiz} Quiz</Text>
            </View>
            <View style={styles.icon_box}>
              <UsersIcon color="#000" size={30} />
              <Text style={styles.icon_text}>{Courses.elg}</Text>
            </View>
          </View>
          {Courses.longDesc == null ? (
            <></>
          ) : (
            <Text
              style={{
                width: '95%',
                textAlign: 'justify',
                fontSize: 13,
                fontFamily: 'Poppins-Regular',
                color: Colors.dark,
                backgroundColor: Colors.light,
                paddingHorizontal: 15,
                alignSelf: 'center',
                marginVertical: 10,
                paddingVertical: 10,
                borderRadius: 8,
              }}>
              {Toggle
                ? Courses.longDesc + '   '
                : Courses.longDesc.slice(0, 100) + '   '}
              <TouchableOpacity onPress={() => setToggle(!Toggle)}>
                <Text style={{top: 4, color: Colors.primary}}>
                  {Toggle ? 'read less' : 'read more'}
                </Text>
              </TouchableOpacity>
            </Text>
          )}
          <Text style={styles.heading}>{Courses.title}</Text>
          {Data == null ? (
            <View>
              <Image
                source={require('../../assets/session.png')}
                resizeMode="cover"
                style={{width: '98%', alignSelf: 'center', marginTop: 10}}
              />
            </View>
          ) : (
            <FlatList
              data={Data}
              renderItem={({item, index}) => (
                <CourseItem item={item} index={index} />
              )}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          )}
        </ScrollView>
      )}

      {loading ? null : (
        <View>
          {Suscribe == true ? (
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#97667C',
                  paddingVertical: 15,
                  width: '100%',
                }}
                onPress={() =>
                  navigation.navigate('Sessions', {
                    id: id,
                  })
                }>
                <Text style={styles.btn_text}>Continue to the Session</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {UserType == 'employee' ? (
                <View
                  style={{
                    backgroundColor: Colors.light,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <TextInput
                    placeholder="Enter promo Code"
                    value={promo}
                    onChangeText={setpromo}
                    placeholderTextColor={Colors.dark}
                    editable={Apply ? false : true}
                    autoCapitalize={'characters'}
                    style={{
                      width: '65%',
                      borderColor: 'gray',
                      borderWidth: 0.2,
                      paddingHorizontal: 15,
                      marginVertical: 12,
                      borderRadius: 2,
                      paddingVertical: 5,
                      color: Colors.dark,
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      backgroundColor: Colors.secondary,
                      paddingHorizontal: 25,
                      borderRadius: 5,
                      paddingVertical: 10,
                    }}
                    onPress={
                      Apply
                        ? () => {
                            setApply(false);
                            setPrice(Courses.price);
                            setpromo('');
                          }
                        : validateCoupon
                    }>
                    <Text
                      style={{
                        fontSize: 13,
                        color: Colors.light,
                        marginHorizontal: 15,
                      }}>
                      {Apply ? 'Remove' : 'Apply'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.btn_about}
                  onPress={() => setLoading(true)}>
                  <Text style={styles.btn_text}>About Instructor</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn_buy}
                  onPress={Price == 0 ? BuyCourse : checkoutHandler}>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={styles.btn_text}>Buy Now</Text>
                    {Courses.price == undefined ? null : (
                      <Text style={styles.btn_text}>{' @ ₹ ' + Price}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box_icon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#FFF',
  },
  text_box: {
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  heading: {
    fontSize: 14,
    marginLeft: '3%',
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    color: Colors.dark,
  },
  btn_about: {
    backgroundColor: '#000',
    paddingVertical: 15,
    width: '50%',
  },
  btn_text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  btn_buy: {
    backgroundColor: '#97667C',
    paddingVertical: 15,
    width: '50%',
  },
  icon_box: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_text: {
    color: '#97667c',
    fontWeight: '700',
    fontFamily: 'Poppins-SemiBold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  modalView: {
    backgroundColor: '#fff',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default CourseDetails;
