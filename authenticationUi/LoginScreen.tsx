import React, { useState, useEffect } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import TextInputCom from "../reuseableComponent/TextInputComponent";
import AppIconComponent from "../reuseableComponent/AppIconImage";
import ButtonComponent from "../reuseableComponent/ButtonComponent";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from "../reduxIntegration/Store";
import { loginAuth } from "../reduxIntegration/Reducer";
import ApiCalling from "../apiCalling/PostRequest";

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState(false)
    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
    const handleEmail = () => {
        if (!emailRegex.test(email)) {
            console.log("invalid email");
            setMessage(false)
            Alert.alert("Warning", "please enter valid email")
        }
        else {
            console.log("valid email");
            setMessage(true)
        }
    }
    const saveLoginInputToAsyncStorage = async () => {
        try {
            await AsyncStorage.setItem('email', email)
            await AsyncStorage.setItem('password', password)
            console.log('saved successfully in shared Preference ')
        } catch {
            console.error('not saved in local storage')
        }
    }
    const handleLogin = () => {
        if (!email) {
            Alert.alert("warning", "Please enter E-mail");
            return
        }
        if (!password) {
            Alert.alert("warning", "Please enter Password");
            return
        }
        if (password.length < 6) {
            Alert.alert("warning", "password is invalid")
            return
        }
        const object = {
            userEmail: email,
            userPassword: password,
        }
        handleEmail();
        if (message) {
            saveLoginInputToAsyncStorage();
            store.dispatch(loginAuth(object))
        }


    }
    return (
        <ScrollView style={style.container}>
            <View >
                <AppIconComponent />
                <Text style={{ alignSelf: 'center', color: 'black', marginTop: 20, marginBottom: 50, fontSize: 20, fontWeight: 'bold' }}>
                    Login
                </Text>
                <Text style={style.inputText}>
                    Email
                </Text>
                <TextInputCom
                    value={email}
                    onChangeText={(text: React.SetStateAction<string>) => setEmail(text)}
                    placeholder="abc@gmial.com" secureTextEntry={false} />
                <Text style={style.inputText}>
                    Password
                </Text>
                <TextInputCom
                    value={password}
                    onChangeText={((text: React.SetStateAction<string>) => setPassword(text))}
                    placeholder="min 6 character" secureTextEntry={true} />
                <Text style={{ alignSelf: 'flex-end', color: 'blue', marginTop: 20, fontSize: 14, marginEnd: 33, fontWeight: 'bold' }} onPress={() => navigation.navigate('Forgot Password')}>
                    Forgot Password
                </Text>
                <ButtonComponent buttonTittle="Login" onPress={handleLogin} />
                <Text style={{ alignSelf: 'center', color: 'blue', marginTop: 20, fontSize: 14, marginEnd: 15, fontWeight: 'bold' }} onPress={() => navigation.navigate('sign up')}>
                    Don't have an account, Create new?
                </Text>
            </View>
        </ScrollView>)

};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    inputText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        marginStart: 35,
        marginTop: 15
    },
})

export default LoginScreen;

