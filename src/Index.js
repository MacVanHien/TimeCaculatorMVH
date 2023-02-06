
import React from 'react';

import SignUp from './SignUp';
import LogIn from './LogIn';
import Home from './Home';
import SplashScreen from './SplashScreen';
import TermsOfUser from './TermsOfUser';
import Points from './Points';
import CalendarDate from './CalendarDate';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import InternetConnectionAlert from "react-native-internet-connection-alert";


const Stack = createNativeStackNavigator();



//Component gốc quảng lí tất cả các component và liên kết các component
const RootComponent = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>

                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="CalendarDate" component={CalendarDate} />
                <Stack.Screen name="Points" component={Points} />

                <Stack.Screen name="LogIn" component={LogIn} />
                <Stack.Screen name="SignUp" component={SignUp} />

                <Stack.Screen name="TermsOfUser" component={TermsOfUser} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootComponent;