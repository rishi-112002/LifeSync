import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import TextInputCom from "../reuseableComponent/TextInputComponent";
import AppIconComponent from "../reuseableComponent/AppIconImage";
import ButtonComponent from "../reuseableComponent/ButtonComponent";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { loginAuth } from "../reduxIntegration/Reducer";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const usersCollection = firestore().collection('users');
    const dispatch = useDispatch()
    // const [message, setMessage] = useState(false)
    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
    const handleLogin = () => {
        if (!email) {
            Alert.alert("warning", "Please enter E-mail");
            return
        }
        handleEmail();
    }


    const userDetails =  () => {
         usersCollection.where("email", "==", email).get().then((querySnapShot) => {
            console.log("querySnapShot", querySnapShot.size)
            querySnapShot.forEach(async (doc) => {
                const userData = doc.data();
                console.log("userData", userData)
                saveLoginData(email, password, doc.id, userData.name)
            });
        }).catch(error => {
            console.log("error", error)
        })
    }
    const loginUser = async () => {
        try {
            await auth().signInWithEmailAndPassword(email, password);
            userDetails();
            console.log('User logged in successfully!');
        } catch (error) {
            if (error === 'auth/user-not-found') {
                console.log('User does not exist. You may want to redirect to the registration page.');
                Alert.alert("warning", "user does not exits")
            } else {
                console.error('Error logging in:', error);
            }
        }
    };
    const saveLoginData = async (email: string, password: string, userId: string, userName: string) => {
        const object = {
            email: email,
            password: password,
            userId: userId,
            userName: userName
        }
        dispatch(loginAuth(object))
        await AsyncStorage.setItem('email', object.email)
        await AsyncStorage.setItem('password', object.password)
        await AsyncStorage.setItem('userId', object.userId)
        await AsyncStorage.setItem('userName', object.userName)
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
        loginUser()

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

