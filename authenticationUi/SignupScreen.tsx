import React, { useState } from "react";
import { Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Image } from "react-native";
import AppIconComponent from "../reuseableComponent/AppIconImage";
import ButtonComponent from "../reuseableComponent/ButtonComponent";
import TextInputCom from "../reuseableComponent/TextInputComponent";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { serverTimestamp } from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import PasswordInput from "../reuseableComponent/PasswordInput";
import Snackbar  from "react-native-snackbar";
function SignupScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const userId = auth().currentUser?.uid;
    const userData = {
        address: "Indore",
        countryCode: "+91",
        createdAt: serverTimestamp(),
        email: email,
        gender: "m",
        mobile: "1234567890",
        name: name,
        status: "active",
        updatedAt: serverTimestamp(),
        userId: userId,
    }


 const showToast = () => {
    Snackbar.show({
        text: 'Welcome You successfully SignedUpl! Please Login?',
        duration:2000,
        numberOfLines: 2,
        textColor: '#fff',
        backgroundColor: 'green',
        action: {
          text: 'Ok',
          textColor: '#fff',
          onPress: () => {
             console.log("toastPressed")
           }
        }
      });
  };

    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
    const handleSignInAuth = () => {
        if (!name) {
            Alert.alert("waning", "Please enter name")
            return
        }
        if (!email) {
            Alert.alert("waning", "Please enter email")
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
            addNewUser(email, password);
        }
        console.log("Valid email and password" , email , password , name);
    };

    const addNewUser = async (email: any, password: any) => {
        try {
            await auth().createUserWithEmailAndPassword(email, password);
            console.log('User added successfully!');
            addUserData();
            showToast();
            navigation.navigate("Login")

        } catch (error) {
            console.error('Error adding user:', error.message);
            Alert.alert("warning", "User is already exits Please try to login")
            return
        }
    };

    const addUserData = async () => {
        try {
            await firestore().collection("users").doc(userId).set(userData)
        } catch (error) {
            console.error('Error adding user:', error.message);
            Alert.alert("warning", "User is already exits Please try to login")
            return
        }
    }


    return (
        <ScrollView style={style.container} keyboardShouldPersistTaps="handled">
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require("../assets/backArrow.png")} style={{ width: 50, height: 35, resizeMode: "contain", marginTop: 18, marginStart: 5 }} />
            </TouchableOpacity>
            <AppIconComponent />
            <Text style={{ alignSelf: 'center', color: 'black', marginTop: 20, marginBottom: 50, fontSize: 20, fontWeight: 'bold' }}>
                Sign up
            </Text>
            <Text style={style.inputText}>
                Name
            </Text>
            <TextInputCom
                value={name}
                onChangeText={(text: React.SetStateAction<string>) => setName(text)}
                placeholder="" secureTextEntry={false} />
            <Text style={style.inputText}>
                Email
            </Text>
            <TextInputCom
                value={email}
                keyBoardType={"email-address"}
                onChangeText={(text: React.SetStateAction<string>) => setEmail(text)}
                placeholder="" secureTextEntry={false} />
            <Text style={style.inputText}>
                Password
            </Text>
            <PasswordInput value={password}
               onChangeText={(text:string) => {
                if (text.includes(' ')) {
                  setPassword(text.trim()); 
                 } else {
                    setPassword(text);
                 }
                }
               }
                placeholder="min 6 character" keyBoardType="normal" />
            <ButtonComponent buttonTittle="Sign up" onPress={handleSignInAuth} />
            <Text style={{ alignSelf: 'center', color: 'blue', marginTop: 20, fontSize: 14, marginEnd: 15, fontWeight: 'bold', width: 300, height: 35, textAlign: "center" }} onPress={() => navigation.navigate('Login')}>
                Already have an account, Login?
            </Text>
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

export default SignupScreen;



