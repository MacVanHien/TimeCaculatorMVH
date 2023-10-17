
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


  const [point1, setPoint1] = useState('');
  const [point1b, setPoint1b] = useState('');
  const [point2, setPoint2] = useState('');
  const [point2b, setPoint2b] = useState('');
  const [point3, setPoint3] = useState('');
  const [point3b, setPoint3b] = useState('');

  const [dayPoint1, setDayPoint1] = useState('');
  const [dayPoint1b, setDayPoint1b] = useState('');
  const [dayPoint2, setDayPoint2] = useState('');
  const [dayPoint2b, setDayPoint2b] = useState('');
  const [dayPoint3, setDayPoint3] = useState('');
  const [dayPoint3b, setDayPoint3b] = useState('');

  const [takeDayPoint1, setTakeDayPoint1] = useState(0);
  const [takeDayPoint1b, setTakeDayPoint1b] = useState(0);
  const [takeDayPoint2, setTakeDayPoint2] = useState(0);
  const [takeDayPoint2b, setTakeDayPoint2b] = useState(0);
  const [takeDayPoint3, setTakeDayPoint3] = useState(0);
  const [takeDayPoint3b, setTakeDayPoint3b] = useState(0);




  useEffect(() => {
    setTimeout(() => {
      setModalVisible(false)
    }, 800);
    // console.log('Moment:', moment().format('DD/MM/YYYY'))
  }, [])

  //Tính toán về ngày sau khi lấy dữ liệu từ firebase về
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

    if (!!moment(dayPoint1, 'DD/MM/YYYY') == true) {
      let d1 = moment(dayPoint1b, 'DD/MM/YYYY').format(); //để đc dạng "2022-06-30"
      var msDiffd1 = new Date().getTime() - new Date(d1).getTime()  ; //Future date - current date
      var daysTillTheDayd1 = Math.floor(msDiffd1 / (1000 * 60 * 60 * 24));
      setTakeDayPoint1b(daysTillTheDayd1);
    }
    if (!!moment(dayPoint1, 'DD/MM/YYYY') == true) {
      let d1 = moment(dayPoint2b, 'DD/MM/YYYY').format(); //để đc dạng "2022-06-30"
      var msDiffd1 = new Date().getTime() - new Date(d1).getTime()  ; //Future date - current date
      var daysTillTheDayd1 = Math.floor(msDiffd1 / (1000 * 60 * 60 * 24));
      setTakeDayPoint2b(daysTillTheDayd1);
    }
    if (!!moment(dayPoint1, 'DD/MM/YYYY') == true) {
      let d1 = moment(dayPoint3b, 'DD/MM/YYYY').format(); //để đc dạng "2022-06-30"
      var msDiffd1 = new Date().getTime() - new Date(d1).getTime()  ; //Future date - current date
      var daysTillTheDayd1 = Math.floor(msDiffd1 / (1000 * 60 * 60 * 24));
      setTakeDayPoint3b(daysTillTheDayd1);
    }

  }, [dayPoint1, dayPoint2, dayPoint3, dayPoint1b, dayPoint2b, dayPoint3b,])


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

  //tải dữ liệu từ firebase về rồi mới tính toán sau
  useEffect(() => {
    userId != '' && getUserInfor()
  }, [userId])
  //Khi email thay đổi thì render lại thì get_DATA_Users mới hoạt động đúng ý định

  function getUserInfor() {
    if (userId) {
      firebase.database().ref(`users/${userId}/point1`).on('value', snapshot => {
        snapshot.val() !== null && setPoint1(snapshot.val());
      });
      firebase.database().ref(`users/${userId}/point2`).on('value', snapshot => {
        snapshot.val() !== null && setPoint2(snapshot.val());
      });
      firebase.database().ref(`users/${userId}/point3`).on('value', snapshot => {
        snapshot.val() !== null && setPoint3(snapshot.val());
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


      firebase.database().ref(`users/${userId}/point1b`).on('value', snapshot => {
        snapshot.val() !== null && setPoint1b(snapshot.val());
      });
      firebase.database().ref(`users/${userId}/point2b`).on('value', snapshot => {
        snapshot.val() !== null && setPoint2b(snapshot.val());
      });
      firebase.database().ref(`users/${userId}/point3b`).on('value', snapshot => {
        snapshot.val() !== null && setPoint3b(snapshot.val());
      });

      firebase.database().ref(`users/${userId}/dayPoint1b`).on('value', snapshot => {
        snapshot.val() !== null && setDayPoint1b(snapshot.val());
      });
      firebase.database().ref(`users/${userId}/dayPoint2b`).on('value', snapshot => {
        snapshot.val() !== null && setDayPoint2b(snapshot.val());
      });
      firebase.database().ref(`users/${userId}/dayPoint3b`).on('value', snapshot => {
        snapshot.val() !== null && setDayPoint3b(snapshot.val());
      });
    }
  }

  //Khi nhất submit thì update lên firebase
  function updateDataBase() {
    if (userId) {
      firebase.database().ref(`users/${userId}/point1`).set(point1)
      firebase.database().ref(`users/${userId}/point2`).set(point2)
      firebase.database().ref(`users/${userId}/point3`).set(point3)
      firebase.database().ref(`users/${userId}/dayPoint1`).set(dayPoint1)
      firebase.database().ref(`users/${userId}/dayPoint2`).set(dayPoint2)
      firebase.database().ref(`users/${userId}/dayPoint3`).set(dayPoint3)

      firebase.database().ref(`users/${userId}/point1b`).set(point1b)
      firebase.database().ref(`users/${userId}/point2b`).set(point2b)
      firebase.database().ref(`users/${userId}/point3b`).set(point3b)
      !!dayPoint1b == false ? firebase.database().ref(`users/${userId}/dayPoint1b`).set(moment().format('DD/MM/YYYY')) :
        firebase.database().ref(`users/${userId}/dayPoint1b`).set(dayPoint1b)
      !!dayPoint2b == false ? firebase.database().ref(`users/${userId}/dayPoint2b`).set(moment().format('DD/MM/YYYY')) :
        firebase.database().ref(`users/${userId}/dayPoint2b`).set(dayPoint2b)
      !!dayPoint3b == false ? firebase.database().ref(`users/${userId}/dayPoint3b`).set(moment().format('DD/MM/YYYY')) :
        firebase.database().ref(`users/${userId}/dayPoint3b`).set(dayPoint3b)
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

  }, [takeDayPoint1, takeDayPoint2, takeDayPoint3])




  return (
    <InternetConnectionAlert
      onChange={(connectionState) => {
        console.log("Connection State: ", connectionState);
      }}
    >
      {/* {... Your whole application should be here ... } */}
      <View style={{ backgroundColor: '#FFFAF0', height: '100%', width: WIDTH * 1 }}>
        {/* Hiển thị nút back */}
        <View style={{ height: hp('5.5%'), backgroundColor: '#eee', zIndex: 9, justifyContent: 'center' }}>
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
              <View style={{ width: WIDTH * 0.9, justifyContent: 'center', alignItems: 'center', }}>
                <Text
                  allowFontScaling={false}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{
                    paddingLeft: 0, fontSize: hp('2.2%'), fontWeight: 'bold', color: '#333',
                  }}>
                  {` Đếm ngày `}
                </Text>
              </View>

            </View>
          </TouchableOpacity>
        </View>


        <ScrollView style={{ height: '90%', }}>

          {/* Hiển thị phần đếm ngày */}
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>

            {/* Hiển thị phần đếm ngày - phần Input*/}
            <View style={{ justifyContent: 'center', width: WIDTH, marginTop: 10, }}>
              <View style={{ width: WIDTH, flexDirection: 'row', marginTop: 5, justifyContent: 'center', flexWrap: 'wrap', }}>
                <View style={{ position: 'relative', }}>
                  <Image
                    allowFontScaling={false}
                    source={require('./imges/iconExcercise.png')}
                    style={{ width: WIDTH * 0.08, height: WIDTH * 0.08, borderRadius: 50, position: 'relative', bottom: 2, }}
                    resizeMode="contain"
                  />
                </View>

                <View style={{ position: 'relative', }}>
                  <Text
                    allowFontScaling={false}
                    style={{ color: '#333', fontSize: hp('2.3%'), fontWeight: 'bold', paddingLeft: 8, position: 'relative', top: 7, }}>
                    Đếm ngày
                  </Text>
                </View>
              </View>

              <View style={{ marginLeft: hp('1.9%'), marginVertical: hp('0.5%'), flexDirection: 'row', marginBottom: 0 }}>
                <TextInput
                  allowFontScaling={false}
                  value={point1b}
                  onChangeText={setPoint1b}
                  placeholder=" Lí do đếm ngày "
                  placeholderTextColor="#777"
                  style={{
                    width: WIDTH * 0.5, padding: 2, color: '#333', fontSize: hp('2%'),
                    zIndex: 1, margin: 2, backgroundColor: 'rgba(0, 0, 0, 0.03)'
                  }}
                />
                <TextInput
                  allowFontScaling={false}
                  value={dayPoint1b}
                  onChangeText={setDayPoint1b}
                  placeholder=" Hôm nay bắt đầu "
                  placeholderTextColor="#333"
                  style={{
                    width: WIDTH * 0.44, padding: 2, color: '#333', fontSize: hp('2%'),
                    zIndex: 1, margin: 2, backgroundColor: 'rgba(0, 0, 0, 0.03)'
                  }}
                />
              </View>

              <View style={{ marginLeft: hp('1.9%'), marginVertical: hp('0.5%'), flexDirection: 'row', marginBottom: 0 }}>
                <TextInput
                  allowFontScaling={false}
                  value={point2b}
                  onChangeText={setPoint2b}
                  placeholder=" Lí do đếm ngày "
                  placeholderTextColor="#777"
                  style={{
                    width: WIDTH * 0.5, padding: 2, color: '#333', fontSize: hp('2%'),
                    zIndex: 1, margin: 2, backgroundColor: 'rgba(0, 0, 0, 0.03)'
                  }}
                />
                <TextInput
                  allowFontScaling={false}
                  value={dayPoint2b}
                  onChangeText={setDayPoint2b}
                  placeholder=" Hôm nay bắt đầu"
                  placeholderTextColor="#333"
                  style={{
                    width: WIDTH * 0.44, padding: 2, color: '#333', fontSize: hp('2%'),
                    zIndex: 1, margin: 2, backgroundColor: 'rgba(0, 0, 0, 0.03)'
                  }}
                />
              </View>

              <View style={{ marginLeft: hp('1.9%'), marginVertical: hp('0.5%'), flexDirection: 'row', marginBottom: 0 }}>
                <TextInput
                  allowFontScaling={false}
                  value={point3b}
                  onChangeText={setPoint3b}
                  placeholder=" Lí do đếm ngày "
                  placeholderTextColor="#777"
                  style={{
                    width: WIDTH * 0.5, padding: 2, color: '#333', fontSize: hp('2%'),
                    zIndex: 1, margin: 2, backgroundColor: 'rgba(0, 0, 0, 0.03)'
                  }}
                />
                <TextInput
                  allowFontScaling={false}
                  value={dayPoint3b}
                  onChangeText={setDayPoint3b}
                  placeholder=" Hôm nay bắt đầu "
                  placeholderTextColor="#333"
                  style={{
                    width: WIDTH * 0.44, padding: 2, color: '#333', fontSize: hp('2%'),
                    zIndex: 1, margin: 2, backgroundColor: 'rgba(0, 0, 0, 0.03)'
                  }}
                />
              </View>

              {/* Để dòng gạch ngang */}
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  allowFontScaling={false}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{ color: '#FFD700', fontSize: hp('2.3%'), fontWeight: 'bold', marginLeft: hp('0.6%'), paddingTop: 5, paddingBottom: 0 }}>
                  -----------------------------------
                </Text>
              </View>

            </View>

            {/* Hiển thị phần đếm ngày - phần review */}
            <View style={{ justifyContent: 'center', width: WIDTH, }}>

              <View style={{ width: WIDTH, flexDirection: 'row', }}>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.5, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', marginLeft: hp('1.9%'), paddingBottom: 1, marginBottom: 2 }}>
                  {`${point1b}`}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.5, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', paddingBottom: 1, marginBottom: 2 }}>
                  đã được {takeDayPoint1b} ngày
                </Text>
              </View>

              <View style={{ width: WIDTH, flexDirection: 'row', }}>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.5, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', marginLeft: hp('1.9%'), paddingVertical: 1, marginVertical: 2 }}>
                  {`${point2b}`}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.5, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', paddingVertical: 1, marginVertical: 2 }}>
                  đã được {takeDayPoint2b} ngày
                </Text>
              </View>

              <View style={{ width: WIDTH, flexDirection: 'row', }}>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.5, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', marginLeft: hp('1.9%'), paddingVertical: 1, marginVertical: 2 }}>
                  {`${point3b}`}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.5, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', paddingVertical: 1, marginVertical: 2 }}>
                  đã được {takeDayPoint3b} ngày
                </Text>
              </View>

            </View>

          </View>

          {/* Hiển thị Bảng phần Đếm ngược ngày */}
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>

            {/* Hiển thị Đếm ngược ngày - phần input*/}
            <View style={{ justifyContent: 'center', width: WIDTH, marginTop: 10, }}>
              <View style={{ width: WIDTH, flexDirection: 'row', marginTop: 5, justifyContent: 'center', flexWrap: 'wrap', }}>
                <View style={{ position: 'relative', }}>
                  <Image
                    allowFontScaling={false}
                    source={require('./imges/iconExcercise.png')}
                    style={{ width: WIDTH * 0.08, height: WIDTH * 0.08, borderRadius: 50, position: 'relative', bottom: 2, }}
                    resizeMode="contain"
                  />
                </View>

                <View style={{ position: 'relative', }}>
                  <Text
                    allowFontScaling={false}
                    style={{ color: '#333', fontSize: hp('2.3%'), fontWeight: 'bold', paddingLeft: 8, position: 'relative', top: 7, }}>
                    Đếm ngược ngày
                  </Text>
                </View>
              </View>

              <View style={{ marginLeft: hp('1.9%'), marginVertical: hp('0.5%'), flexDirection: 'row', marginBottom: 0 }}>
                <TextInput
                  allowFontScaling={false}
                  value={point1}
                  onChangeText={setPoint1}
                  placeholder=" Ghi chú "
                  placeholderTextColor="#777"
                  style={{
                    width: WIDTH * 0.55, padding: 2, color: '#333', fontSize: hp('2.2%'),
                    zIndex: 1, margin: 2, backgroundColor: 'rgba(0, 0, 0, 0.03)'
                  }}
                />
                <TextInput
                  allowFontScaling={false}
                  value={dayPoint1}
                  onChangeText={setDayPoint1}
                  placeholder=" Ngày sự kiện "
                  placeholderTextColor="#777"
                  style={{
                    width: WIDTH * 0.39, padding: 2, color: '#333', fontSize: hp('2.2%'), zIndex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.03)', margin: 2,
                  }}
                />
              </View>

              <View style={{ marginLeft: hp('1.9%'), marginVertical: hp('0.5%'), flexDirection: 'row', marginBottom: 0 }}>
                <TextInput
                  allowFontScaling={false}
                  value={point2}
                  onChangeText={setPoint2}
                  placeholder=" Ghi chú  "
                  placeholderTextColor="#777"
                  style={{
                    width: WIDTH * 0.55, padding: 2, color: '#333', fontSize: hp('2.2%'),
                    zIndex: 1, margin: 2, backgroundColor: 'rgba(0, 0, 0, 0.03)'
                  }}
                />
                <TextInput
                  allowFontScaling={false}
                  value={dayPoint2}
                  onChangeText={setDayPoint2}
                  placeholder=" Ngày sự kiện "
                  placeholderTextColor="#777"
                  style={{
                    width: WIDTH * 0.39, padding: 2, color: '#333', fontSize: hp('2.2%'),
                    zIndex: 1, margin: 2, backgroundColor: 'rgba(0, 0, 0, 0.03)'
                  }}
                />
              </View>

              <View style={{ marginLeft: hp('1.9%'), marginVertical: hp('0.5%'), flexDirection: 'row', marginBottom: 0 }}>
                <TextInput
                  allowFontScaling={false}
                  value={point3}
                  onChangeText={setPoint3}
                  placeholder=" Ghi chú "
                  placeholderTextColor="#777"
                  style={{
                    width: WIDTH * 0.55, padding: 2, color: '#333', fontSize: hp('2.2%'),
                    zIndex: 1, margin: 2, backgroundColor: 'rgba(0, 0, 0, 0.03)'
                  }}
                />
                <TextInput
                  allowFontScaling={false}
                  value={dayPoint3}
                  onChangeText={setDayPoint3}
                  placeholder=" Ngày sự kiện "
                  placeholderTextColor="#777"
                  style={{
                    width: WIDTH * 0.39, padding: 2, color: '#333', fontSize: hp('2.2%'),
                    zIndex: 1, margin: 2, backgroundColor: 'rgba(0, 0, 0, 0.03)'
                  }}
                />
              </View>


              {/* Để dòng gạch ngang */}
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  allowFontScaling={false}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style={{ color: '#FFD700', fontSize: hp('2.3%'), fontWeight: 'bold', marginLeft: hp('0.6%'), paddingTop: 5, paddingBottom: 0 }}>
                  -----------------------------------
                </Text>
              </View>

            </View>

            {/* Hiển thị thị Đếm ngược ngày - phần review */}
            <View style={{ justifyContent: 'center', width: WIDTH, }}>

              <View style={{ width: WIDTH, flexDirection: 'row', }}>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.5, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', marginLeft: hp('1.9%'), paddingBottom: 1, marginBottom: 2 }}>
                  {`Còn ${takeDayPoint1} ngày đến:`}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.5, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', paddingBottom: 1, marginBottom: 2 }}>
                  {point1}
                </Text>
              </View>

              <View style={{ width: WIDTH, flexDirection: 'row', }}>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.5, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', marginLeft: hp('1.9%'), paddingVertical: 1, marginVertical: 2 }}>
                  {`Còn ${takeDayPoint2} ngày đến:`}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.5, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', paddingVertical: 1, marginVertical: 2 }}>
                  {point2}
                </Text>
              </View>

              <View style={{ width: WIDTH, flexDirection: 'row', }}>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.5, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', marginLeft: hp('1.9%'), paddingVertical: 1, marginVertical: 2 }}>
                  {`Còn ${takeDayPoint3} ngày đến:`}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={{ width: WIDTH * 0.5, color: '#333', fontSize: hp('2.2%'), fontWeight: 'bold', paddingVertical: 1, marginVertical: 2 }}>
                  {point3}
                </Text>
              </View>

            </View>

            <View style={{ zIndex: 9, alignItems: 'center', marginTop: 10, }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                  updateDataBase()
                }}
                style={{
                  borderWidth: 1, borderColor: 'blue', backgroundColor: 'blue', height: hp('5%'), width: WIDTH * 0.35, borderRadius: 20,
                  margin: 7, textAlign: 'center', justifyContent: 'center', alignItems: 'center', marginRight: WIDTH * 0.05
                }}
              >
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize: hp('2.3%'), color: 'white', width: '100%', fontWeight: 'bold' }}>
                    Xác nhận
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
