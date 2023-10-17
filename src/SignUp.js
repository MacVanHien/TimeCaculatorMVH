import React, { useState, } from 'react';
import { Text, View, Image, Alert, TouchableOpacity, TextInput, Dimensions, } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import moment from 'moment-timezone';
import InternetConnectionAlert from "react-native-internet-connection-alert";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const WIDTH = Dimensions.get("window").width
const H = Dimensions.get("window").height


export default function SignUp({ route, navigation }) {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    // const [userName, setUserName] = useState('')

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const [items, setItems] = useState([
        { label: 'Vietnam', value: 'Vietnam' },
        { label: 'Other country', value: 'Other' },
    ]);

    //chuyển dấu chấm thành dấu phẩy trong chuỗi Email
    // const emailFixToFirebase = email.replace("@gmail.com", "@gmail,com")


    function addDataBase(email, password, userId) {
        firebase.database().ref('users/' + userId).set({
            // firebase.database().ref('users/' + id).set({
            userName: email,
            // country: value,
            dayTime: moment().format('YYYYMMDD'),
            password: password,
            giveHeart: false,
        }, function (error) {
            if (error) {
                // The write failed...
                console.log('Lỗi')
            } else {
                // Data saved successfully!
                console.log('Thành Công !!!')
            }
        });
    }

    const dangky = async () => {
        // !!userName == false ? Alert.alert('Lỗi: Thông tin Tên nhập trống') : null
        !!password == false ? Alert.alert('Lỗi: Thông tin Mật khẩu nhập trống') : null
        !!email == false ? Alert.alert('Lỗi: Thông tin Tên nhập trống') : null
        // !!value == false ? Alert.alert('Lỗi: Thông tin chọn trống') : null

        !!password != false && !!email != false &&
            await auth().createUserWithEmailAndPassword(`${email.trim()}@gmail.com`, password) // Đăng kí một tài khoản với email đc tự động gắn đuôi và password người dùng đã nhập
                .then(() => {
                    let uid = auth()._user.uid
                    addDataBase(email, password, uid) //Add firebase khi thành công
                    Alert.alert(
                        'Thông báo',
                        'Đăng ký thành công!',
                        [
                            {
                                text: "Ok",
                                // onPress: () => {
                                //     setTimeout(() => {
                                //         addDataBase(userName, password, uid)
                                //         // Lấy thẳng uid thì đc, lấy qua useState thì ko đc
                                //     }, 1000);
                                // },
                            },
                            // {
                            //     text: "Hủy bỏ",
                            //     onPress: () => console.log("Cancel Pressed"),
                            //     style: "cancel"
                            // }
                        ]
                    )
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert('Tên đã được sử dụng!');
                    }

                    // if (error.code === 'auth/invalid-email') {
                    //     Alert.alert('T không hợp lệ!');
                    // }

                    else Alert.alert(`Có lỗi xảy ra! Đăng ký thất bại! 
Lỗi: ${error}`);
                });
    }




    return (
        <InternetConnectionAlert
            onChange={(connectionState) => {
                console.log("Connection State: ", connectionState);
            }}
        >
            {/* {... Your whole application should be here ... } */}
            <View style={{ height: '100%', width: '100%', flexDirection: 'column', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                    <Image source={require('./imges/iconTimeCalculator2.png')} style={{ margin: 0, marginTop: 5, width: '30%', height: WIDTH * 0.3, }} resizeMode='contain' />
                    <Text
                        allowFontScaling={false}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        style={{ fontSize: hp('2%'), fontWeight: 'bold', marginBottom: 10, color: '#333', }}>Time Calculator</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {/* gắn đuôi tự động @gmail.com vào để đăng nhập lên firebase */}
                    <TextInput allowFontScaling={false} value={email} onChangeText={setEmail} autoCapitalize="none" placeholder=' Nhập một tên viết liền, không dấu'
                        require={true} style={{ fontSize: 16, color: '#333', width: 300, backgroundColor: 'rgba(0, 0, 0, 0.08)', marginBottom: 3, marginTop: 15, }}
                        placeholderTextColor={'#fff'}
                    ></TextInput>
                    <TextInput allowFontScaling={false} value={password} onChangeText={setPassword} autoCapitalize="none" placeholder=' Nhập mật khẩu (ít nhất 6 kí tự)'
                        require={true} secureTextEntry={true} style={{ fontSize: 16, color: '#333', width: 300, backgroundColor: 'rgba(0, 0, 0, 0.08)', marginBottom: 3, }}
                        placeholderTextColor={'#fff'}
                    ></TextInput>

                    <View style={{ zIndex: 1, width: 300, height: H * 0.1, }}>
                        <DropDownPicker
                            placeholder='Chọn đất nước'
                            allowFontScaling={false}
                            // allowFontScaling={false} không chạy nên phải sét fontSize theo chiều rộng (hoặc cao)
                            textStyle={{ fontSize: WIDTH * 0.04 }}
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            style={{ width: 300, height: H * 0.05, opacity: 0.4, borderWidth: 0, paddingLeft: 5, backgroundColor: '#ddd' }}
                            dropDownStyle={{ backgroundColor: '#fff', with: WIDTH * 0.5, height: H * 0.2, marginHorizontal: '10' }}
                        />
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <TouchableOpacity
                            style={{
                                width: 150, height: 38, borderColor: 'white', borderWidth: 1, backgroundColor: 'blue', borderRadius: 20,
                                justifyContent: 'center', alignItems: 'center', marginTop: 10
                            }}
                            onPress={() =>
                                dangky()
                                // putToFirebaseHandle()
                            }
                        >
                            <Text allowFontScaling={false} style={{ color: 'white', fontSize: 15, marginHorizontal: '5.5%' }}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('LogIn');
                        }}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text allowFontScaling={false} style={{ fontSize: 14, color: '#333' }}>   Đã có tài khoản?</Text>
                            <Text allowFontScaling={false} style={{ fontSize: 14, color: 'blue', fontWeight: 'bold' }}> Đăng nhập</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 0 }}>
                        <Text allowFontScaling={false}
                            numberOfLines={1} adjustsFontSizeToFit
                            style={{ color: '#333', marginTop: 20, fontSize: 13, }}>
                            Không thể đăng ký ? liên hệ
                            {
                                <Text
                                    allowFontScaling={false}
                                    style={{ color: '#333', marginTop: 20, fontSize: 13, fontWeight: 'bold', }}
                                    selectable={true}
                                >
                                    {` macvanhien10@gmail.com`}
                                </Text>
                            }
                        </Text>

                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5, flexWrap: 'wrap' }}>
                        <Text
                            allowFontScaling={false}
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={{ fontSize: 12, color: '#333' }}>
                            Bằng việc đăng ký tài khoản, bạn đồng ý với
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('TermsOfUser');
                            }}
                        >
                            <Text
                                allowFontScaling={false}
                                numberOfLines={1}
                                adjustsFontSizeToFit
                                style={{ fontSize: 12, color: 'blue', fontWeight: 'bold', }}> {` Chính sách Bảo mật`} </Text>

                        </TouchableOpacity>
                    </View>

                    {/* <TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require('./imges/iconGoogle.png')} style={{ margin: 5, width: 20, height: 20 }} resizeMode="cover" />
                        <Text style={{ fontSize: 16, color: 'blue' }}>Đăng ký với Google</Text>
                    </View>
                </TouchableOpacity> */}
                </View>

            </View>
        </InternetConnectionAlert>

    )
}