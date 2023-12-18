import { useState } from "react"
import { Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Image, ActivityIndicator } from "react-native"
import AppIconComponent from "../reuseableComponent/AppIconImage"
import ButtonComponent from "../reuseableComponent/ButtonComponent"
import TextInputCom from "../reuseableComponent/TextInputComponent"
import React from "react"
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false)
  let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
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
    checkIfEmailIsRegistered();
}
  const checkIfEmailIsRegistered = async () => {

    auth().fetchSignInMethodsForEmail(email).then(() => {
      console.log("email Verified")
      setLoading(true)
      initiatePasswordReset();
    }).catch((error) => {

      console.error('Error checking if email is registered:', error);
    })
  }
  const initiatePasswordReset = async () => {
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert("password reset email sent successfully")
      setLoading(false)
      setEmail("")
      navigation.navigate("Login")
      console.log('Password reset email sent successfully.');
    } catch (error) {
      setLoading(false)
      console.error('Error sending password reset email:', error);
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
      <ButtonComponent buttonTittle="Verify Email" onPress={handleLogin} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

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



