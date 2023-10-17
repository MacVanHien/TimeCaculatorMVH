import React, { useState } from 'react';
import { View, Image, Alert, TouchableOpacity, TextInput, Text, Dimensions } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import InternetConnectionAlert from "react-native-internet-connection-alert";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const WIDTH = Dimensions.get("window").width
const H = Dimensions.get("window").height


export default function LogIn({ route, navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dangNhap = () => {
        !!email == false ? Alert.alert('Lỗi: Thông tin tên nhập trống') : null
        !!password == false ? Alert.alert('Lỗi: Thông tin mật khẩu nhập trống') : null

        !!email != false && !!password != false &&
            firebase.auth().signInWithEmailAndPassword(`${email.trim()}@gmail.com`, password)
                .then(() => { navigation.navigate('Home') })
                .catch(error => {
                    Alert.alert('Có lỗi xảy ra! Đăng nhập thất bại! ');
                    console.log("🚀 ~ file: LogIn.js ~ line 23 ~ dangNhap ~ error", error)
                });
    }




    return (
        <InternetConnectionAlert
            onChange={(connectionState) => {
                console.log("Connection State: ", connectionState);
            }}
        >
            {/* {... Your whole application should be here ... } */}
            <View style={{ height: '100%', width: '100%', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    <Image source={require('./imges/iconTimeCalculator2.png')} style={{ margin: 0, width: '30%', height: WIDTH * 0.3, }} resizeMode="contain" />
                    <Text
                        allowFontScaling={false}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        style={{ fontSize: hp('2.1%'), fontWeight: 'bold', marginBottom: 10, color: '#333', }}>Time Calculator</Text>
                </View>
                <View>
                    <TextInput allowFontScaling={false} autoCapitalize="none" value={email} onChangeText={setEmail} placeholder=' Nhập tên đã đăng ký'
                        require={true} style={{ fontSize: 16, color: '#333', width: 300, backgroundColor: 'rgba(0, 0, 0, 0.08)', marginBottom: 3, marginTop: H * 0.02, }}
                        placeholderTextColor={'#fff'}
                    />
                    <TextInput allowFontScaling={false} autoCapitalize="none" value={password} onChangeText={setPassword} placeholder=' Nhập mật khẩu'
                        secureTextEntry={true} require={true} style={{ fontSize: 16, color: '#333', width: 300, backgroundColor: 'rgba(0, 0, 0, 0.08)', }}
                        placeholderTextColor={'#fff'}
                    />
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <TouchableOpacity
                            style={{
                                width: 150, height: 38, borderColor: 'white', borderWidth: 1, backgroundColor: 'blue', borderRadius: 20,
                                justifyContent: 'center', alignItems: 'center', marginTop: 20
                            }}
                            onPress={() => {
                                dangNhap()
                            }
                            }
                        >
                            <Text allowFontScaling={false} style={{ color: 'white', fontSize: 15, marginHorizontal: '5.5%' }}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('SignUp');
                        }}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text allowFontScaling={false} style={{ fontSize: 14, color: '#333' }}>   Chưa có tài khoản?</Text>
                            <Text allowFontScaling={false} style={{ fontSize: 14, color: 'blue', fontWeight: 'bold' }}> Đăng ký</Text>
                        </View>
                    </TouchableOpacity>

                    {/* <TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
                        <Image source={require('./imges/iconGoogle.png')} style={{ margin: 5, width: 20, height: 20 }} resizeMode="cover" />
                        <Text style={{ fontSize: 16, color: 'blue' }}>Đăng nhập với Google</Text>
                    </View>
                </TouchableOpacity> */}
                </View>
            </View>
        </InternetConnectionAlert>

    )
}