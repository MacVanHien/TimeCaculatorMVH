

import { View, Text, Dimensions } from 'react-native'
import React, { useEffect, useState,} from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LunarDate, SolarDate } from 'vietnamese-lunar-calendar';
import moment from 'moment-timezone';

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height



const Clock = () => {
  const [momentTime, setMomentTime] = useState('')
  const [dateState, setDateState] = useState('')
  const [dayState, setDayState] = useState('')
  const [monthState, setMonthState] = useState('')

  const months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
  const days = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy",]


  useEffect(() => {
    setInterval(() => {
      setMomentTime(moment().format('LTS'))
      const date = new Date()
      setDayState(date.getDay())
      setDateState(date.getDate())
      setMonthState(date.getMonth())
    }, 1000);
  }, [])

  //Lấy ngày hiện tại
  let LD = new LunarDate(new Date);


  // new LunarDate(new Date(2022, 1, 1)): output 
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




  return (
    <View style = {{ width: WIDTH*0.95, justifyContent: 'center', alignItems: 'center', }}>
      {/* Hiển thị Đồng hồ, ngày tháng theo dương lịch */}
      <View style={{ margin: 0, flexDirection: 'row', }}>
        <Text
          allowFontScaling={false}
          style={{
            textShadowColor: "rgba(0,0,0 , 1)",
            textShadowRadius: 20, color: 'white', fontSize: hp('3.8%'), fontWeight: 'bold',
          }}>{`${momentTime} `} 
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            textShadowColor: "rgba(0,0,0 , 1)",
            textShadowRadius: 20, color: 'white', fontSize: hp('2.2%'), fontWeight: 'bold', lineHeight: hp('5.5%')
          }}>{`${days[dayState]}, `}
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            textShadowColor: "rgba(0,0,0 , 1)",
            textShadowRadius: 20, color: 'white', fontSize: hp('2.2%'), fontWeight: 'bold', lineHeight: hp('5.5%')
          }}>{`${dateState} `}
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            textShadowColor: "rgba(0,0,0 , 1)",
            textShadowRadius: 20, color: 'white', fontSize: hp('2.2%'), fontWeight: 'bold', lineHeight: hp('5.5%')
          }}>{months[monthState]}
        </Text>
      </View>

      {/* Hiển thị ngày theo âm lịch Việt Nam */}
      <View style={{ margin: 0, marginLeft: wp('19%'), flexDirection: 'row', position: 'relative', bottom: hp('1.2%') }}>

        <Text
          allowFontScaling={false}
          style={{
            textShadowColor: "rgba(0,0,0 , 1)",
            textShadowRadius: 20, margin: 0, color: 'white', fontSize: hp('2%'), fontWeight: 'bold', lineHeight: hp('5.5%'), marginLeft: wp('5%')}}>
              {`${LD.date}/`}
        </Text>
      
        <Text
          allowFontScaling={false}
          style={{
            textShadowColor: "rgba(0,0,0 , 1)",
            textShadowRadius: 20, margin: 0, color: 'white', fontSize: hp('2%'), fontWeight: 'bold', lineHeight: hp('5.5%')
          }}>{`${LD.month}${LD.isLeap == true ? ' Nhuận' : ''}/`}
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            textShadowColor: "rgba(0,0,0 , 1)",
            textShadowRadius: 20, margin: 0, color: 'white', fontSize: hp('2%'), fontWeight: 'bold', lineHeight: hp('5.5%')
          }}>{`${LD.lunarYear.can} ${LD.lunarYear.chi} `}
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            textShadowColor: "rgba(0,0,0 , 1)",
            textShadowRadius: 20, margin: 0, color: 'white', fontSize: hp('2%'), fontWeight: 'bold', lineHeight: hp('5.5%')
          }}>{`${LD.year} `}
        </Text>
        {/* <Text
          allowFontScaling={false}
          style={{
            textShadowColor: "rgba(0,0,0 , 1)",
            textShadowRadius: 20, margin: 0, color: 'white', fontSize: hp('2.2%'), fontWeight: 'bold', lineHeight: hp('5.5%')
          }}>{` ngày ${LD.lunarDate.chi} - `}
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            textShadowColor: "rgba(0,0,0 , 1)",
            textShadowRadius: 20, margin: 0, color: 'white', fontSize: hp('2.2%'), fontWeight: 'bold', lineHeight: hp('5.5%')
          }}>{` tháng ${LD.lunarMonth.chi}`}
        </Text> */}
        
      </View>
    </View>

  )
}

export default Clock