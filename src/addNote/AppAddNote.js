
import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, Alert, TouchableOpacity, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import styles from './AppCss'
import InPut from './Components/InPut'






export default function AppAddNote() {

  const [value, setValue] = useState('');
  const [taskList, setTaskList] = React.useState(['viec1', 'viec2']);


  //get Data from Storage //when value change: it's run again and get new data from storage
  useEffect(() => {
    async function fetchData() {
      const taskList1 = await AsyncStorage.getItem('myArr');
      const arr = taskList1 ? JSON.parse(taskList1) : [];
      !!taskList1 == false ? setTaskList([]) : setTaskList(arr);
    }
    fetchData();
  }, [value]);

  //Send the data to storage when click
  const handleAddTask1 = async (task) => {
    const data = await AsyncStorage.getItem('myArr');
    const arr = data ? JSON.parse(data) : [];
    arr.unshift(task) // add thêm item vào đầu mảng //thêm vào đầu ko thêm vào cuối!
    await AsyncStorage.setItem('myArr', JSON.stringify(arr));
    // setValue('') : hàm bên component InPut đã có rồi
    setValue(task) //Để biến value thay đổi khi click để chạy useEffect
  }

  // Nếu ko có storage, add lưu, xử lí trên ram !
  // const handleAddTask1 = (task) => {
  //   setTaskList ([...taskList, task])
  // }

  const handleDeleteTask = (index) => {
    Alert.alert( //Component Alert thực hiện việc thông báo đồng ý/ hủy bỏ
      "Bạn muốn xóa ghi chú này ?", //Dòng nội dung thông báo
      "", //Dòng chữ thông báo phụ
      [
        {
          text: "OK",
          onPress: async () => {
            let taskListTamp = [...taskList];
            let a = taskListTamp.splice(index, 1);
            await AsyncStorage.setItem('myArr', JSON.stringify(taskListTamp)); //thay đổi cả mảng mới
            setValue(taskListTamp)//để chạy useEffect
          }
        },//Thực hiện khi nhấm ok
        { text: "Cancel", onPress: () => { } } //Thực hiện khi nhấm cancel
      ]
    );
  }







  return (
    <View style={{ flex: 1, }}>
      <View style={{ width: '100%', marginBottom: 15, paddingVertical: 3, }}>
        <Text allowFontScaling={false} style={styles.topTextFirst}>Notebook</Text>
      </View>
      <View style={{marginHorizontal: 15,marginBottom: 8,}}>
        <Text allowFontScaling={false} style={{fontSize: 13, color: '#888', }}>
          *Chức năng hoạt động offline, các ghi chú được lưu trên điện thoại.
        </Text>
        {/* <TouchableOpacity
          style={{position: 'relative', width: '95%', }}
        >
          <Text allowFontScaling={false} style={{ color: '#00f', fontSize: 14, textAlign: 'right', }}>{`(xem các tin lưu online)!`}</Text>
        </TouchableOpacity> */}
      </View>
      <ScrollView>
        <View style={{ backgroundColor: '#fff', flex: 1, paddingHorizontal: 15, }}>
          {
            taskList.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index * Math.random()}
                  onPress={() => handleDeleteTask(index)}
                >
                  <View style={{ backgroundColor: index % 2 == 0 ? '#fff' : 'rgba(255,25,255,0.02)', paddingHorizontal: 20, paddingVertical: 3, }}>
                    <View style={{ flexDirection: 'row', }}>
                      <Text allowFontScaling={false} style={{ color: '#00f', fontSize: 15, fontWeight: 'bold', }}>{`${index + 1}.`}</Text>
                      <Text allowFontScaling={false} style={{ color: '#333', fontWeight: 'bold', fontSize: 15, }}>{` ${item[0]} `}</Text>
                    </View>
                    <Text allowFontScaling={false} style={{ color: '#333', fontSize: 13, textAlign: 'right', }}>{`Ngày ${item[1]}/${item[2]}/${item[3]}`}</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </View>

      </ScrollView>

      <InPut onAddTask={handleAddTask1} />

    </View>
  )
}

