import React, { useState, } from 'react';
import { Text, View, Image, Alert, TouchableOpacity, TextInput, Dimensions, } from 'react-native';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';
import moment from 'moment-timezone';
import InternetConnectionAlert from "react-native-internet-connection-alert";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const WIDTH = Dimensions.get("window").width
const HIEGHT = Dimensions.get("window").height


export default function SignUp({ route, navigation }) {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    // const [userName, setUserName] = useState('')

    // const [open, setOpen] = useState(false);
    // const [value, setValue] = useState(null);

    // const [items, setItems] = useState([
    //     { label: 'Vietnam', value: 'Vietnam' },
    //     { label: 'Afghanistan', value: 'Afghanistan' },
    //     { label: 'Albania', value: 'Albania' },
    //     { label: 'Algeria', value: 'Algeria' },
    //     { label: 'Andorra', value: 'Andorra' },
    //     { label: 'Angola', value: 'Angola' },
    //     { label: 'Antigua and Barbuda', value: 'Antigua and Barbuda' },
    //     { label: 'Argentina', value: 'Argentina' },
    //     { label: 'Armenia', value: 'Armenia' },
    //     { label: 'Australia', value: 'Australia' },
    //     { label: 'Austria', value: 'Austria' },
    //     { label: 'Azerbaijan', value: 'Azerbaijan' },
    //     { label: 'Bahamas', value: 'Bahamas' },
    //     { label: 'Bahrain', value: 'Bahrain' },
    //     { label: 'Bangladesh', value: 'Bangladesh' },
    //     { label: 'Barbados', value: 'Barbados' },
    //     { label: 'Belarus', value: 'Belarus' },
    //     { label: 'Belgium', value: 'Belgium' },
    //     { label: 'Belize', value: 'Belize' },
    //     { label: 'Benin', value: 'Benin' },
    //     { label: 'Bhutan', value: 'Bhutan' },
    //     { label: 'Bolivia', value: 'Bolivia' },
    //     { label: 'Bosnia and Herzegovina', value: 'Bosnia and Herzegovina' },
    //     { label: 'Botswana', value: 'Botswana' },
    //     { label: 'Brazil', value: 'Brazil' },
    //     { label: 'Brunei', value: 'Brunei' },
    //     { label: 'Bulgaria', value: 'Bulgaria' },
    //     { label: 'Burkina Faso', value: 'Burkina Faso' },
    //     { label: 'Burundi', value: 'Burundi' },
    //     { label: 'Cabo Verde', value: 'Cabo Verde' },
    //     { label: 'Cambodia', value: 'Cambodia' },
    //     { label: 'Cameroon', value: 'Cameroon' },
    //     { label: 'Canada', value: 'Canada' },
    //     { label: 'Central African Republic', value: 'Central African Republic' },
    //     { label: 'Chad', value: 'Chad' },
    //     { label: 'Chile', value: 'Chile' },
    //     { label: 'China', value: 'China' },
    //     { label: 'Colombia', value: 'Colombia' },
    //     { label: 'Comoros', value: 'Comoros' },
    //     { label: 'Congo', value: 'Congo' },
    //     { label: 'Costa Rica', value: 'Costa Rica' },
    //     { label: 'Côte d\'Ivoire', value: 'Côte d\'Ivoire' },
    //     { label: 'Croatia', value: 'Croatia' },
    //     { label: 'Cuba', value: 'Cuba' },
    //     { label: 'Cyprus', value: 'Cyprus' },
    //     { label: 'Czechia', value: 'Czechia' },
    //     { label: 'Denmark', value: 'Denmark' },
    //     { label: 'Djibouti', value: 'Djibouti' },
    //     { label: 'Dominica', value: 'Dominica' },
    //     { label: 'Dominican Republic', value: 'Dominican Republic' },
    //     { label: 'DR Congo', value: 'DR Congo' },
    //     { label: 'Ecuador', value: 'Ecuador' },
    //     { label: 'Egypt', value: 'Egypt' },
    //     { label: 'El Salvador', value: 'El Salvador' },
    //     { label: 'Equatorial Guinea', value: 'Equatorial Guinea' },
    //     { label: 'Eritrea', value: 'Eritrea' },
    //     { label: 'Estonia', value: 'Estonia' },
    //     { label: 'Eswatini', value: 'Eswatini' },
    //     { label: 'Ethiopia', value: 'Ethiopia' },
    //     { label: 'Fiji', value: 'Fiji' },
    //     { label: 'Finland', value: 'Finland' },
    //     { label: 'GoaFrance', value: 'GoaFrance' },
    //     { label: 'Gabon', value: 'Gabon' },
    //     { label: 'Gambia', value: 'Gambia' },
    //     { label: 'Georgia', value: 'Georgia' },
    //     { label: 'Germany', value: 'Germany' },
    //     { label: 'Ghana', value: 'Ghana' },
    //     { label: 'Greece', value: 'Greece' },
    //     { label: 'Grenada', value: 'Grenada' },
    //     { label: 'Guatemala', value: 'Guatemala' },
    //     { label: 'Guinea', value: 'Guinea' },
    //     { label: 'Guinea-Bissau', value: 'Guinea-Bissau' },
    //     { label: 'Guyana', value: 'Guyana' },
    //     { label: 'Haiti', value: 'Haiti' },
    //     { label: 'Holy See', value: 'Holy See' },
    //     { label: 'Honduras', value: 'Honduras' },
    //     { label: 'Hungary', value: 'Hungary' },
    //     { label: 'Iceland', value: 'Iceland' },
    //     { label: 'India', value: 'India' },
    //     { label: 'Indonesia', value: 'Indonesia' },
    //     { label: 'Iran', value: 'Iran' },
    //     { label: 'Iraq', value: 'Iraq' },
    //     { label: 'Ireland', value: 'Ireland' },
    //     { label: 'Israel', value: 'Israel' },
    //     { label: 'Italy', value: 'Italy' },
    //     { label: 'Jamaica', value: 'Jamaica' },
    //     { label: 'Japan', value: 'Japan' },
    //     { label: 'Jordan', value: 'Jordan' },
    //     { label: 'Kazakhstan', value: 'Kazakhstan' },
    //     { label: 'Kenya', value: 'Kenya' },
    //     { label: 'Kiribati', value: 'Kiribati' },
    //     { label: 'Kuwait', value: 'Kuwait' },
    //     { label: 'Kyrgyzstan', value: 'Kyrgyzstan' },
    //     { label: 'Laos', value: 'Laos' },
    //     { label: 'Latvia', value: 'Latvia' },
    //     { label: 'Lebanon', value: 'Lebanon' },
    //     { label: 'Lesotho', value: 'Lesotho' },
    //     { label: 'Liberia', value: 'Liberia' },
    //     { label: 'Libya', value: 'Libya' },
    //     { label: 'Liechtenstein', value: 'Liechtenstein' },
    //     { label: 'Lithuania', value: 'Lithuania' },
    //     { label: 'Luxembourg', value: 'Luxembourg' },
    //     { label: 'Madagascar', value: 'Madagascar' },
    //     { label: 'Malawi', value: 'Malawi' },
    //     { label: 'Malaysia', value: 'Malaysia' },
    //     { label: 'Maldives', value: 'Maldives' },
    //     { label: 'Mali', value: 'Mali' },
    //     { label: 'Malta', value: 'Malta' },
    //     { label: 'Marshall Islands', value: 'Marshall Islands' },
    //     { label: 'Mauritania', value: 'Mauritania' },
    //     { label: 'Mauritius', value: 'Mauritius' },
    //     { label: 'Mexico', value: 'Mexico' },
    //     { label: 'Micronesia', value: 'Micronesia' },
    //     { label: 'Moldova', value: 'Moldova' },
    //     { label: 'Monaco', value: 'Monaco' },
    //     { label: 'Mongolia', value: 'Mongolia' },
    //     { label: 'Montenegro', value: 'Montenegro' },
    //     { label: 'Morocco', value: 'Morocco' },
    //     { label: 'Mozambique', value: 'Mozambique' },
    //     { label: 'Myanmar', value: 'Myanmar' },
    //     { label: 'Namibia', value: 'Namibia' },
    //     { label: 'Nauru', value: 'Nauru' },
    //     { label: 'Nepal', value: 'Nepal' },
    //     { label: 'Netherlands', value: 'Netherlands' },
    //     { label: 'New Zealand', value: 'New Zealand' },
    //     { label: 'Nicaragua', value: 'Nicaragua' },
    //     { label: 'Niger', value: 'Niger' },
    //     { label: 'Nigeria', value: 'Nigeria' },
    //     { label: 'North Korea', value: 'North Korea' },
    //     { label: 'North Macedonia', value: 'North Macedonia' },
    //     { label: 'Norway', value: 'Norway' },
    //     { label: 'Oman', value: 'Oman' },
    //     { label: 'Pakistan', value: 'Pakistan' },
    //     { label: 'Palau', value: 'Palau' },
    //     { label: 'Panama', value: 'Panama' },
    //     { label: 'Papua New Guinea', value: 'Papua New Guinea' },
    //     { label: 'Paraguay', value: 'Paraguay' },
    //     { label: 'Peru', value: 'Peru' },
    //     { label: 'Philippines', value: 'Philippines' },
    //     { label: 'Poland', value: 'Poland' },
    //     { label: 'Portugal', value: 'Portugal' },
    //     { label: 'Qatar', value: 'Qatar' },
    //     { label: 'Romania', value: 'Romania' },
    //     { label: 'Russia', value: 'Russia' },
    //     { label: 'Rwanda', value: 'Rwanda' },
    //     { label: 'Saint Kitts & Nevis', value: 'Saint Kitts & Nevis' },
    //     { label: 'Saint Lucia', value: 'Saint Lucia' },
    //     { label: 'Samoa', value: 'Samoa' },
    //     { label: 'San Marino', value: 'San Marino' },
    //     { label: 'Sao Tome & Principe', value: 'Sao Tome & Principe' },
    //     { label: 'Saudi Arabia', value: 'Saudi Arabia' },
    //     { label: 'Senegal', value: 'Senegal' },
    //     { label: 'Serbia', value: 'Serbia' },
    //     { label: 'Seychelles', value: 'Seychelles' },
    //     { label: 'Sierra Leone', value: 'Sierra Leone' },
    //     { label: 'Singapore', value: 'Singapore' },
    //     { label: 'Slovakia', value: 'Slovakia' },
    //     { label: 'Slovenia', value: 'Slovenia' },
    //     { label: 'Solomon Islands', value: 'Solomon Islands' },
    //     { label: 'Somalia', value: 'Somalia' },
    //     { label: 'South Africa', value: 'South Africa' },
    //     { label: 'South Korea', value: 'South Korea' },
    //     { label: 'South Sudan', value: 'South Sudan' },
    //     { label: 'Spain', value: 'Spain' },
    //     { label: 'Sri Lanka', value: 'Sri Lanka' },
    //     { label: 'St. Vincent & Grenadines', value: 'St. Vincent & Grenadines' },
    //     { label: 'State of Palestine', value: 'State of Palestine' },
    //     { label: 'Sudan', value: 'Sudan' },
    //     { label: 'Suriname', value: 'Suriname' },
    //     { label: 'Sweden', value: 'Sweden' },
    //     { label: 'Switzerland', value: 'Switzerland' },
    //     { label: 'Syria', value: 'Syria' },
    //     { label: 'Tajikistan', value: 'Tajikistan' },
    //     { label: 'Tanzania', value: 'Tanzania' },
    //     { label: 'Thailand', value: 'Thailand' },
    //     { label: 'Timor-Leste', value: 'Timor-Leste' },
    //     { label: 'Togo', value: 'Togo' },
    //     { label: 'Tonga', value: 'Tonga' },
    //     { label: 'Trinidad and Tobago', value: 'Trinidad and Tobago' },
    //     { label: 'Tunisia', value: 'Tunisia' },
    //     { label: 'Turkey', value: 'Turkey' },
    //     { label: 'Turkmenistan', value: 'Turkmenistan' },
    //     { label: 'Tuvalu', value: 'Tuvalu' },
    //     { label: 'Uganda', value: 'Uganda' },
    //     { label: 'Ukraine', value: 'Ukraine' },
    //     { label: 'United Arab Emirates', value: 'United Arab Emirates' },
    //     { label: 'United Kingdom', value: 'United Kingdom' },
    //     { label: 'United States', value: 'United States' },
    //     { label: 'Uruguay', value: 'Uruguay' },
    //     { label: 'Uzbekistan', value: 'Uzbekistan' },
    //     { label: 'Vanuatu', value: 'Vanuatu' },
    //     { label: 'Venezuela', value: 'Venezuela' },
    //     { label: 'Vietnam ', value: 'Vietnam ' },
    //     { label: 'Yemen', value: 'Yemen' },
    //     { label: 'Zambia', value: 'Zambia' },
    //     { label: 'Zimbabwe', value: 'Zimbabwe' },
    // ]);

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
                        style={{ fontSize: hp('2%'), fontWeight: 'bold', marginBottom: 10 }}>Time Calculator</Text>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {/* <TextInput
                        allowFontScaling={false}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        value={userName} onChangeText={setUserName} placeholder='Tên của bạn' require={true} style={{ fontSize: hp('2%'), color: '#333', width: 300, padding: hp('0.5%'), }}>
                    </TextInput> */}
                    <TextInput
                        allowFontScaling={false}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        value={email} onChangeText={setEmail} autoCapitalize="none" placeholder='Nhập một tên viết liền không dấu' require={true} style={{ fontSize: hp('2%'), color: '#333', width: 300, padding: hp('0.5%'), }}>
                    </TextInput>
                    <TextInput
                        allowFontScaling={false}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                        value={password} onChangeText={setPassword} autoCapitalize="none" placeholder='Nhập mật khẩu' require={true} secureTextEntry={true} style={{ fontSize: hp('2%'), color: '#333', width: 300, padding: hp('0.5%'), }}>
                    </TextInput>
                    {/* <View>
                        <DropDownPicker
                            allowFontScaling={false}
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            placeholder='Your country'
                            placeholderStyle={{
                                color: "#000",
                            }}
                            // listParentLabelStyle={{
                            //     fontWeight: "bold"
                            // }}
                            selectedItemLabelStyle={{
                                fontWeight: "bold"
                            }} // Đã chọn sẽ được bôi đậm
                            textStyle={{ fontSize: hp('2%') }}
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            style={{ width: 300, opacity: 0.4, borderWidth: 0, paddingLeft: 5, fontWeight: 'bold' }}

                        >
                            <Text>Hello</Text>
                        </DropDownPicker>
                    </View> */}

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <TouchableOpacity
                            style={{ height: hp('5%'), borderColor: 'white', borderWidth: 1, backgroundColor: 'blue', borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: hp('2%') }}
                            onPress={() =>
                                dangky()
                                // putToFirebaseHandle()
                            }
                        >
                            <Text
                                allowFontScaling={false}
                                numberOfLines={1}
                                adjustsFontSizeToFit
                                style={{ color: 'white', fontSize: hp('2%'), paddingHorizontal: wp('8%'), fontWeight: 'bold' }}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('LogIn');
                        }}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text
                                allowFontScaling={false}
                                numberOfLines={1}
                                adjustsFontSizeToFit
                                style={{ fontSize: hp('1.9%'), color: '#333', }}>   Đã có tài khoản?</Text>
                            <Text
                                allowFontScaling={false}
                                numberOfLines={1}
                                adjustsFontSizeToFit
                                style={{ fontSize: hp('1.9%'), color: 'blue', fontWeight: 'bold' }}> Đăng nhập.</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 0, flexWrap: 'wrap', marginTop: 18, marginBottom: 1 }}>
                        <Text
                            allowFontScaling={false}
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={{ color: '#333', fontSize: hp('1.85%'), }}>Xảy ra vấn đề? liên hệ  </Text>
                        <Text
                            allowFontScaling={false}
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={{ color: '#333', fontSize: hp('1.85%'), fontWeight: 'bold', }}
                            selectable={true}
                        >
                            {` macvanhien10@gmail.com `}
                        </Text>
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 5, flexWrap: 'wrap' }}>
                        <Text
                            allowFontScaling={false}
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={{ fontSize: hp('1.85%'), color: '#333' }}>Bằng việc đăng ký tài khoản, bạn đồng ý với</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('TermsOfUser');
                            }}
                        >
                            <Text
                                allowFontScaling={false}
                                numberOfLines={1}
                                adjustsFontSizeToFit
                                style={{ fontSize: hp('1.8%'), color: 'blue', fontWeight: 'bold', }}> {` Chính sách Bảo mật`} </Text>

                        </TouchableOpacity>
                    </View>


                    {/* <TouchableOpacity>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        <Image source={require('../img/iconGoogle.png')} style={{ margin: 5, width: 20, height: 20 }} resizeMode="cover" />
                        <Text style={{ fontSize: hp('2.5%'), color: 'blue' }}>Đăng ký với Google</Text>
                    </View>
                </TouchableOpacity> */}
                </View>

            </View>
        </InternetConnectionAlert>

    )
}