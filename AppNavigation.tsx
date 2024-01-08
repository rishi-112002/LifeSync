import React, { useEffect, useState } from 'react';
import LoginScreen from './authenticationUi/LoginScreen';
import SignUpScreen from './authenticationUi/SignupScreen'
import NewPassword from './authenticationUi/NewPassword';
import { useSelector } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './bookHome/TabNavigation';
import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider, useTheme } from '@react-navigation/native';
import ForgotPassword from './authenticationUi/ForgotPassword';
import { RootState, store } from './reduxIntegration/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginAuth } from './reduxIntegration/Reducer';
import SplashScreen from './authenticationUi/SplashScreen';
import { useColorScheme } from 'react-native';
const HomeStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
function AppNavigation() {
    const scheme = useColorScheme();
    const [loader, setLoader] = useState(true)
    const getUserData = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const password = await AsyncStorage.getItem('password');
            const userId = await AsyncStorage.getItem('userId')
            const userName = await AsyncStorage.getItem('userName')
            if (email && password) {
                const object = {
                    email,
                    password,
                    userId,
                    userName
                }
                store.dispatch(loginAuth(object))
                return
            }
        } catch (e) {
            console.log("error", e);
        } finally {
            setLoader(false)
        }
    }
    useEffect(() => {
        getUserData();
    }, []);
    const userEmail = useSelector((state: RootState) => {
        return state.loginAuth.email
    })
    console.log("userEmail at login", userEmail)
    if (loader) {
        return <SplashScreen />
    };
    const theme = {
        dark: scheme === 'dark' ? DarkTheme.dark : DefaultTheme.dark,
        colors: scheme === 'dark' ? DarkTheme.colors : DefaultTheme.colors,
    };
    console.log("theme", theme)
    return (
        <ThemeProvider value={theme}>
            <NavigationContainer theme={theme}>
                {userEmail ? (
                    <HomeStack.Navigator>
                        <HomeStack.Screen name='home' component={TabNavigation} options={{ headerShown: false }} />
                    </HomeStack.Navigator>
                ) : (
                    <AuthStack.Navigator>
                        <AuthStack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
                        <AuthStack.Screen name='sign up' component={SignUpScreen} options={{ headerShown: false }} />
                        <AuthStack.Screen name='Forgot Password' component={ForgotPassword} options={{ headerShown: false }} />
                        <AuthStack.Screen name='new Password' component={NewPassword} options={{ headerShown: false }} />
                    </AuthStack.Navigator>
                )
                }
            </NavigationContainer>
        </ThemeProvider>

    )
}
export default AppNavigation;



export const ThemeContext = React.createContext(AppNavigation);