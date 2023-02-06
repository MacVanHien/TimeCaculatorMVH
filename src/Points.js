
import React, { useEffect, useState } from 'react';
import { View, Image, Text, Dimensions, TouchableOpacity, TextInput, ScrollView, Modal, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { firebase } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import moment from 'moment-timezone';
import InternetConnectionAlert from "react-native-internet-connection-alert";

const WIDTH = Dimensions.get("window").width

export default function Points({ navigation }) {
  const [modalVisible, setModalVisible] = useState(true);

  const [userId, setUserId] = useState(0);

  const [point, setPoint] = useState('');

  const [point1, setPoint1] = useState('');
  const [point2, setPoint2] = useState('');
  const [point3, setPoint3] = useState('');
  const [point4, setPoint4] = useState('');
  const [point5, setPoint5] = useState('');

  const [dayPoint1, setDayPoint1] = useState('');
  const [dayPoint2, setDayPoint2] = useState('');
  const [dayPoint3, setDayPoint3] = useState('');
  const [dayPoint4, setDayPoint4] = useState('');
  const [dayPoint5, setDayPoint5] = useState('');

  const [takeDayPoint1, setTakeDayPoint1] = useState(0);
  const [takeDayPoint2, setTakeDayPoint2] = useState(0);
  const [takeDayPoint3, setTakeDayPoint3] = useState(0);
  const [takeDayPoint4, setTakeDayPoint4] = useState(0);
  const [takeDayPoint5, setTakeDayPoint5] = useState(0);


  useEffect(() => {
    setTimeout(() => {
      setModalVisible(false)
    }, 800);
  }, [])

  //Tính toán về ngày 
  useEffect(() => {
    if (!!moment(dayPoint1, 'DD/MM/YYYY') == true) {
      let d = moment(dayPoint1, 'DD/MM/YYYY').format(); //để đc dạng "june 30, 2022"
      let djs = new Date(d)
      var msDiffd = new Date().getTime() - new Date(djs).getTime();
      var daysTillTheDayd = - Math.floor(msDiffd / (1000 * 60 * 60 * 24));
      setTakeDayPoint1(daysTillTheDayd);
    }
    if (!!moment(dayPoint2, 'DD/MM/YYYY') == true) {
      let d = moment(dayPoint2, 'DD/MM/YYYY').format(); //để đc dạng "june 30, 2022"
      let djs = new Date(d)
      var msDiffd = new Date().getTime() - new Date(djs).getTime();
      var daysTillTheDayd = - Math.floor(msDiffd / (1000 * 60 * 60 * 24));
      setTakeDayPoint2(daysTillTheDayd);
    }
    if (!!moment(dayPoint3, 'DD/MM/YYYY') == true) {
      let d = moment(dayPoint3, 'DD/MM/YYYY').format(); //để đc dạng "june 30, 2022"
      let djs = new Date(d)
      var msDiffd = new Date().getTime() - new Date(djs).getTime();
      var daysTillTheDayd = - Math.floor(msDiffd / (1000 * 60 * 60 * 24));
      setTakeDayPoint3(daysTillTheDayd);
    }
    if (!!moment(dayPoint4, 'DD/MM/YYYY') == true) {
      let d = moment(dayPoint4, 'DD/MM/YYYY').format(); //để đc dạng "june 30, 2022"
      let djs = new Date(d)
      var msDiffd = new Date().getTime() - new Date(djs).getTime();
      var daysTillTheDayd = - Math.floor(msDiffd / (1000 * 60 * 60 * 24));
      setTakeDayPoint4(daysTillTheDayd);
    }
    if (!!moment(dayPoint5, 'DD/MM/YYYY') == true) {
      let d = moment(dayPoint5, 'DD/MM/YYYY').format(); //để đc dạng "june 30, 2022"
      let djs = new Date(d)
      var msDiffd = new Date().getTime() - new Date(djs).getTime();
      var daysTillTheDayd = - Math.floor(msDiffd / (1000 * 60 * 60 * 24));
      setTakeDayPoint5(daysTillTheDayd);
    }
  }, [dayPoint1, dayPoint2, dayPoint3, dayPoint4, dayPoint5])


  useEffect(() => {
    checkUserId();
  }, []);

  function checkUserId() {
    auth().onAuthStateChanged(user => {
      if (user != null) {
        //user trả về là một object có key email đang đăng nhập 
        setUserId(user.uid);
        // console.log("🚀 ~ file: Home.js ~ line 54 ~ auth ~ user", user)
      } else {
        console.log('người dùng đang đăng xuất');
      }
    });
  }


  useEffect(() => {
    userId != '' && getUserInfor()
  }, [userId])
  //Khi email thay đổi thì render lại thì get_DATA_Users mới hoạt động đúng ý định

  function getUserInfor() {
    if (userId) {
      firebase.database().ref(`users/${userId}/point`).on('value', snapshot => {
        snapshot.val() !== null && setPoint(snapshot.val());
      });
      firebase.database().ref(`users/${userId}/point1`).on('value', snapshot => {
        snapshot.val() !== null && setPoint1(snapshot.val());
      });
      firebase.database().ref(`users/${userId}/point2`).on('value', snapshot => {
        snapshot.val() !== null && setPoint2(snapshot.val());
      });
      firebase.database().ref(`users/${userId}/point3`).on('value', snapshot => {
        snapshot.val() !== null && setPoint3(snapshot.val());
      });
      firebase.database().ref(`users/${userId}/point4`).on('value', snapshot => {
        snapshot.val() !== null && setPoint4(snapshot.val());
      });
      firebase.database().ref(`users/${userId}/point5`).on('value', snapshot => {
        snapshot.val() !== null && setPoint5(snapshot.val());
      });
      firebase.database().ref(`users/${userId}/dayPoint1`).on('value', snapshot => {
        snapshot.val() !== null && setDayPoint1(snapshot.val());
      });
      firebase.database().ref(`users/${userId}/dayPoint2`).on('value', snapshot => {
        snapshot.val() !== null && setDayPoint2(snapshot.val());
      });
      firebase.database().ref(`users/${userId}/dayPoint3`).on('value', snapshot => {
        snapshot.val() !== null && setDayPoint3(snapshot.val());
      });
      firebase.database().ref(`users/${userId}/dayPoint4`).on('value', snapshot => {
        snapshot.val() !== null && setDayPoint4(snapshot.val());
      });
      firebase.database().ref(`users/${userId}/dayPoint5`).on('value', snapshot => {
        snapshot.val() !== null && setDayPoint5(snapshot.val());
      });
    }
  }

  function updateDataBase() {
    if (userId) {
      firebase.database().ref(`users/${userId}/point`).set(point)
      firebase.database().ref(`users/${userId}/point1`).set(point1)
      firebase.database().ref(`users/${userId}/point2`).set(point2)
      firebase.database().ref(`users/${userId}/point3`).set(point3)
      firebase.database().ref(`users/${userId}/point4`).set(point4)
      firebase.database().ref(`users/${userId}/point5`).set(point5)
      firebase.database().ref(`users/${userId}/dayPoint1`).set(dayPoint1)
      firebase.database().ref(`users/${userId}/dayPoint2`).set(dayPoint2)
      firebase.database().ref(`users/${userId}/dayPoint3`).set(dayPoint3)
      firebase.database().ref(`users/${userId}/dayPoint4`).set(dayPoint4)
      firebase.database().ref(`users/${userId}/dayPoint5`).set(dayPoint5)
    }
  }

  useEffect(() => {
    if (takeDayPoint1 <= 0) { //Chú ý tránh trường hợp lặp lại vô hạn lần !
      setTakeDayPoint1(0)
    }
    if (takeDayPoint2 <= 0) {
      setTakeDayPoint2(0)
    }
    if (takeDayPoint3 <= 0) {
      setTakeDayPoint3(0)
    }
    if (takeDayPoint4 <= 0) {
      setTakeDayPoint4(0)
    }
    if (takeDayPoint5 <= 0) {
      setTakeDayPoint5(0)
    }
  }, [takeDayPoint1, takeDayPoint2, takeDayPoint3, takeDayPoint4, takeDayPoint5])




  return (
    <InternetConnectionAlert
      onChange={(connectionState) => {
        console.log("Connection State: ", connectionState);
      }}
    >
      {/* {... Your whole application should be here ... } */}
      <View style={{ backgroundColor: '#FFFAF0', height: '100%', width: WIDTH * 1 }}>
        {/* Hiển thị nút back */}
        <View style={{ height: hp('5.5%'), backgroundColor: '#E6E6FA', zIndex: 9, justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ height: hp('3.5%'), width: wp('100%'), borderRadius: 20, margin: 7, justifyContent: 'center', }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                allowFontScaling={false}
                source={require('./imges/BackButton_rbg1.png')}
                style={{ width: wp('5%'), height: wp('5%'), borderRadius: 50, backgroundColor: 'rgba(250, 250, 250)', tintColor: 'blue' }}
                resizeMode="contain"
              />
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  paddingLeft: 0, fontSize: hp('2.2%'),
                }}>
                {` Time Calculator `}
              </Text>
            </View>
          </TouchableOpacity>
        </View>


        <ScrollView style={{ height: '90%', }}>
          {/* Hiển thị Bảng phần hoạch định đến đích */}
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>

            {/* Hiển thị phần Preview hoạch định đến đích */}
            <View style={{ justifyContent: 'center', width: WIDTH, }}>
              <View style={{ width: WIDTH, flexDirection: 'row', marginBottom: 0, paddingTop: hp('5%') }}>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.49, color: '#333', fontSize: hp('2.3%'), fontWeight: 'bold', paddingLeft: 8, paddingVertical: 3, }}>
                  Hoạch định đến đích:
                </Text>

                <Image
                  allowFontScaling={false}
                  source={require('./imges/iconExcercise.png')}
                  style={{ width: WIDTH * 0.09, height: WIDTH * 0.09, padding: 12, borderRadius: 50, position: 'relative', bottom: 5 }}
                  resizeMode="contain"
                />

                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.4, color: '#333', fontSize: hp('2.3%'), fontWeight: 'bold', paddingLeft: 8, paddingVertical: 3, paddingTop: 1 }}>
                  {`${point} `}
                </Text>

              </View>

              <View style={{ width: WIDTH, flexDirection: 'row', marginBottom: 0, }}>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.63, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', marginLeft: hp('1.9%'), paddingBottom: 1, marginBottom: 2 }}>
                  {`Còn ${takeDayPoint1} ngày đến đích 1:`}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.36, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', marginLeft: hp('0.6%'), paddingBottom: 1, marginBottom: 2 }}>
                  {point1}
                </Text>
              </View>

              <View style={{ width: WIDTH, flexDirection: 'row', marginBottom: 0, }}>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.63, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', marginLeft: hp('1.9%'), paddingVertical: 1, marginVertical: 2 }}>
                  {`Còn ${takeDayPoint2} ngày đến đích 2:`}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.36, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', marginLeft: hp('0.6%'), paddingVertical: 1, marginVertical: 2 }}>
                  {point2}
                </Text>
              </View>

              <View style={{ width: WIDTH, flexDirection: 'row', marginBottom: 0, }}>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.63, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', marginLeft: hp('1.9%'), paddingVertical: 1, marginVertical: 2 }}>
                  {`Còn ${takeDayPoint3} ngày đến đích 3:`}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.36, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', marginLeft: hp('0.6%'), paddingVertical: 1, marginVertical: 2 }}>
                  {point3}
                </Text>
              </View>

              <View style={{ width: WIDTH, flexDirection: 'row', marginBottom: 0, }}>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.63, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', marginLeft: hp('1.9%'), paddingVertical: 1, marginVertical: 2 }}>
                  {`Còn ${takeDayPoint4} ngày đến đích 4:`}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.36, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', marginLeft: hp('0.6%'), paddingVertical: 1, marginVertical: 2 }}>
                  {point4}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', marginBottom: 0, }}>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.63, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', marginLeft: hp('1.9%'), paddingVertical: 1, marginVertical: 2 }}>
                  {`Còn ${takeDayPoint5} ngày đến đích 5:`}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.36, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', marginLeft: hp('0.6%'), paddingVertical: 1, marginVertical: 2 }}>
                  {point5}
                </Text>
              </View>

              {/* Để dòng gạch ngang */}
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  allowFontScaling={false}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{ color: '#FFD700', fontSize: hp('2.3%'), fontWeight: 'bold', marginLeft: hp('0.6%'), paddingTop: 3, paddingBottom: 0 }}>
                  -----------------------------------
                </Text>
              </View>

            </View>

            {/* Hiển thị phần Input hoạch định đến đích */}
            <View style={{ justifyContent: 'center', width: WIDTH, }}>
              <View style={{ marginVertical: hp('0.5%'), width: WIDTH, alignItems: 'center', marginBottom: 0, paddingTop: WIDTH * 0.02, }}>
                <Text
                  allowFontScaling={false}
                  style={{ color: '#FFD700', fontSize: hp('2.35%'), fontWeight: 'bold', paddingVertical: 3, paddingTop: 1 }}>
                  Chuẩn bị kế hoạch, vươn tới thành công !
                </Text>

                <TextInput
                  allowFontScaling={false}
                  value={point}
                  onChangeText={setPoint}
                  placeholder="Mục tiêu của bạn  "
                  placeholderTextColor="#87CEFF"
                  style={{ height: hp('3.5%'), padding: 0, color: '#00BFFF', fontSize: hp('2.5%'), fontWeight: 'bold', zIndex: 1, marginLeft: hp('1.6%'), }}
                />

              </View>

              <View style={{ marginLeft: hp('1.9%'), marginVertical: hp('0.5%'), flexDirection: 'row', marginBottom: 0 }}>
                <TextInput
                  allowFontScaling={false}
                  value={point1}
                  onChangeText={setPoint1}
                  placeholder="Mục tiêu giai đoạn 1  "
                  placeholderTextColor="#87CEFF"
                  style={{ width: WIDTH * 0.55, height: hp('3.5%'), padding: 0, paddingRight: WIDTH * 0.01, color: '#00BFFF', fontSize: hp('2.5%'), fontWeight: 'bold', zIndex: 1, marginLeft: wp('0.6%'), }}
                />
                <TextInput
                  allowFontScaling={false}
                  value={dayPoint1}
                  onChangeText={setDayPoint1}
                  placeholder="Ngày hoàn thành "
                  placeholderTextColor="#87CEFF"
                  style={{ width: WIDTH * 0.44, height: hp('3.5%'), padding: 0, color: '#00BFFF', fontSize: hp('2.5%'), fontWeight: 'bold', zIndex: 1, }}
                />
              </View>

              <View style={{ marginLeft: hp('1.9%'), marginVertical: hp('0.5%'), flexDirection: 'row', marginBottom: 0 }}>
                <TextInput
                  allowFontScaling={false}
                  value={point2}
                  onChangeText={setPoint2}
                  placeholder="Mục tiêu giai đoạn 2  "
                  placeholderTextColor="#87CEFF"
                  style={{ width: WIDTH * 0.55, height: hp('3.5%'), padding: 0, paddingRight: WIDTH * 0.01, color: '#00BFFF', fontSize: hp('2.5%'), fontWeight: 'bold', zIndex: 1, marginLeft: wp('0.6%'), }}
                />
                <TextInput
                  allowFontScaling={false}
                  value={dayPoint2}
                  onChangeText={setDayPoint2}
                  placeholder="Ngày hoàn thành "
                  placeholderTextColor="#87CEFF"
                  style={{ width: WIDTH * 0.44, height: hp('3.5%'), padding: 0, color: '#00BFFF', fontSize: hp('2.5%'), fontWeight: 'bold', zIndex: 1, }}
                />
              </View>

              <View style={{ marginLeft: hp('1.9%'), marginVertical: hp('0.5%'), flexDirection: 'row', marginBottom: 0 }}>
                <TextInput
                  allowFontScaling={false}
                  value={point3}
                  onChangeText={setPoint3}
                  placeholder="Mục tiêu giai đoạn 3  "
                  placeholderTextColor="#87CEFF"
                  style={{ width: WIDTH * 0.55, height: hp('3.5%'), padding: 0, paddingRight: WIDTH * 0.01, color: '#00BFFF', fontSize: hp('2.5%'), fontWeight: 'bold', zIndex: 1, marginLeft: wp('0.6%'), }}
                />
                <TextInput
                  allowFontScaling={false}
                  value={dayPoint3}
                  onChangeText={setDayPoint3}
                  placeholder="Ngày hoàn thành "
                  placeholderTextColor="#87CEFF"
                  style={{ width: WIDTH * 0.44, height: hp('3.5%'), padding: 0, color: '#00BFFF', fontSize: hp('2.5%'), fontWeight: 'bold', zIndex: 1, }}
                />
              </View>

              <View style={{ marginLeft: hp('1.9%'), marginVertical: hp('0.5%'), flexDirection: 'row', marginBottom: 0 }}>
                <TextInput
                  allowFontScaling={false}
                  value={point4}
                  onChangeText={setPoint4}
                  placeholder="Mục tiêu giai đoạn 4  "
                  placeholderTextColor="#87CEFF"
                  style={{ width: WIDTH * 0.55, height: hp('3.5%'), padding: 0, paddingRight: WIDTH * 0.01, color: '#00BFFF', fontSize: hp('2.5%'), fontWeight: 'bold', zIndex: 1, marginLeft: wp('0.6%'), }}
                />
                <TextInput
                  allowFontScaling={false}
                  value={dayPoint4}
                  onChangeText={setDayPoint4}
                  placeholder="Ngày hoàn thành "
                  placeholderTextColor="#87CEFF"
                  style={{ width: WIDTH * 0.44, height: hp('3.5%'), padding: 0, color: '#00BFFF', fontSize: hp('2.5%'), fontWeight: 'bold', zIndex: 1, }}
                />
              </View>

              <View style={{ marginLeft: hp('1.9%'), marginVertical: hp('0.5%'), flexDirection: 'row', marginBottom: 0 }}>
                <TextInput
                  allowFontScaling={false}
                  value={point5}
                  onChangeText={setPoint5}
                  placeholder="Mục tiêu giai đoạn 5  "
                  placeholderTextColor="#87CEFF"
                  style={{ width: WIDTH * 0.55, height: hp('3.5%'), padding: 0, paddingRight: WIDTH * 0.01, color: '#00BFFF', fontSize: hp('2.5%'), fontWeight: 'bold', zIndex: 1, marginLeft: wp('0.6%'), }}
                />
                <TextInput
                  allowFontScaling={false}
                  value={dayPoint5}
                  onChangeText={setDayPoint5}
                  placeholder="Ngày hoàn thành "
                  placeholderTextColor="#87CEFF"
                  style={{ width: WIDTH * 0.44, height: hp('3.5%'), padding: 0, color: '#00BFFF', fontSize: hp('2.5%'), fontWeight: 'bold', zIndex: 1, }}
                />
              </View>

              <View style={{ marginVertical: hp('1%'), justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  allowFontScaling={false}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{ marginBottom: hp('0.8%'), color: '#FFD700', fontSize: hp('2.25%'), fontWeight: 'bold', paddingTop: 3, paddingBottom: 0 }}>
                  Vượt các giai đoạn, hoàn thành mục tiêu !
                </Text>
              </View>

            </View>

            <View style={{ zIndex: 9, alignItems: 'center', }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                  updateDataBase()
                }}
                style={{ borderWidth: 1, borderColor: 'blue', backgroundColor: 'blue', height: hp('5%'), width: WIDTH * 0.35, borderRadius: 20, margin: 7, textAlign: 'center', justifyContent: 'center', alignItems: 'center', marginRight: WIDTH * 0.05 }}
              >
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize: hp('2.3%'), color: 'white', width: '100%', fontWeight: 'bold' }}>
                    Đặt mục tiêu
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>

        {/* Hiển thị Modal Loading */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('./imges/Loading2.gif')} style={{ marginHorizontal: 8, width: 80, height: 80, zIndex: 1 }} resizeMode='cover' />
            </View>
          </View>
        </Modal>

      </View>
    </InternetConnectionAlert>

  );
}
