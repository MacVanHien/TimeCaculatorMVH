import React, { useEffect, useState } from "react";
import { SafeAreaView, TextInput, View, Text, TouchableOpacity, Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width
const HEIGHT = Dimensions.get("window").height

import styles from "../AppCss";


const InPut = (prop) => {
    const [date, setDate] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')

    const [task, setTask] = React.useState('');

    useEffect(() => {
        const date = new Date()
        setYear(date.getFullYear())
        setDate(date.getDate())
        setMonth(date.getMonth())
        console.log('###', date.getFullYear(), date.getDate(), date.getMonth(), date)
    }, [])


    const handleAddTask = () => {
        if (task.length === 0) {
            alert('Bạn chưa nhập ghi chú!');
            return false
        }
        prop.onAddTask([task, date, month, year]); //Trường hợp này onAddTast prop xử lí (viết hàm ở App.js để xử lí)
        setTask('') //set lại giá trị cho task để bàn phím xóa text sau khi nhấn nút addBtn  
    }

    return (
        <SafeAreaView style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: WIDTH*0.01, }}>
            <View style={{flex: 8,}}>
                <TextInput
                    style={styles.inputText}
                    onChangeText={text => setTask(text)}
                    value={task}
                    placeholder="Nhập ghi chú..."
                    keyboardType="default"
                    placeholderTextColor={'#ccc'}
                />
            </View>

            <View style={{flex: 2, justifyContent: 'center', alignContent: 'center', }}>
                <TouchableOpacity
                    onPress={handleAddTask}
                    style={{justifyContent: 'center', alignItems: 'center', height: 51, with: 51, borderRadius: 50, backgroundColor: '#00f', marginHorizontal: WIDTH*0.035, }}
                >
                    <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: 28, color: '#fff', }}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

export default InPut;