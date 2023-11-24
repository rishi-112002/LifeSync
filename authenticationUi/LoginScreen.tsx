import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import TextInputCom from "../reuseableComponent/TextInputComponent";
import AppIconComponent from "../reuseableComponent/AppIconImage";
import ButtonComponent from "../reuseableComponent/ButtonComponent";
import LoginData from "../apiDataFunctions/LoginData";

function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [message, setMessage] = useState(false)
    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
    const handleLogin = () => {
        if (!email) {
            Alert.alert("warning", "Please enter E-mail");
            return
        }
        handleEmail();

    }
    const handleEmail = () => {
        if (!emailRegex.test(email)) {
            Alert.alert("warning", "entered email is invalid")
            console.log("InValid email")
            return
        }
        handlePassword();
    }
    const handlePassword = () => {
        if (!password) {
            Alert.alert("Warning", "Please enter password");
            return;
        }
        if (password.length < 6) {
            Alert.alert("Warning", "Password is invalid (less than 6 characters)");
            return;
        }
        else {
            LoginData({
                object: {
                    email: email,
                    password: password
                }
            });
        }
        console.log("Valid email and password");
    };
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

