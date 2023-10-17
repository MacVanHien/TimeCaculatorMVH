import {StyleSheet} from 'react-native'
import color from './Components/color'

    const styles = StyleSheet.create({
        //CSS Chung
        container: {
            flex: 1,
            backgroundColor: '#E6E6FA77',
            paddingHorizontal: 15,
        },
        containerTop: {
            flex: 1,
            backgroundColor: '#fff', //Css màu bằng biến
            with: '90%'
        },
        containerCenter: {
            flex: 1,
            backgroundColor: '#E6E6FA77'
        },
        containerBootom: {
            flex: 1,
            backgroundColor: color.primary
        },
        top: {
            marginTop:5,
            marginHorizontal:10,
            backgroundColor: '#fff',
            marginRight: 10,
            padding: 5,
            //set border
            borderWidth: 1,
            borderRadius: 5,
            // borderColor: 'red',
            //căn giữa đoạn text
            justifyContent: 'center',
            alignItems: 'center',
            width: '90%',
            flexDirection: 'row'
        },
        topText: {
            fontSize: 15,
            color: '#333',
            fontWeight: 'bold',
        },
        even: {
            backgroundColor: color.primary,
            width: '95%',
            textAlign: 'center'
        },
        odd: {
            backgroundColor: color.second,
            width: '95%',
            textAlign: 'center'            
        },


        topTextFirst: {
            fontSize: 17,
            color: '#333',
            fontWeight: 'bold',
            padding:5, 
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            width: '110%',
            marginHorizontal: -20,
            backgroundColor: 'rgba(0, 255, 0, 0.2)'
        },
        center: {
            justifyContent: 'center',
            textAlign:'center',
            marginLeft:10,
            backgroundColor: 'pink',
            marginRight: 10,
            padding: 5,
            borderWidth: 1,
            borderColor: 'red'
        },
        bootom: {
            marginTop:30,
            marginLeft:10,
            backgroundColor: 'pink',
            marginRight: 10,
            padding: 5,
            borderWidth: 1,
            borderColor: 'red'
        },
        rowFul: {
            flexDirection: 'row'
        },

        // Css component Input
        inputText: {
            height: 51,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            color: '#333',
        },
        addBtn: {
            fontWeight: 'bold',
            fontSize: 28,
            backgroundColor: 'blue',
            color: color.white,
            borderRadius: 30,
            height: 51,
            with: 51,
            //Tạo Khoảng cách giữa nút và trên dưới, hai bên
            marginHorizontal: 8,
            marginVertical: 12,
            borderWidth: 1,
            //Tạo độ rộng cho nút addbtn
            paddingHorizontal: 15,
            paddingVertical: 5
        },
        colHalf80: {
            flex: 8
        },
        colHalf20: {
            flex: 2,
        },

        //Css component Onpress
        containerOnPress: {
            flex: 1,
            justifyContent: "center",
        },
        textOnpress: {
            fontSize: 16
        },
        wrapperCustom: {
            borderRadius: 8,
            padding: 6
        },
        logBox: {
            padding: 20,
            margin: 10,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: '#f0f0f0',
            backgroundColor: '#f9f9f9'
        }
    })

    export default styles