import {firebase} from '@react-native-firebase/auth';
import React, {useEffect} from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const WIDTH = Dimensions.get("window").width

export default function SplashScreen({navigation}) {

  useEffect(() => {
    NavigateToAuthAppScreen();
  }, [navigation]);

  function NavigateToAuthAppScreen() {
    setTimeout(() => {
      firebase.auth().onAuthStateChanged(user => {
        if (user != null) {
          navigation.navigate('Home');
        } else {
          //khi nhấn logout bên tap personnal thì bên navigation thay đổi nên lệnh
          //chạy, quay về màn hình login
          navigation.reset({
            index: 0,
            routes: [{name: 'SignUp'}],
          });
        }
      });
    }, 1000);
  }

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
      }}>
      <Image
        source={require('./imges/iconTimeCalculator2.png')}
        style={{ width: '40%', height: WIDTH*0.4}}
        resizeMode= 'contain'
      />
      {/* <Text
        allowFontScaling={false}
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{ fontSize: hp('2.3%'), fontWeight: 'bold', marginBottom: 10 }}>
        Time Calculator
      </Text>
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{ fontSize: hp('2.1%'), fontWeight: 'bold', }}>
        Kết nối cảm xúc
      </Text>
      <Text
        allowFontScaling={false}
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{ fontSize: hp('2.1%'), fontWeight: 'bold', }}>
        Kết nối tương lai
      </Text> */}
    </View>
  );
}
