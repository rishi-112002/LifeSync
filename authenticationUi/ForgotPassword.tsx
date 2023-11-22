import { useState } from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import AppIconComponent from "../reuseableComponent/AppIconImage"
import ButtonComponent from "../reuseableComponent/ButtonComponent"
import TextInputCom from "../reuseableComponent/TextInputComponent"
import React from "react"

function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState("")
    return (
        <ScrollView>
            <View style={style.container}>
                <AppIconComponent />
                <Text style={{ alignSelf: 'center', color: 'black', marginTop: 20, marginBottom: 50, fontSize: 20, fontWeight: 'bold' }}>
                    Forgot Password
                </Text>
                <Text style={style.inputText}>
                    Email
                </Text>
                <TextInputCom
                    value={email}
                    onChangeText={(text: React.SetStateAction<string>) => setEmail(text)}
                    placeholder="abc@gmial.com" secureTextEntry={false} />
                <ButtonComponent buttonTittle="Verify Email" onPress={() => navigation.navigate('new Password')} />
            </View>
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



