import React, { useEffect, useState } from 'react';
import { Text, View, ImageBackground, TextInput, Dimensions, Image, TouchableOpacity, ScrollView, Modal, Alert, } from 'react-native';
// import AnalogClock from 'react-native-clock-analog';
import moment from 'moment-timezone';
import InternetConnectionAlert from "react-native-internet-connection-alert";

import Clock from './Clock'
import AppAddNote from './addNote/AppAddNote'

import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2701884189550059/1580395814';

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';
import { firebase } from '@react-native-firebase/database';


// Để responsive screen
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';




export default function Home({ route, navigation }) {
    const [modalVisible, setModalVisible] = useState(true);
    const [modalVisible2, setModalVisible2] = useState(false); 
    const [modalVisibleAddNote, setModalVisibleAddNote] = useState(false); 

    const [userId, setUserId] = useState(0);
    const [userName, setUserName] = useState('');
    const [dayTime, setDayTime] = useState('')

    const [minus, setMinus] = useState("0");
    const [plus, setPlus] = useState("0");
    const [toNow, setToNow] = useState('22/02/2022');
    const [toNowCount, setToNowCount] = useState(0);
    const [toDate, setToDate] = useState('22/01/2023');
    const [toDateCount, setToDateCount] = useState(0);

    const [takeToDate, setTakeToDate] = useState(0);
    const [takeSubtraction, setTakeSubtraction] = useState('')
    const [takeSum, setTakeSum] = useState('')
    const [fromNow, setFromNow] = useState('')

    const [isColorForFelling, setIsColorForFelling] = useState('flex')
    const [isShareWithHeart, setIsShareWithHeart] = useState('none')
    const [isSentenceBestWish, setIsSentenceBestWish] = useState('none')
    const [isSentenceWishFun, setIsSentenceWishFun] = useState('none')
    const [isSentenceHeartShared, setIsSentenceHeartShared] = useState('none')
    const [isHeaderHello, setIsHeaderHello] = useState('flex')
    const [isHeader, setIsHeader] = useState('none')

    const [sharedHearts, setSharedHearts] = useState(0)
    // const [dayTime, setDayTime] = useState('20220222'); //Để mặc định là  1 ngày nào đó trong quá khứ để chạy ok


    const [point1, setPoint1] = useState('');
    const [point1b, setPoint1b] = useState('');

    const [dayPoint1, setDayPoint1] = useState('');
    const [dayPoint1b, setDayPoint1b] = useState('');

    const [takeDayPoint1, setTakeDayPoint1] = useState(0);
    const [takeDayPoint1b, setTakeDayPoint1b] = useState(0);

    const [getColorUsersFeeling, setGetColorUsersFeeling] = useState()

    const [dataColor, setDataColor] = useState([])
    const [dataGiveHeart, setDataGiveHeart] = useState([])
    const [countDataColorFirst, setCountDataColorFirst] = useState(0) //Để chạy 1 lần duy nhất việc lấy màu hiển thị chung



    //modal loading 1,5s
    useEffect(() => {
        setTimeout(() => {
            setModalVisible(false)
        }, 1500);
    }, [])


    useEffect(() => {
        checkUserId();
    }, []);

    function checkUserId() {
        auth().onAuthStateChanged(user => {
            if (user != null) {
                //user trả về là một object có key email đang đăng nhập 
                setUserId(user.uid);
            } else {
                console.log('người dùng đang đăng xuất');
            }
        });
    }

    //Khi vào Lấy dữ liệu ngày dayTime trên firebase
    useEffect(() => {
        userId != '' && getDayTime();
    }, [userId]);

    function getDayTime() {
        firebase.database()
            .ref(`users/${userId}/dayTime`)
            .on('value', snapshot => {
                !!snapshot.val() !== false && setDayTime(snapshot.val());
            });
    }

    // Logic nếu không cùng ngày set lại dữ liệu ngày là Today và giá trị giveheart là false 
    useEffect(() => {
        let toDay = moment().format('YYYYMMDD') //Để bỏ bớt hh:mm:ss
        if (`${dayTime}` != '20220222' && `${dayTime}` != `${toDay}` && !!userId != false) { // Nếu ngày lưu trên firebase khác ngày hiện tại (Không cùng ngày)
            updateDayTime();
        }
    }, [dayTime]);

    function updateDayTime() {
        setDayTime(moment().format('YYYYMMDD'))
        firebase.database().ref(`users/${userId}/dayTime`).set(moment().format('YYYYMMDD'));
        firebase.database().ref(`users/${userId}/giveHeart`).set(false)
    }

    //Lấy tên của người dùng đã đăng kí
    useEffect(() => {
        userId !== 0 && getUserNameInfor(userId)
    }, [userId, userName])
    //Khi userId thay đổi thì render lại thì get_DATA_Users mới hoạt động đúng ý định

    function getUserNameInfor(userId) {
        firebase.database().ref(`users/${userId}/userName`).on('value', snapshot => {
            snapshot.val() !== null && setUserName(snapshot.val());
        });
    }


    //Lấy Arr màu đã chọn của users trên firebase
    useEffect(() => {
        if (!!userId !== 0 && countDataColorFirst == 0 && !!getColorUsersFeeling == false) { //Chỉ chạy một lần
            get_DataColor_Users()
            setGetColorUsersFeeling(array_unique_Exist_Most(dataColor)) //Lấy ra màu có số lần nhiều nhất vd màu #fff
        }
    }, [userId, dataColor]);

    const get_DataColor_Users = () => {
        let query = firebase.database().ref('users/').orderByChild('color')
        query.once('value', function (snapshot) {
            let array = [];
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                if (childData.color != undefined) {
                    array.push(
                        childData.color,
                    );
                }
            });
            console.log("arrayOfColor: ", array);
            setDataColor(array)
        });
    }


    //Tìm ra phần tử xuất hiện nhiều lần nhất
    function array_unique_Exist_Most(array) {
        array.sort(); // Xắp xếp lại theo quy tắc abc
        let max = [0, 0];
        //Sử dụng vòng lặp for để lọc ra các phần tử xuất hiện nhiều hơn 1 lần
        //So sánh số lần xuất hiện và thay đổi max khi cần.
        let count = 1;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === array[i + 1]) ++count; //Thấy phần tử trùng nhau thì tiếp tục đếm
            //Nếu thấy phần tử khác nhau thì so sánh tổng hợp rồi đếm phần tử tiếp
            else {
                //So sánh số lần xuất hiện với max[1] 
                if (max[1] < count) {
                    //Nếu tìm thấy phần tử xuất hiện nhiều hơn thì gán phần tử vào max[0]
                    //Và gán số lần xuất hiện vào max[1]
                    max[0] = array[i];
                    max[1] = count;
                }
                count = 1;
            }
        }
        // console.log("Phần tử " + max[0] + " xuất hiện nhiều nhất với " + max[1] + " lần");
        return max[0]
    }

    //Up tim chia sẻ
    function updateDataBaseHeartShared() {
        if (userId) {
            firebase.database().ref(`users/${userId}/giveHeart`).set(true)
        }
    }


    //Lấy dữ liệu "tim" Mọi người đã chia sẻ đến những người mang tâm trạng nhất //Lấy cả dữ liệu quá khứ của người chia sẻ từ lần cuối họ dùng và chia sẻ
    useEffect(() => {
        if (userId) {
            get_DataOfHeart_Users()
        }
    }, [userId])

    const get_DataOfHeart_Users = () => {
        let toDay = moment().format('YYYYMMDD') //Ngày hiện tại ( bỏ bớt hh:mm:ss)
        let query = firebase.database().ref('users/').orderByChild('giveHeart')
        query.once('value', function (snapshot) {
            let array = [];
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                if (childData.giveHeart != undefined) {
                    array.push(
                        childData.giveHeart,
                    );
                }
            });
            console.log("arrayOfGiveHeart: ", array);
            setDataGiveHeart(array)
        });
    }


    //Đếm số heart được share bởi users khác
    useEffect(() => {
        var count = 0;
        for (var i = 0; i < dataGiveHeart.length; ++i) { if (dataGiveHeart[i] == true) count++; }
        setSharedHearts(count)
        // console.log("🚀 ~ file: Home.js ~ line 219 ~ useEffect ~ count", count)
    }, [dataGiveHeart])


    //Update màu đc chọn nhiều nhất của users, set Count là 1 để ko bị chạy lại nữa, set Hiển thị câu wishFun sau 8s nếu bỏ qua chọn share
    function updateFirebaseAndShowMediumColor(color) {
        if (userId !== 0) {
            firebase.database().ref(`users/${userId}/color`).set(color)
        }
        //Show phần share tim với những ai "sad", settimeout để cảm giác không bị khó chịu
        setTimeout(() => {
            if (dataColor.length != 0 && countDataColorFirst == 0) { //để chỉ chạy một lần sau khi đã show màu chung của cảm xúc
                setCountDataColorFirst(1)
                setIsColorForFelling('none')
                setIsSentenceWishFun('none')
                setIsShareWithHeart('flex')
            }
        }, 500)


        //set nếu 8s ko chọn thì tự động tắt phần shared of heart
        setTimeout(() => {
            setIsShareWithHeart('none')
            setIsSentenceWishFun('flex')
            setIsColorForFelling('none')
        }, 8000); //Không cần clear vì vẫn có giá trị để nó set sau 8s


        // Set lại header khi đã chọn cảm xúc
        setTimeout(() => {
            setIsHeaderHello('none')
            setIsHeader('flex')
        }, 500);
    }

    //Để khi nhấn nút share tim thì show luôn WishFun
    function showSentencesWishFun() {
        setIsShareWithHeart('none')
        setIsSentenceWishFun('flex')
    }


    //Update firebase, hiển thị hearts shared và show bestWishes
    function updateFirebaseNotShowMediumColor(color) {
        if (userId !== 0) {
            firebase.database().ref(`users/${userId}/color`).set(color)
        }
        //Set 500ms để smooth cảm nhận
        if (sharedHearts != 0) { //Nếu có time mới hiển thị time share
            setTimeout(() => {
                if (dataColor.length != 0 && countDataColorFirst == 0) { //để chỉ chạy một lần sau khi đã show màu chung của cảm xúc
                    setCountDataColorFirst(1)
                    setIsColorForFelling('none')
                    setIsSentenceHeartShared('flex')
                    setIsSentenceBestWish('none')
                }
            }, 500);
        } else { //hiển thị luôn bestwhises nếu không có time shared
            setTimeout(() => {
                setIsSentenceHeartShared('none')
                setIsSentenceBestWish('flex')
                setIsColorForFelling('none')
            }, 500);
        }


        //Set lại header khi đã chọn cảm xúc, 500ms cùng lúc với hiển thị hearts shared
        setTimeout(() => {
            setIsHeaderHello('none')
            setIsHeader('flex')
        }, 500);

        //Tự động đóng hiển thị hearts shared, hiển thị bestwhises sau 5s
        setTimeout(() => {
            setIsSentenceHeartShared('none')
            setIsSentenceBestWish('flex')
            setIsColorForFelling('none')
        }, 4004); //Không cần clear vì vẫn có giá trị để nó set sau 4s


    }

    // function showSentencesBestWishesForSad() {
    //     setIsSentenceWishFun('none')
    //     setIsSentenceBestWish('flex')
    // }


    //Để tính toán cộng trừ ngày, đếm ngày nhập dữ liệu vào từ textInput
    useEffect(() => {
        let a = moment().subtract(minus, 'days').format('DD/MM/YYYY')
        setTakeSubtraction(a)

        let b = moment().add(plus, 'days').format('DD/MM/YYYY')
        setTakeSum(b)

        if (!!moment(toNow, 'DD/MM/YYYY') == true) {
            let d = moment(toNow, 'DD/MM/YYYY').format(); //để đc dạng "2022-06-30"
            let djs = new Date(d)
            var msDiff = new Date().getTime() - new Date(d).getTime(); //Future date - current date
            var daysTillTheDay = Math.floor(msDiff / (1000 * 60 * 60 * 24));
            if (djs.getFullYear() >= 1900) { //Để năm luôn > 1900
                setFromNow(daysTillTheDay);
            }
        }
        if (!!moment(toDate, 'DD/MM/YYYY') == true) {
            let d = moment(toDate, 'DD/MM/YYYY').format(); //để đc dạng "2022-06-30"
            let djs = new Date(d)
            var msDiffd = (new Date().getTime() - new Date(d).getTime()); //Future date - current date
            var daysTillTheDayd = - Math.floor(msDiffd / (1000 * 60 * 60 * 24)); //Dấu - đằng trước lấy dương, do math.floor làm tròn dưới nên có thể +- 1 ngày
            if (djs.getFullYear() >= 1900) {
                setTakeToDate(daysTillTheDayd);
            }
        }
    }, [minus, plus, toNow, toDate])


    //Để tính toán cộng trừ ngày, đếm ngày phần Hoạch định đến mục tiêu, dữ liệu lấy từ firebase
    useEffect(() => {
        if (!!moment(dayPoint1, 'DD/MM/YYYY') == true) {
            let d1 = moment(dayPoint1, 'DD/MM/YYYY').format(); //để đc dạng "2022-06-30"
            var msDiffd1 = new Date(d1).getTime() - new Date().getTime(); //Future date - current date
            var daysTillTheDayd1 = Math.floor(msDiffd1 / (1000 * 60 * 60 * 24));
            setTakeDayPoint1(daysTillTheDayd1);
        }
        if (!!moment(dayPoint1b, 'DD/MM/YYYY') == true) {
            let d2 = moment(dayPoint1b, 'DD/MM/YYYY').format(); //để đc dạng "2022-06-30"
            var msDiffd2 = new Date().getTime() - new Date(d2).getTime(); //Future date - current date
            var daysTillTheDayd2 = Math.floor(msDiffd2 / (1000 * 60 * 60 * 24));
            setTakeDayPoint1b(daysTillTheDayd2);
        }
    }, [dayPoint1, dayPoint1b])


    //get User Data Infor point 1 - 5, dayPoint 1 - 5
    useEffect(() => {
        userId != 0 && getUserDataInfor()
    }, [userId])
    //Khi email thay đổi thì render lại thì get_DATA_Users mới hoạt động đúng ý định

    function getUserDataInfor() {
        if (userId) {
            firebase.database().ref(`users/${userId}/point1`).on('value', snapshot => {
                snapshot.val() !== null && setPoint1(snapshot.val());
            });
            firebase.database().ref(`users/${userId}/point1b`).on('value', snapshot => {
                snapshot.val() !== null && setPoint1b(snapshot.val());
            });
            firebase.database().ref(`users/${userId}/dayPoint1`).on('value', snapshot => {
                snapshot.val() !== null && setDayPoint1(snapshot.val());
            });
            firebase.database().ref(`users/${userId}/dayPoint1b`).on('value', snapshot => {
                snapshot.val() !== null && setDayPoint1b(snapshot.val());
            });

            //lấy toDate và toNow về //Chỉ lấy lần đầu tiên sau khi vào app
            firebase.database().ref(`users/${userId}/todayToDate`).once('value', snapshot => {
                snapshot.val() !== null && setToDate(snapshot.val());
                setToDateCount(1); //Lấy về trước mới update được lên
            }); firebase.database().ref(`users/${userId}/dateToToday`).once('value', snapshot => {
                snapshot.val() !== null && setToNow(snapshot.val());
                setToNowCount(1);
            });
        }
    }


    signOutUser = async () => {
        try {
            await auth().signOut()
        } catch (e) {
            console.log(e)
        }
    }

    // Tạo bảng thông báo chắc chắn muốn đăng xuất
    const createTwoButtonAlert = () =>
        Alert.alert(
            "", //Alert Title
            "Bạn chắc chắn muốn đăng xuất ?",
            [
                {
                    text: "Hủy bỏ",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => signOutUser() }
            ]
        );


    //Set đếm ngày các đích về 0 khi đã về 0 hoặc âm ngày
    useEffect(() => {
        if (takeDayPoint1 <= 0) { //Chú ý tránh trường hợp lặp lại vô hạn lần !
            setTakeDayPoint1(0)
        }
        if (takeDayPoint1b <= 0) {
            setTakeDayPoint1b(0)
        }
    }, [takeDayPoint1, takeDayPoint1b])


    //Lưu toDate, toNow lên firebase
    useEffect(() => {
        if (userId && toDateCount != 0) { //Điều kiện sau để tránh tạo vòng lặp khi bắt đầu chạy, lần đầu tiên sẽ ko up lên firebase
            firebase.database().ref(`users/${userId}/todayToDate`).set(toDate)
        }
        if (userId && toNowCount != 0) {
            firebase.database().ref(`users/${userId}/dateToToday`).set(toNow)
        }
    }, [toNow, toDate])









    return (
        <InternetConnectionAlert
            onChange={(connectionState) => {
                console.log("Connection State: ", connectionState);
            }}
        >
            {/* {... Your whole application should be here ... } */}
            <View style={{ height: '100%', width: WIDTH, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ecf0f1', padding: 0, paddingHorizontal: 0 }}>
                <ImageBackground
                    source={require('./background.jpg')}
                    imageStyle={{ opacity: 0.9 }}
                    style={{ height: '100%', width: WIDTH, }}>
                    <View style={{ height: '100%', }}>
                        {/* Hiển thị phần logo và câu hỏi cảm xúc mở đầu */}
                        <View
                            style={{
                                display: isHeaderHello, height: HEIGHT * 0.096, width: WIDTH, backgroundColor: 'rgba(255, 250, 240, 0.99)',
                                paddingTop: 1, paddingLeft: 8, margin: 0, justifyContent: 'center',
                            }}
                        >
                            <View style={{ flexDirection: 'row', width: WIDTH, alignItems: 'center', margin: 0 }}>
                                <TouchableOpacity
                                    onPress={createTwoButtonAlert}
                                    style={{ padding: hp('0.5%'), borderRadius: 50 }}
                                >
                                    <Image
                                        allowFontScaling={false}
                                        source={require('./imges/iconTimeCalculator1.png')}
                                        style={{
                                            width: WIDTH * 0.12, height: WIDTH * 0.12, borderRadius: 50, backgroundColor: 'rgba(250, 250, 250)',
                                            position: 'relative', bottom: hp('-0.5%')
                                        }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>

                                <Text
                                    allowFontScaling={false}
                                    numberOfLines={1}
                                    adjustsFontSizeToFit
                                    style={{ marginLeft: wp('0.5%'), color: '#FF1493', fontSize: hp('2.5%'), fontWeight: 'bold', position: 'relative', bottom: hp('-1.5%') }}>
                                    {`Xin chào ${userName}, bạn ổn chứ?`}
                                </Text>
                            </View>
                            <Text
                                allowFontScaling={false}
                                numberOfLines={1}
                                adjustsFontSizeToFit
                                style={{ color: '#FF1493', fontSize: hp('2.2%'), fontWeight: 'bold', marginLeft: wp('15%'), marginBottom: hp('1%'), position: 'relative', bottom: 2 }}>
                                Cùng mọi người chia sẻ nhé!
                            </Text>
                        </View>

                        {/* Hiển thị phần logo và câu hỏi cảm xúc mở đầu khi đã chọn màu cảm xúc */}
                        <View
                            style={{
                                display: isHeader, flexDirection: 'row', height: HEIGHT * 0.096, width: WIDTH, backgroundColor: 'rgba(255, 250, 240, 0.99)',
                                justifyContent: 'center', alignItems: 'center'
                            }}>
                            <View
                            // onPress={createTwoButtonAlert}
                            >
                                <Image
                                    allowFontScaling={false}
                                    source={require('./imges/iconTimeCalculator1.png')}
                                    style={{ width: hp('8%'), height: hp('8%'), padding: 0, backgroundColor: '#FFF', borderRadius: 50, }}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text
                                allowFontScaling={false}
                                numberOfLines={1}
                                adjustsFontSizeToFit
                                style={{ color: '#555', fontSize: hp('3.2%'), fontWeight: 'bold', marginLeft: wp('1.5%'), position: "relative", top: hp('1%') }}>
                                Time Calculator
                            </Text>
                            <Text
                                allowFontScaling={false}
                                numberOfLines={1}
                                adjustsFontSizeToFit
                                style={{ color: '#333', fontSize: hp('2%'), fontWeight: 'bold', marginLeft: wp('2%'), }}>
                                v.2.1
                            </Text>
                        </View>


                        {/* Hiển thị phần chọn màu cảm xúc - và màu đa số được chọn */}
                        <View style={{ height: HEIGHT * 0.096, width: WIDTH, alignItems: 'center', justifyContent: 'center', }}>
                            <View style={{ display: isColorForFelling, flexDirection: 'row', height: '100%' }}>
                                <TouchableOpacity
                                    onPress={() => updateFirebaseAndShowMediumColor('#FFA500')}
                                    style={{ paddingVertical: 2, opacity: 0.95, backgroundColor: '#FFA500', width: '20%', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        numberOfLines={3}
                                        adjustsFontSizeToFit
                                        style={{ fontSize: hp('2.1%'), color: 'yellow', paddingHorizontal: 2, textAlign: 'center', fontWeight: 'bold' }}>rất vui, hạnh phúc</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => updateFirebaseAndShowMediumColor('#FFFF00')}
                                    style={{ paddingVertical: 2, opacity: 0.9, backgroundColor: '#FFFF00', width: '20%', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        numberOfLines={2}
                                        adjustsFontSizeToFit
                                        style={{ fontSize: hp('2.1%'), color: '#fff', paddingHorizontal: 2, textAlign: 'center', fontWeight: 'bold' }}>vui vẻ</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => updateFirebaseAndShowMediumColor('#FFF')}
                                    style={{ paddingVertical: 2, opacity: 0.8, backgroundColor: '#FFF', width: '20%', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        numberOfLines={2}
                                        adjustsFontSizeToFit
                                        style={{ fontSize: hp('2.1%'), color: '#FFFAFA', paddingHorizontal: 2, textAlign: 'center', fontWeight: 'bold' }}>
                                        bình thường
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => updateFirebaseNotShowMediumColor('#0000FF')}
                                    style={{ paddingVertical: 2, opacity: 0.6, backgroundColor: '#0000FF', width: '20%', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={{ fontSize: hp('2.1%'), color: '#fff', paddingHorizontal: 2, opacity: 0.8, textAlign: 'center', fontWeight: 'bold' }}>
                                        buồn
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => updateFirebaseNotShowMediumColor('#000')}
                                    style={{ paddingVertical: 0.8, backgroundColor: '#000', width: '20%', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <Text
                                        allowFontScaling={false}
                                        style={{ fontSize: hp('2.1%'), color: '#fff', paddingHorizontal: 2, opacity: 0.22, textAlign: 'center', fontWeight: 'bold' }}>
                                        rất buồn
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View
                                style={{
                                    display: isShareWithHeart, backgroundColor: getColorUsersFeeling != "#000" ? getColorUsersFeeling : 'rgba(0, 0, 0, 0.3)',
                                    opacity: 0.9, width: WIDTH, height: '100%', justifyContent: 'center', alignItems: 'center'
                                }}>
                                <View style={{ flexDirection: 'row', width: WIDTH, justifyContent: 'center', alignItems: 'center', }}>
                                    <Text
                                        allowFontScaling={false}
                                        numberOfLines={2}
                                        adjustsFontSizeToFit
                                        style={{ textAlign: 'center', marginLeft: hp('2.5%'), width: WIDTH * 0.8, fontSize: hp('2.2%'), fontWeight: 'bold', color: '#555', }}>
                                        {`Có bạn đang buồn, bạn có muốn chia sẻ tâm trạng cùng họ`}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            showSentencesWishFun()
                                            updateDataBaseHeartShared()
                                        }}
                                        style={{ paddingRight: 0, width: WIDTH * 0.2, }}
                                    >
                                        <Image
                                            allowFontScaling={false}
                                            source={require('./imges/heartNoBackground.png')}
                                            style={{ width: WIDTH * 0.1, height: WIDTH * 0.1, padding: 12, tintColor: '#FF1493', backgroundColor: '#87CEFF', borderRadius: 50 }}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{ display: isSentenceHeartShared, backgroundColor: 'rgba(0, 238, 118, 0.2)', width: WIDTH, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', width: WIDTH, justifyContent: 'center', alignItems: 'center', }}>
                                    <Text
                                        allowFontScaling={false}
                                        numberOfLines={2}
                                        adjustsFontSizeToFit
                                        style={{ textAlign: 'center', marginLeft: hp('2.5%'), width: WIDTH * 0.8, fontSize: hp('2.2%'), fontWeight: 'bold', color: '#FF1493', opacity: 0.8, }}>
                                        {` Có ${sharedHearts} trái tim chia sẻ, mọi người xin chia sẻ nỗi buồn cùng bạn `}
                                    </Text>
                                    <Image
                                        allowFontScaling={false}
                                        source={require('./imges/heartFullColor.png')}
                                        style={{ width: WIDTH * 0.1, height: WIDTH * 0.1, padding: 12, tintColor: '#FF1493', backgroundColor: '#00EE76', borderRadius: 50, opacity: 0.8 }}
                                        resizeMode="contain"
                                    />
                                </View>
                            </View>

                            <View
                                style={{
                                    paddingHorizontal: 3, display: isSentenceWishFun, backgroundColor: getColorUsersFeeling != "#000" ? getColorUsersFeeling : 'rgba(0, 0, 0, 0.3)',
                                    opacity: 0.9, width: WIDTH, height: '100%', paddingVertical: 15, justifyContent: 'center', alignItems: 'center'
                                }}>
                                <Text
                                    allowFontScaling={false}
                                    numberOfLines={1}
                                    adjustsFontSizeToFit
                                    style={{ textAlign: 'center', fontSize: hp('2.3%'), fontWeight: 'bold', color: '#FF1493', opacity: 0.8 }}>
                                    Chúc bạn luôn vui vẻ nhé
                                </Text>
                            </View>

                            <View
                                style={{
                                    paddingHorizontal: 3, display: isSentenceBestWish, backgroundColor: 'rgba(0, 238, 118, 0.2)', width: WIDTH, height: '100%',
                                    paddingVertical: 15, justifyContent: 'center', alignItems: 'center'
                                }}>
                                <Text
                                    allowFontScaling={false}
                                    numberOfLines={1}
                                    adjustsFontSizeToFit
                                    style={{ textAlign: 'center', fontSize: hp('2.3%'), fontWeight: 'bold', color: '#FF1493', opacity: 0.4, zIndex: 10 }}>
                                    Mong những điều tốt đẹp nhất đến với bạn
                                </Text>
                            </View>
                            {/* <View style={{ display: isShareWithHeart, backgroundColor: 'red', opacity: 0.9, width: WIDTH, justifyContent: 'center', alignItems: 'center', 
                            paddingVertical: 0, position: 'relative', height: 0.01, top: 0, }}>
                            </View> */}
                        </View>


                        {/* Hiển thị Đồng hồ - bảng tính-Đếm ngày - phần hoạch định đến đích */}
                        <View style={{ height: HEIGHT * 0.0096 * 66, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)', }}>
                            {/* Hiển thị Đồng hồ - bảng tính-Đếm ngày   */}
                            <View style={{ width: WIDTH, height: '50%', justifyContent: 'center', alignItems: 'center', borderRadius: 5, marginLeft: 0, }}>
                                {/* Hiển thị đồng hồ, ngày tháng âm lịch, dương lịch và nút sang trang chuyển đổi ngày dương-âm lịch */}
                                <View style={{ flexDirection: 'row', width: WIDTH, paddingLeft: wp('2%'), marginTop: HEIGHT * 0.02, flexWrap: 'wrap', }}>
                                    {/* Đồng hồ, ngày tháng âm - dương */}
                                    {<Clock />}
                                </View>

                                <View style={{ backgroundColor: '#fff', borderRadius: 8 }}>
                                    <View style={{ marginVertical: hp('0.5%'), paddingLeft: wp('2%'), paddingTop: 8, width: WIDTH, flexDirection: 'row', alignItems: 'center', }}>
                                        <View style={{ marginLeft: 8, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                                            <View style={{ maxWidth: wp('30%'), backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: 5, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                                <Text
                                                    allowFontScaling={false}
                                                    numberOfLines={1}
                                                    adjustsFontSizeToFit
                                                    style={{ paddingHorizontal: wp('1.5%'), borderRadius: 5, color: '#FFD700', fontSize: hp('2.3%'), fontWeight: 'bold', }}>
                                                    {`${takeToDate} ngày`}
                                                </Text>
                                            </View>

                                            <Text
                                                allowFontScaling={false}
                                                numberOfLines={1}
                                                adjustsFontSizeToFit
                                                style={{
                                                    paddingLeft: 0, color: '#333', fontSize: hp('2.3%'),
                                                }}>
                                                {` nữa đến ngày `}
                                            </Text>
                                        </View>
                                        <View style={{ borderRadius: 5, marginRight: wp('10%'), }}>
                                            <TextInput
                                                allowFontScaling={false}
                                                numberOfLines={1}
                                                adjustsFontSizeToFit
                                                value={toDate}
                                                onChangeText={setToDate}
                                                placeholder="0"
                                                placeholderTextColor="#87CEFF"
                                                style={{
                                                    width: wp('33%'), height: hp('3.5%'), marginHorizontal: wp('0.2%'), paddingHorizontal: wp('1%'), backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                    borderRadius: 5, padding: 0, color: '#00f', fontSize: hp('2.5%'), fontWeight: 'bold', zIndex: 1,
                                                }}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ paddingLeft: 18, width: WIDTH, flexDirection: 'row', alignItems: 'center', paddingVertical: 2, }}>
                                        <View style={{ flexDirection: 'row', width: WIDTH * 0.65, alignItems: 'center', flexWrap: 'wrap', }}>
                                            <Text
                                                allowFontScaling={false}
                                                style={{
                                                    paddingLeft: 0, marginBottom: hp('0.5%'), color: '#333', fontSize: hp('2.3%'),
                                                }}>
                                                {`Bớt `}
                                            </Text>
                                            <TextInput
                                                allowFontScaling={false}
                                                value={`${minus}`}
                                                onChangeText={setMinus}
                                                placeholder=""
                                                placeholderTextColor="#87CEFF"
                                                style={{
                                                    with: wp('20%'), height: hp('3.5%'), marginHorizontal: wp('1%'), paddingHorizontal: wp('1%'), backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                    borderRadius: 5, padding: 0, color: '#00f', fontSize: hp('2.5%'), fontWeight: 'bold', zIndex: 1,
                                                }}
                                            />
                                            <Text
                                                allowFontScaling={false}
                                                style={{
                                                    paddingLeft: 0, color: '#333', fontSize: hp('2.3%'),
                                                }}>
                                                {` ngày  là:`}
                                            </Text>
                                        </View>
                                        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 5, marginRight: 8, width: WIDTH * 0.35, }}>
                                            <Text
                                                allowFontScaling={false}
                                                style={{
                                                    color: '#FFD700', fontSize: hp('2.3%'), margin: 0, paddingHorizontal: 5, paddingVertical: 0, fontWeight: 'bold', width: WIDTH * 0.32
                                                }}>
                                                {takeSubtraction}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{ paddingLeft: 18, width: WIDTH, flexDirection: 'row', alignItems: 'center', marginBottom: 0, paddingVertical: 2, }}>
                                        <View style={{ flexDirection: 'row', width: WIDTH * 0.65, alignItems: 'center', flexWrap: 'wrap' }}>
                                            <Text
                                                allowFontScaling={false}
                                                style={{
                                                    paddingLeft: 0, color: '#333', fontSize: hp('2.3%'),
                                                }}>
                                                {`Thêm `}
                                            </Text>
                                            <TextInput
                                                allowFontScaling={false}
                                                value={`${plus}`}
                                                onChangeText={setPlus}
                                                placeholder=""
                                                placeholderTextColor="#87CEFF"
                                                style={{
                                                    with: wp('20%'), height: hp('3.5%'), marginHorizontal: wp('1%'), paddingHorizontal: wp('1%'), backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                    borderRadius: 5, padding: 0, color: '#00F', fontSize: hp('2.5%'), fontWeight: 'bold', zIndex: 1,
                                                }}
                                            />
                                            <Text
                                                allowFontScaling={false}
                                                style={{
                                                    paddingLeft: 0, color: '#333', fontSize: hp('2.3%'),
                                                }}>
                                                {` ngày  là:`}
                                            </Text>
                                        </View>
                                        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 5, marginRight: 8, }}>
                                            <Text
                                                allowFontScaling={false}
                                                style={{
                                                    marginRight: 20, color: '#FFD700', fontSize: hp('2.3%'), margin: 0, paddingHorizontal: 5, paddingRight: 0, fontWeight: 'bold', width: WIDTH * 0.32,
                                                }}>
                                                {takeSum}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={{ marginVertical: hp('0.5%'), paddingLeft: 18, paddingBottom: 8, width: WIDTH, flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ width: WIDTH * 0.65, flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', }}>
                                            <Text
                                                allowFontScaling={false}
                                                style={{
                                                    paddingLeft: 0, color: '#333', fontSize: hp('2.3%'),
                                                }}>
                                                Ngày
                                            </Text>
                                            <TextInput
                                                allowFontScaling={false}
                                                value={toNow}
                                                onChangeText={setToNow}
                                                placeholder=""
                                                placeholderTextColor="#87CEFF"
                                                style={{
                                                    with: wp('20%'), height: hp('3.5%'), marginHorizontal: wp('1%'), paddingHorizontal: wp('1%'), backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                    borderRadius: 5, padding: 0, color: '#00F', fontSize: hp('2.5%'), fontWeight: 'bold', zIndex: 1,
                                                }}
                                            />
                                            <Text
                                                allowFontScaling={false}
                                                style={{
                                                    color: '#333', fontSize: hp('2.3%'),
                                                }}>
                                                tới nay:
                                            </Text>
                                        </View>
                                        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', borderRadius: 5, marginRight: wp('3.2%'), width: WIDTH * 0.35, alignItems: 'center', width: WIDTH * 0.32, }}>
                                            <Text
                                                allowFontScaling={false}
                                                style={{
                                                    lineHeight: hp('3.2%'), color: '#FFD700', fontSize: hp('2.3%'), margin: 0, paddingHorizontal: 5, fontWeight: 'bold', width: WIDTH * 0.32,
                                                }}>
                                                {`${fromNow} ngày`}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                            </View>

                            {/* Hiển thị phần hoạch định đến đích */}
                            <View style={{ width: WIDTH, height: '30%', marginTop: hp('2%'), }}>
                                {/* ScrollView must be placed within a view to set its height */}
                                <ScrollView >
                                    <View style={{ width: WIDTH, flexDirection: 'row', marginBottom: 0, paddingTop: hp('2.5%'), flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', marginTop: 5, }}>
                                        
                                        <TouchableOpacity
                                            onPress={() => { navigation.navigate('Points') }}
                                            style={{ }}
                                        >
                                            <Image
                                                allowFontScaling={false}
                                                source={require('./imges/iconExcercise.png')}
                                                style={{ width: WIDTH * 0.045, height: WIDTH * 0.045, tintColor: '#00f', backgroundColor: '#fff', borderRadius: 50,  }}
                                                resizeMode="contain"
                                            />
                                        </TouchableOpacity>

                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                textShadowColor: "rgba(0,0,0, 1)", 
                                                textShadowRadius: 20, color: '#fff', fontSize: hp('2.3%'), fontWeight: 'bold', paddingLeft: 8, paddingTop: 1
                                            }}
                                        >
                                            Đếm ngày
                                        </Text>

                                        {/* <Text
                                            allowFontScaling={false}
                                            style={{
                                                textShadowColor: "rgba(0,0,0, 1)", 
                                                textShadowRadius: 20, color: '#ff0', fontSize: hp('2.1%'), fontWeight: 'bold', paddingLeft: 8, paddingBottom: 7, paddingTop: 1
                                            }}
                                        >
                                            {`${point}  `}
                                        </Text> */}

                                    </View>

                                    <View style={{ flexDirection: 'row', marginBottom: 0, flexWrap: 'wrap', }}>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                textShadowColor: "rgba(0,0,0, 1)",
                                                textShadowRadius: 20, color: '#fff', fontSize: hp('2%'), fontWeight: 'bold', paddingLeft: 19, paddingBottom: 1, paddingBottom: 2
                                            }}
                                        >
                                            {`Còn ${takeDayPoint1 != takeDayPoint1 ? 0 : takeDayPoint1 } ngày đến:`}
                                        </Text>

                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                textShadowColor: "rgba(0,0,0, 1)",
                                                textShadowRadius: 20, color: '#fff', fontSize: hp('2%'), fontWeight: 'bold', paddingLeft: 8, paddingBottom: 1, paddingBottom: 2
                                            }}
                                        >
                                            {point1}
                                        </Text>

                                    </View>

                                    <View style={{ flexDirection: 'row', marginBottom: 0, flexWrap: 'wrap', }}>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                textShadowColor: "rgba(0,0,0, 1)",
                                                textShadowRadius: 20, color: '#fff', fontSize: hp('2%'), fontWeight: 'bold', paddingLeft: 19, paddingVertical: 1, marginVertical: 2
                                            }}>
                                            {`${point1b}:`}
                                        </Text>
                                        <Text
                                            allowFontScaling={false}
                                            style={{
                                                textShadowColor: "rgba(0,0,0, 1)",
                                                textShadowRadius: 20, color: '#fff', fontSize: hp('2%'), fontWeight: 'bold', paddingLeft: 8, paddingVertical: 1, marginVertical: 2
                                            }}>
                                            {`Đã được ${takeDayPoint1b} ngày`}
                                            {/* takeDayPoint1b != takeDayPoint1b determine NaN or not */}
                                        </Text>

                                    </View>




                                </ScrollView>
                            </View>

                            {/* Hiện thị các button ghi chú, lịch - chuyển đổi lịch, note, đếm ngược ngày */}
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', }}>

                                <View style={{justifyContent: 'center', alignItems: 'center', }}>
                                    <TouchableOpacity
                                        onPress={() => { navigation.navigate('CalendarDate') }}
                                        style={{  marginHorizontal: wp('3%'),  }}
                                    >
                                        <Image
                                            allowFontScaling={false}
                                            source={require('./imges/calendarRmbackground.png')}
                                            style={{ width: WIDTH * 0.12, height: WIDTH * 0.12, backgroundColor: '#fff', borderRadius: 50,  }}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                    <Text allowFontScaling={false} style={{color: '#fff', fontSize: HEIGHT*0.017, }}>Sự kiện</Text>
                                </View>

                                <View style={{justifyContent: 'center', alignItems: 'center', }}>
                                    <TouchableOpacity
                                        onPress={() => { navigation.navigate('Points') }}
                                        style={{ marginHorizontal: wp('3%'),  }}>
                                        <Image
                                            allowFontScaling={false}
                                            source={require('./imges/iconExcercise.png')}
                                            style={{ width: WIDTH * 0.12, height: WIDTH * 0.12, backgroundColor: '#fff', tintColor: '#00f', borderRadius: 50, }}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>     
                                    <Text allowFontScaling={false} style={{color: '#fff', fontSize: HEIGHT*0.017,  }}>Đếm ngày</Text>
 
                                </View>


                                <View style={{justifyContent: 'center', alignItems: 'center', }}>
                                    <TouchableOpacity
                                        onPress={() => { setModalVisibleAddNote(true) }}
                                        style={{  marginHorizontal: wp('3%'),  }}>
                                        <Image
                                            allowFontScaling={false}
                                            source={require('./imges/note.png')}
                                            style={{ width: WIDTH * 0.12, height: WIDTH * 0.12, backgroundColor: '#fff', tintColor: '#00f', borderRadius: 50, }}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                    <Text allowFontScaling={false} style={{color: '#fff', fontSize: HEIGHT*0.017,  }}>Ghi chú</Text>
                                </View>

                                <View style={{justifyContent: 'center', alignItems: 'center', }}>
                                    <TouchableOpacity
                                        onPress={() => { setModalVisible2(!modalVisible2); }}
                                        style={{ marginHorizontal: wp('3%'), }}>
                                        <Image
                                            allowFontScaling={false}
                                            source={require('./imges/stickyNote.png')}
                                            style={{ width: WIDTH * 0.12, height: WIDTH * 0.12, backgroundColor: '#fff', tintColor: '#00f', borderRadius: 50, }}
                                            resizeMode="contain"
                                        />
                                    </TouchableOpacity>
                                    <Text allowFontScaling={false} style={{color: '#fff', fontSize: HEIGHT*0.017, }}>Hướng dẫn</Text>

                                </View>

                            </View>

                        </View>

                        {/* Phần liên hệ  và đặt quảng cáo*/}
                        <View style={{ alignItems: 'center', flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', }}>
                            {/* thêm vào để fix được như mong muốn */}
                            <Text
                                allowFontScaling={false}
                                style={{
                                    textShadowColor: "rgba(0,0,0, 1)",
                                    textShadowRadius: 20, flex: 1, color: '#fff', fontSize: hp('1.6%'), fontWeight: 'bold', marginBottom: 0
                                }}
                                selectable={true}
                            >
                                {`Có vấn đề? Liên hệ macvanhien10@gmail.com`}
                            </Text>

                            <BannerAd
                                unitId={adUnitId}
                                size={BannerAdSize.FULL_BANNER}
                                requestOptions={{
                                    requestNonPersonalizedAdsOnly: true,
                                }}
                            />

                        </View>


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

                        {/* Hiển thị Modal add Note */}
                        <Modal
                            animationType="fade"
                            transparent={false}
                            visible={modalVisibleAddNote}
                            onRequestClose={() => {
                                setModalVisibleAddNote(!modalVisibleAddNote);
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                {/* nút back */}
                                <TouchableOpacity
                                    onPress={() => {
                                        setModalVisibleAddNote(false)
                                    }}
                                    style={{ height: HEIGHT * 0.055, width: WIDTH * 1, justifyContent: 'center', position: 'absolute', top: 0, zIndex: 1, }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            allowFontScaling={false}
                                            source={require('./imges/BackButton_rbg1.png')}
                                            style={{ width: WIDTH * 0.04, height: WIDTH * 0.05, marginLeft: WIDTH * 0.02, borderRadius: 50, tintColor: 'blue', }}
                                            resizeMode='stretch'
                                        />
                                    </View>
                                </TouchableOpacity>

                                <AppAddNote></AppAddNote>

                            </View>
                        </Modal>

                        {/* Hiển thị Modal Hướng dẫn */}
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible2}
                            onRequestClose={() => {
                                setModalVisible2(!modalVisible2);
                            }}
                        >
                            <View style={{ width: WIDTH, height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)', }}>
                                <View style={{ width: WIDTH*0.95, height: HEIGHT * 0.92, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 5, }}>
                                    <View style={{ height: HEIGHT * 0.06, backgroundColor: '#f00' }}>
                                        {/* Nút back */}
                                        <TouchableOpacity
                                            onPress={() => {
                                                setModalVisible2(false)
                                            }}
                                            style={{ width: WIDTH * 0.95, justifyContent: 'center', paddingVertical: 5, }}
                                        >
                                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                <Image
                                                    allowFontScaling={false}
                                                    source={require('./imges/BackButton_rbg1.png')}
                                                    style={{ width: WIDTH * 0.04, height: WIDTH * 0.05, marginLeft: WIDTH * 0.05, tintColor: '#000', marginVertical: 5, }}
                                                    resizeMode='stretch'
                                                />
                                                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
                                                    <Text allowFontScaling={false} style={{
                                                        fontSize: HEIGHT * 0.021, fontWeight: 'bold', color: '#fff', left: -WIDTH * 0.02,
                                                    }}>
                                                        Hướng dẫn
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <ScrollView style={{ width: '98%', }}>
                                            <Text allowFontScaling={false} style={{ color: '#333', fontSize: 15, marginHorizontal: '5.5%', fontWeight: 'bold', marginTop: 12, }}>
                                                App Time Calculator v.2.1
                                            </Text>
                                            <Text allowFontScaling={false} style={{ color: '#333', fontSize: 14, marginHorizontal: '5.5%', }}>
                                                App hiển thị ngày âm-dương lịch, đếm, tính (cộng, trừ) ngày, chuyển đổi ngày dương lịch sang âm lịch. Ngoài ra app còn có bảng một số ngày quan trọng, chức năng ghi chú.
                                            </Text>

                                            <Text allowFontScaling={false} style={{ color: '#333', fontSize: 15, marginHorizontal: '5.5%', fontWeight: 'bold', marginTop: 12, }}>
                                                Nhập ngày tháng
                                            </Text>
                                            <Text allowFontScaling={false} style={{ color: '#333', fontSize: 14, marginHorizontal: '5.5%', }}>
                                                - Ngày để đếm số ngày ngày đó đến ngày hiện tại / ngày đó đến ngày tương lai: sẽ được lưu.
                                            </Text>
                                            <Text allowFontScaling={false} style={{ color: '#333', fontSize: 14, marginHorizontal: '5.5%', }}>
                                                - Định dạng ngày kiểu: ngày/tháng/năm. Ví dụ: 22/02/2022
                                            </Text>
                                            <Text allowFontScaling={false} style={{ color: '#333', fontSize: 14, marginHorizontal: '5.5%', }}>
                                                - Nếu nhập sai cú pháp, sai ngày hoặc quá phạm vi tính thì sẽ giữ nguyên kết quả trước đó !
                                            </Text>

                                            <Text allowFontScaling={false} style={{ color: '#333', fontSize: 15, marginHorizontal: '5.5%', fontWeight: 'bold', marginTop: 12, }}>
                                                Tính ngày 
                                            </Text>
                                            <Text allowFontScaling={false} style={{ color: '#333', fontSize: 14, marginHorizontal: '5.5%', }}>
                                                Bảng tính ngày ở giữa màn hình, nếu muốn thêm - bớt số ngày ta chỉ cần nhập vào ô đằng sau chữ "Thêm" - "Bớt" và được kết quả ở bên phải.
                                            </Text>

                                            <Text allowFontScaling={false} style={{ color: '#333', fontSize: 15, marginHorizontal: '5.5%', fontWeight: 'bold', marginTop: 12, }}>
                                                Đếm ngày 
                                            </Text>
                                            <Image
                                                allowFontScaling={false}
                                                source={require('./imges/buttonDemNgay.png')}
                                                style={{ width: WIDTH * 0.82, height: HEIGHT * 0.3, marginLeft: WIDTH * 0.05, marginVertical: 5, }}
                                                resizeMode='stretch'
                                            />
                                            <Text allowFontScaling={false} style={{ color: '#333', fontSize: 14, marginHorizontal: '5.5%', }}>
                                                - Muốn đếm ngày ta vào "Đếm ngày" / Ở phần "Đếm ngày" ta Nhập vào ô "Lý do đếm ngày" / Nhấn nút "Xác nhận" (ở dưới cùng). Nếu ô bên phải có ngày thì do ta đã
                                                đếm ngày với việc gì trước đó, chỉ cần xóa đi là được.
                                            </Text>
                                            <Text allowFontScaling={false} style={{ color: '#333', fontSize: 14, marginHorizontal: '5.5%', }}>
                                                - Muốn đếm ngược ngày (muốn biết còn bao nhiêu ngày) vào "Đếm ngày" / Ở phần "Đếm ngược ngày" ta nhập vào ô "Ghi chú" để ghi chú sự kiện ngày trong tương lai đó / Nhập ngày sẽ diễn ra sự kiện (ngay ô bên phải) 
                                                / Nhấn nút "Xác nhận" (ở dưới cùng).
                                            </Text>

                                            <Text allowFontScaling={false} style={{ color: '#333', fontSize: 15, marginHorizontal: '5.5%', fontWeight: 'bold', marginTop: 12, }}>
                                                Đổi ngày dương lịch - Âm lịch 
                                            </Text>
                                            <Image
                                                allowFontScaling={false}
                                                source={require('./imges/DuongLichAmLich.png')}
                                                style={{ width: WIDTH * 0.82, height: HEIGHT * 0.25, marginLeft: WIDTH * 0.05, marginVertical: 5, }}
                                                resizeMode='stretch'
                                            />
                                            <Text allowFontScaling={false} style={{ color: '#333', fontSize: 14, marginHorizontal: '5.5%', }}>
                                                Nhấn vào nút "Sự kiện" / Nhập ngày, rồi nhập tháng, nhập năm dương lịch đó vào các ô. Hệ thống sẽ tự động tính ra kết quả ở bên dưới.
                                            </Text>
                                            <Image
                                                allowFontScaling={false}
                                                source={require('./imges/InputDuonglichAmlich.png')}
                                                style={{ width: WIDTH * 0.82, height: HEIGHT * 0.35, marginLeft: WIDTH * 0.05, marginVertical: 5, }}
                                                resizeMode='stretch'
                                            />

                                            <Text allowFontScaling={false} style={{ color: '#333', fontSize: 15, marginHorizontal: '5.5%', fontWeight: 'bold', marginTop: 12, }}>
                                                Bảng một số ngày quan trọng
                                            </Text>
                                            <Text allowFontScaling={false} style={{ color: '#333', fontSize: 14, marginHorizontal: '5.5%', }}>
                                                Nhấn nút "Sự kiện" để thấy bảng. Bảng có các ngày dương lịch, âm lịch quan trọng, đặc biệt trong năm.
                                            </Text>

                                            <Text allowFontScaling={false} style={{ color: '#333', fontSize: 15, marginHorizontal: '5.5%', fontWeight: 'bold', marginTop: 12, }}>
                                                Ghi chú 
                                            </Text>
                                            <Image
                                                allowFontScaling={false}
                                                source={require('./imges/GhiChuButton.png')}
                                                style={{ width: WIDTH * 0.82, height: HEIGHT * 0.23, marginLeft: WIDTH * 0.05, marginVertical: 5, }}
                                                resizeMode='stretch'
                                            />
                                            <Text allowFontScaling={false} style={{ color: '#333', fontSize: 14, marginHorizontal: '5.5%', }}>
                                                Nhấn nút "Ghi chú" / Nhập vào ô "Nhập ghi chú" / Nhấn nút "+" bên phải để lưu ghi chú vào điện thoại. Chức năng hoạt động 
                                                offline nên ghi chú sẽ mất khi bạn xóa dữ liệu App. 
                                            </Text>

                                            <Text allowFontScaling={false} style={{ color: '#333', fontSize: 15, marginHorizontal: '5.5%', fontWeight: 'bold', marginTop: 12, }}>
                                                Liên hệ:
                                            </Text>
                                            <Text allowFontScaling={false} style={{ color: '#333', fontSize: 14, marginHorizontal: '5.5%', marginBottom: HEIGHT*0.1, }}>
                                                Nếu phát hiện lỗi hay bất cứ điều gì về App Time Calculator hãy liên hệ Admind qua gmail macvanhien10@gmail.com.
                                            </Text>
                                            
                                        </ScrollView>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        
                    </View>


                </ImageBackground>

            </View>
        </InternetConnectionAlert>

    );
}


