

import React, { useEffect, useState, } from 'react'
import { View, Text, TouchableOpacity, TextInput, Image, FlatList, Alert, } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LunarDate, SolarDate } from 'vietnamese-lunar-calendar';
import moment from 'moment-timezone';
import ArrDaysToGiveAnEye from './ArrDaysToGiveAnEye';



const CalendarDate = ({ route, navigation }) => {

  const [dateSun, setDateSun] = useState(22)
  const [monthSun, setMonthSun] = useState(2)
  const [yearSun, setYearSun] = useState(2022)

  const [monthSunToScrollToTop, setMonthSunToScrollToTop] = useState(11)
  const [yearSunToScrollToTop, setYearSunToScrollToTop] = useState(2022)

  const [indexToScrollToTop, setIndexToScrollToTop] = useState(0)

  const [LD, setLD] = useState({})


  const ArrMonthYeartoIndexTop = [
    { month: 11, year: 2022, index: 0.1 },
    { month: 12, year: 2022, index: 5 }, //4
    { month: 1, year: 2023, index: 12 }, //10
    { month: 2, year: 2023, index: 21 }, //18
    { month: 3, year: 2023, index: 27 }, //23
    { month: 4, year: 2023, index: 33 }, //28
    { month: 5, year: 2023, index: 41 }, //35
    { month: 6, year: 2023, index: 47 }, //40
    { month: 7, year: 2023, index: 52.5 }, //45
    { month: 8, year: 2023, index: 56.5 }, //48
    { month: 9, year: 2023, index: 61.5 }, //52
    { month: 10, year: 2023, index: 66.5 }, //56
    { month: 11, year: 2023, index: 74 }, //63
    { month: 12, year: 2023, index: 79 }, //67
  ]


  //set Index to Scroll to top với tháng - năm hiện tại
  useEffect(() => {
    indexToScrollTopWithMonthYear()
  }, [monthSunToScrollToTop, yearSunToScrollToTop]) //Để mỗi tháng render lần đầu lấy năm 2022 đi kiểm tra nên bị 11/2023 thành về 11/2022, nên phải thêm năm để khi update năm render lại sẽ đc đúng tháng, đúng năm 
  //Function lấy index để scroll to top cho FlatList
  const indexToScrollTopWithMonthYear = () => { //day's format is dd/mm/yyyy
    for (let i = 0; i < ArrMonthYeartoIndexTop.length; i++) {
      if (monthSunToScrollToTop == ArrMonthYeartoIndexTop[i].month && yearSunToScrollToTop == ArrMonthYeartoIndexTop[i].year) {
        // listViewRef.scrollToOffset({ offset: ArrMonthYeartoIndexTop[i].index * hp('10%'), animated: true });
        setIndexToScrollToTop(ArrMonthYeartoIndexTop[i].index)
        // console.log("🚀 ~ file: CalendarDate.js ~ line 72 ~ indexToScrollTopWithMonthYear ~ ArrMonthYeartoIndexTop[i].index:", ArrMonthYeartoIndexTop[i].index)
        break;
      }
    }
  }

  //set Index to Scroll to top với ngày hiện tại nếu có trong list ArrDaysToGiveAnEye
  useEffect(() => {
    setTimeout(() => {
      indexToscrollTopIfHaveDay()
    }, 500); //Để chắc chắn set giá trị sau khi chạy xong lấy index từ tháng - năm hiện tại
  }, []) //Để mỗi tháng render lần đầu lấy năm 2022 đi kiểm tra nên bị 11/2023 thành về 11/2022, nên phải thêm năm để khi update năm render lại sẽ đc đúng tháng, đúng năm 
  //Function lấy index để scroll to top cho FlatList
  const indexToscrollTopIfHaveDay = () => { //day's format is dd/mm/yyyy
    for (let i = 0; i < ArrDaysToGiveAnEye.length; i++) {
      for (let j = 0; j < ArrDaysToGiveAnEye[i].days.sunDay.length; j++) {
        let d = moment(ArrDaysToGiveAnEye[i].days.sunDay[j].sunDay, 'DD/MM/YYYY').format(); //để đc dạng "2022-06-30"
        let d1 = new Date(d) //chuyển về dạng day của javascript
        let dn = new Date()
        if (d1.getDate() === dn.getDate() && d1.getMonth() === dn.getMonth() && d1.getFullYear() === dn.getFullYear()) {
          setIndexToScrollToTop(ArrDaysToGiveAnEye[i].days.sunDay[j].index + i + 1 - 3)  //i+1 do i tính từ 0, - 3 để scroll ra giữa bảng
          break;
        }
      }
    }
  }

  //Scroll to top with Index
  let listViewRef; //Tạo biến để thực hiện gotoTop của list View
  useEffect(() => {
    listViewRef.scrollToOffset({ offset: indexToScrollToTop * hp('10%'), animated: true });
    // console.log("🚀 ~ file: CalendarDate.js ~ line 83 ~ useEffect ~ indexToScrollToTop", indexToScrollToTop)
  }, [indexToScrollToTop])


  //Lấy thời gian hiện  tại
  useEffect(() => {
    const DNow = new Date;
    setDateSun(DNow.getDate())
    setMonthSun(DNow.getMonth() + 1) //Tháng javascript tính từ 0 nên cộng thêm 1 để đc tháng đúng thực tế
    setYearSun(DNow.getFullYear())
    setMonthSunToScrollToTop(DNow.getMonth() + 1)
    setYearSunToScrollToTop(DNow.getFullYear())
  }, [])

  //Tìm ngày âm của ngày dateSun/monthSun/yearSun
  useEffect(() => {
    if (!!(yearSun/1) == false || !!(monthSun/1) == false || (dateSun/1) == false) {  //Loại bỏ trường hợp <= 0, lớn quá tháng, quá năm và không phải số
      console.log("Ngày tháng năm không hợp lệ")
    } else {
      setLDFromTextInput(yearSun, monthSun, dateSun)
    }
  }, [dateSun, monthSun, yearSun])
  
  //Tính ngày âm của ngày dương hợp lệ
  function setLDFromTextInput(y, m, d) {
    var x = DaysOfMonth(m, y);
    if (d == "" || m == "" || y == "") {
      console.log("Chưa nhập đủ thông tin");
    }
    else {
      if (!!(y/1) == false || !!(m/1) == false || (d/1) == false) {  //Loại bỏ trường hợp <= 0, lớn quá tháng, quá năm và không phải số
        console.log("Ngày tháng năm không hợp lệ")
      } else
        if (parseInt(d) > x) {
          console.log('Chọn ngày lớn hơn số ngày trong tháng đã nhập');
        } else
          if (parseInt(d) > 0 && parseInt(m) > 0 && parseInt(y) > 1900 && parseInt(m) <= 12 && parseInt(y) < 3000 && !!parseInt(y) == true && !!parseInt(m) == true && !!parseInt(d) == true) {  //Loại bỏ trường hợp <= 0, lớn quá tháng, quá năm và không phải số
            console.log("Ngày hợp lệ")
            setLD(new LunarDate(y / 1, m / 1, d / 1)); //Ngày ở đây là ngày  dương lịch kiểu yyyy, mm, dd //Thủ thuật chia cho 1 để biến text dạng số về kiểu number
          }
          else {
            console.log("Ngày tháng năm không hợp lệ");
          }
    }
  }

  //return số ngày của một tháng trong năm cho trước
  function DaysOfMonth(thang, nam) {
    var mon = parseInt(thang, 10);
    var yar = parseInt(nam, 10);

    switch (mon) {
      case 2:
        if ((yar % 4 == 0) && (yar % 400 != 0))
          return 29;
        else
          return 28;
        break;
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        return 31;
        break;
      default:
        return 30;
    }
  }


  // new LunarDate(2022, 1, 1): output 
  // {
  //   "date": 1, 
  //   "holiday": "Tết Nguyên Đán", 
  //   "isLeap": false, 
  //   "isVegetarianDay": true, 
  //   "julian": 2459612, 
  //   "luckyHours": "Tý (23-1), Dần (3-5), Mẹo (5-7), Ngọ (11-13), Mùi (13-15), Dậu (17-19)", 
  //   "lunarDate": {"can": "Ất", "chi": "Dậu"}, 
  //   "lunarHour": {"can": "Bính", "chi": "Tý"}, 
  //   "lunarMonth": {"can": "Nhâm", "chi": "Dần"}, 
  //   "lunarYear": {"can": "Nhâm", "chi": "Dần"}, 
  //   "month": 1, 
  //   "solarTerm": "Đại hàn", 
  //   "year": 2022
  // }

  //đổi ngày dương lịch sang âm lịch
  const SunDayToLunarDay = (day) => { //day's format is dd/mm/yyyy
    let d = moment(day, 'DD/MM/YYYY').format(); //để đc dạng "2022-06-30"
    let d1 = new Date(d) //chuyển về dạng day của javascript
    let Ld = new LunarDate(d1.getFullYear(), d1.getMonth() + 1, d1.getDate()); //Năm, tháng, ngày mới đúng thứ tự
    let isLeapMonth = Ld.isLeap == true ? ' Nhuận' : ''
    return `${Ld.date}/${Ld.month}${isLeapMonth}/${Ld.lunarYear.can} ${Ld.lunarYear.chi} ${Ld.year}`
  }


  //Lấy màu cho ngày trùng với ngày của lịch
  const getColorForTheDay = (day) => { //day's format is dd/mm/yyyy
    let d = moment(day, 'DD/MM/YYYY').format(); //để đc dạng "2022-06-30"
    let d1 = new Date(d) //chuyển về dạng day của javascript
    let dn = new Date()
    let isColor = d1.getDate() === dn.getDate() && d1.getMonth() === dn.getMonth() && d1.getFullYear() === dn.getFullYear() ? '#FF0000' : '#555' 
    //.getTime (ko có cặp ngoặc () chạy sai)
    return isColor
  }
  // console.log('line 1, :', getColorForTheDay('12/11/2022'))





  class ViewOfItemInFlatlist extends React.PureComponent {
    render() {
      const { item, index } = this.props
      return <View key={index}>
        <View style={{ marginHorizontal: wp('1%'), paddingTop: hp('1%'), borderBottomWidth: 1 }}>

          <Text allowFontScaling={false} style={{ fontSize: hp('2.3%'), paddingTop: hp('5%'), color: '#ccc', }}>{`Tháng ${item.month}/${item.year}.`}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
            <View allowFontScaling={false} style={{ width: '50%', paddingLeft: wp('2.5%'), borderBottomWidth: 0.5, borderBottomColor: '#ccc', }} >
              {
                item.days.sunDay.map((item1, index1) => (
                  <View key={index1} style={{ borderBottomWidth: 0.5, borderBottomColor: '#ccc', height: hp('8%'), marginTop: hp('2%'), }}>
                    <Text allowFontScaling={false} style={{ fontSize: hp('2%'), color: getColorForTheDay(item1.sunDay), fontWeight: 'bold' }}>{item1.sunDay}</Text>
                    <Text allowFontScaling={false} style={{ fontSize: hp('2%'), color: '#333', }}>{item1.eventInfor}</Text>
                  </View>
                ))
              }
            </View>

            <View allowFontScaling={false} style={{ width: '50%', paddingLeft: wp('1%'), }} >
              {
                item.days.moonDay.map((item1, index1) => (
                  <View key={index1} style={{ borderBottomWidth: 0.5, borderBottomColor: '#ccc', height: hp('8%'), marginTop: hp('2%'), }}>
                    <Text allowFontScaling={false} style={{ fontSize: hp('2%'), color: getColorForTheDay(item1.sunDay) }}>{!!item1.sunDay != false ? SunDayToLunarDay(item1.sunDay) : ""}</Text>
                    {/* Đều là sunDay nên mới làm function chuyển sang */}
                    <Text allowFontScaling={false} style={{ fontSize: hp('2%'), color: '#333', }}>{!!item1.sunDay != false ? item1.eventInfor : ""}</Text>
                  </View>
                ))
              }
            </View>
          </View>

        </View>
      </View>
    }
  }







  

  return (
    <View style={{ backgroundColor: '#fff', height: hp('97%'), width: '100%' }}>
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
            <View style={{ width: wp('90%'), justifyContent: 'center', alignItems: 'center', }}>
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  paddingLeft: 0, fontSize: hp('2.2%'), fontWeight: 'bold', color: '#333',
                }}>
                {` Lịch - Sự kiện `}
              </Text>
            </View>

          </View>
        </TouchableOpacity>
      </View>

      <View style={{ height: '93.5%', width: '100%', }}>
        {/* Hiển thị chuyển đổi ngày dương lịch - sang âm lịch*/}
        <View style={{ width: '100%', height: '30%', alignItems: 'center', justifyContent: 'center', paddingBottom: hp('1.5%'), marginTop: 5, }}>
          <View style={{ marginTop: hp('2%'), paddingLeft: hp('0.3%'), width: '100%', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', }}>
            <View style={{ marginLeft: wp('2%'), flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', position: 'relative', bottom: hp('0.35%') }}>
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  paddingLeft: 0, fontSize: hp('2.2%'), fontWeight: 'bold', color: '#333'
                }}>
                {`Ngày dương lịch `}
              </Text>

            </View>
            <View style={{ flexDirection: 'row', }}>
              <TextInput
                allowFontScaling={false}
                numberOfLines={1}
                adjustsFontSizeToFit
                value={` ${dateSun} `}
                onChangeText={setDateSun}
                placeholder={`${dateSun} `}
                placeholderTextColor="#777"
                style={{
                  with: wp('20%'), height: hp('3.5%'), fontSize: hp('2.7%'), backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: 5, padding: 0, color: '#00f', 
                  fontWeight: 'bold', zIndex: 1, position: 'relative', bottom: hp('0%'),
                }}
              />
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  paddingLeft: 0, fontSize: hp('2.7%'), fontWeight: 'bold', position: 'relative', bottom: hp('0.1%'), color: '#333',
                }}>
                {` / `}
              </Text>
              <TextInput
                allowFontScaling={false}
                numberOfLines={1}
                adjustsFontSizeToFit
                value={` ${monthSun} `}
                onChangeText={setMonthSun}
                placeholder={`${monthSun} `}
                placeholderTextColor="#777"
                style={{
                  with: wp('20%'), height: hp('3.5%'), fontSize: hp('2.7%'), backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: 5, padding: 0, color: '#00f', 
                  fontWeight: 'bold', zIndex: 1, position: 'relative', bottom: hp('0%'),
                }}
              />
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{
                  paddingLeft: 0, fontSize: hp('2.7%'), fontWeight: 'bold', position: 'relative', bottom: hp('0.1%'), color: '#333'
                }}>
                {` / `}
              </Text>
              <TextInput
                allowFontScaling={false}
                numberOfLines={1}
                adjustsFontSizeToFit
                value={` ${yearSun} `}
                onChangeText={setYearSun}
                placeholder={`${yearSun} `}
                placeholderTextColor="#777"
                style={{ with: wp('20%'), height: hp('3.7%'), fontSize: hp('2.7%'), backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: 5, padding: 0, color: '#00f', 
                fontWeight: 'bold', zIndex: 1, position: 'relative', bottom: hp('0%'), }}
              />
            </View>

            <View style={{ alignItems: 'center', flexWrap: 'wrap', position: 'relative', bottom: hp('0.1%'), }}>
              <Text
                allowFontScaling={false}
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{ paddingLeft: 0, fontSize: hp('2.2%'), fontWeight: 'bold', color: '#333', }}>
                {` - âm lịch:`}
              </Text>

            </View>
          </View>

          <View style={{ marginHorizontal: wp('20%') }}>
            <Text allowFontScaling={false} style={{ fontSize: hp('2%'), fontWeight: '700', color: '#555', }}>
              {`Ngày ${Object.keys(LD).length != 0 ? LD.date : ""} (${Object.keys(LD).length != 0 ? LD.lunarDate.can : ""} ${Object.keys(LD).length != 0 ? LD.lunarDate.chi : ""})`}
            </Text>
            <Text allowFontScaling={false} style={{ fontSize: hp('2%'), fontWeight: '700', color: '#555', }}>
              {`Tháng ${Object.keys(LD).length != 0 ? LD.month : ""} ${Object.keys(LD).length != 0 ? LD.isLeap == true ? 'Nhuận' : "" : ""} (${Object.keys(LD).length != 0 ? LD.lunarMonth.can : ""} ${Object.keys(LD).length != 0 ? LD.lunarMonth.chi : ""})`}
            </Text>
            <Text allowFontScaling={false} style={{ fontSize: hp('2%'), fontWeight: '700', color: '#555', }}>
              {`Năm ${Object.keys(LD).length != 0 ? LD.year : ""} (${Object.keys(LD).length != 0 ? LD.lunarYear.can : ""} ${Object.keys(LD).length != 0 ? LD.lunarYear.chi : ""})`}
            </Text>
            <Text allowFontScaling={false} style={{ fontSize: hp('2%'), fontWeight: '700', color: '#555', }}>
              {`Giờ ${Object.keys(LD).length != 0 ? LD.lunarHour.can : ""} ${Object.keys(LD).length != 0 ? LD.lunarHour.chi : ""}`}
            </Text>
            <Text allowFontScaling={false} style={{ fontSize: hp('2%'), fontWeight: '700', color: '#555', }}>
              {`Tiết ${Object.keys(LD).length != 0 ? LD.solarTerm : ""}`}
            </Text>
            <Text allowFontScaling={false} style={{ fontSize: hp('1.98%'), fontWeight: '700', color: '#555', }}>
              {`Giờ hoàng đạo: ${Object.keys(LD).length != 0 ? LD.luckyHours : ""}`}
            </Text>
          </View>

        </View >

        {/* Hiển thị các ngày âm lịch - dương lịch quan trọng trong 11/2022 - 12/2023 */}
        <View style={{ height: '70%', }}>
          <View style={{ paddingHorizontal: wp('3%'), marginTop: hp('1%'), }}>
            <Text allowFontScaling={false} style={{ width: wp('100%'), fontSize: hp('2.2%'), fontWeight: 'bold', color: '#333', paddingVertical: 2, }}>
              Những ngày đáng chú ý (11/2022-12/2023)
            </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
              <Text allowFontScaling={false} style={{ width: wp('50%'), lineHeight: hp('3%'), backgroundColor: 'rgba(255, 0, 0, 0.3)', textAlign: 'center', fontWeight: '700', paddingVertical: 3, color: '#333', }}>
                Dương lịch
              </Text>
              <Text allowFontScaling={false} style={{ width: wp('50%'), lineHeight: hp('3%'), backgroundColor: 'rgba(0, 0, 255, 0.3)', textAlign: 'center', fontWeight: '700', paddingVertical: 3, color: '#333', }}>
                Âm lịch
              </Text>
            </View>
          </View>

          {/* Dùng FlatList hiển thị ArrDaysToGiveAnEye */}
          <View style={{ height: '100%', width: '100%', }}>
            <FlatList
              data={ArrDaysToGiveAnEye}
              initialNumToRender={50} //Số lượng tải ban đầu của list
              updateCellsBatchingPeriod={100} //Số milisecond giữa 2 phần khi cuộn, nếu nhanh sẽ là khoảng trắng
              contentContainerStyle={{ paddingBottom: 200 }}
              keyExtractor={(item, index) => index.toString()}
              style={{ marginBottom: 50, marginLeft: 12, flexGrow: 0 }}
              renderItem={({ item, index }) => {
                return (
                  <ViewOfItemInFlatlist item={item} index={index} />
                )
              }}
              ref={ref => {
                listViewRef = ref;
              }}
            />
          </View>
        </View>
      </View>

    </View>
  )
}

export default CalendarDate