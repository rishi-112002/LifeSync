import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppIconComponent from "../reuseableComponent/AppIconImage";
import ButtonComponent from "../reuseableComponent/ButtonComponent";
import TextInputCom from "../reuseableComponent/TextInputComponent";
import React from "react";
import { useNavigation } from "@react-navigation/native";

function NewPassword({ }) {
    const navigation = useNavigation()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    return (
        <ScrollView style={style.container}>
            <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'flex-start' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../assets/backArrow.png")} style={{ width: 50, height: 50, resizeMode: 'center', marginEnd: 5, alignItems: 'flex-start' }} />
                </TouchableOpacity>

            </View>
            <View style={{ marginTop: 30 }}>

                <AppIconComponent />

                <Text style={{ alignSelf: 'center', color: 'black', marginTop: 20, marginBottom: 50, fontSize: 20, fontWeight: 'bold' }}>
                    Enter New Password
                </Text>
                <Text style={style.inputText}>
                    New Password
                </Text>
                <TextInputCom
                    value={password}
                    onChangeText={(text: React.SetStateAction<string>) => setPassword(text)}
                    placeholder="min 6 character" secureTextEntry={false} />
                <Text style={style.inputText}>
                    Confirm Password
                </Text>
                <TextInputCom
                    value={confirmPassword}
                    onChangeText={((text: React.SetStateAction<string>) => setConfirmPassword(text))}
                    placeholder="min 6 character" secureTextEntry={true} />
                <ButtonComponent buttonTittle="Submit" onPress={() => navigation.goBack} />
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

export default NewPassword;