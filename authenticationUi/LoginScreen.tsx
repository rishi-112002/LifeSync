import React, { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import TextInputCom from "../reuseableComponent/TextInputComponent";
import AppIconComponent from "../reuseableComponent/AppIconImage";
import ButtonComponent from "../reuseableComponent/ButtonComponent";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { loginAuth } from "../reduxIntegration/Reducer";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PasswordInput from "../reuseableComponent/PasswordInput";

function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const usersCollection = firestore().collection('users');
    const dispatch = useDispatch()
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const [loading, setLoading] = useState(false);
    const handleLogin = () => {
        if (!email) {
            Alert.alert("warning", "Please enter email");
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
    const userDetails = () => {
        usersCollection.where("email", "==", email).get().then((querySnapShot) => {
            querySnapShot.forEach(async (doc) => {
                const userData = doc.data();
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
        } catch (error) {
            if (error === 'auth/user-not-found') {
                setLoading(false);
                Alert.alert("warning", "user does not exits")
            } else {
                setLoading(false);
                Alert.alert("warning", "user does not exits")
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
    const handlePassword = () => {
        if (!password) {
            Alert.alert("Warning", "Please enter password");
            return;
        }
        if (password.length < 6) {
            Alert.alert("Warning", "Password is invalid (less than 6 characters)");
            return;
        }
        setLoading(true);
        loginUser()

        console.log("Valid email and password");
    };

    return (
        <ScrollView style={style.container} keyboardShouldPersistTaps='handled'>
            <View style={{ marginTop: 70 }}>
                <AppIconComponent />
                <Text style={{ alignSelf: 'center', color: 'black', marginTop: 20, marginBottom: 50, fontSize: 20, fontWeight: 'bold' }}>
                    Login
                </Text>
                <Text style={style.inputText}>
                    Email
                </Text>
                <TextInputCom
                    value={email}
                    onChangeText={(text: string) => {
                        if (text.includes(' ')) {
                            setEmail(text.trim());
                        } else {
                            setEmail(text);
                        }
                    }
                    }
                    placeholder=" " secureTextEntry={false} keyBoardType={"email-address"} />
                <Text style={style.inputText}>
                    Password
                </Text>
                <PasswordInput value={password}
                    onChangeText={(text: string) => {
                        if (text.includes(' ')) {
                            setPassword(text.trim());
                        } else {
                            setPassword(text);
                        }
                    } 
                    }
                    placeholder="min 6 character" keyBoardType="normal" />
                <Text style={{ alignSelf: 'flex-end', color: 'blue', marginTop: 20, fontSize: 14, fontWeight: 'bold', width: 180, height: 35, textAlign: "center" }} onPress={() => navigation.navigate('Forgot Password')}>
                    Forgot Password ?
                </Text>
                <ButtonComponent buttonTittle="Login" onPress={handleLogin} />
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
                <Text style={{ alignSelf: 'center', color: 'blue', marginTop: 20, fontSize: 14, marginEnd: 15, fontWeight: 'bold', width: 300, height: 35, textAlign: "center" }} onPress={() => navigation.navigate('sign up')}>
                    Don't have an account, Create new?
                </Text>
            </View>
        </ScrollView>
    )

};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: 'flex-end',
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

