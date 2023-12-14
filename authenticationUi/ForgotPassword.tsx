import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Image } from "react-native"
import AppIconComponent from "../reuseableComponent/AppIconImage"
import ButtonComponent from "../reuseableComponent/ButtonComponent"
import TextInputCom from "../reuseableComponent/TextInputComponent"
import React from "react"
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const navigation = useNavigation();

  const handleForgotPassword = (email: string) => {
    auth().sendPasswordResetEmail(email)
      .then(() => {
        console.log("Password reset email sent successfully");
      })
      .catch((error) => {
        console.error("Error sending password reset email:", error);
      });
  };

  const checkIfEmailExists = (email: string) => {
    if (email) {
      auth().fetchSignInMethodsForEmail(email)
        .then((signInMethods) => {
          if (signInMethods && signInMethods.length > 0) {
            console.log("Email is valid and registered");
            handleForgotPassword(email);
          } else {
            console.log("Email is not registered");
          }
        })
        .catch((error) => {
          console.error("Error checking email existence:", error);
        });
    }
    else {
      Alert.alert("Warning", "please enter email")
    }
  };


  return (
    <ScrollView style={style.container} keyboardShouldPersistTaps="handled">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={require("../assets/backArrow.png")} style={{ width: 50, height: 35, resizeMode: "contain", marginTop: 18, marginStart: 5 }} />
      </TouchableOpacity>
      <AppIconComponent />
      <Text style={{ alignSelf: 'center', color: 'black', marginTop: 20, marginBottom: 50, fontSize: 20, fontWeight: 'bold' }}>
        Forgot Password
      </Text>
      <Text style={style.inputText}>
        Email
      </Text>
      <TextInputCom
        value={email}
        keyBoardType={"email-address"}
        onChangeText={(text: string) => setEmail(text)}
        placeholder="" secureTextEntry={false} />
      <ButtonComponent buttonTittle="Verify Email" onPress={() => checkIfEmailExists(email)} />

    </ScrollView>
  )
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

export default ForgotPassword;



