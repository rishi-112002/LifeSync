// import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native"

function TextInputCom(props: { placeholder: any; value: any; onChangeText: any; secureTextEntry: any; errorMessage: String, keyBoardType: any }) {
    const { placeholder, value, onChangeText, secureTextEntry, errorMessage, keyBoardType } = props;
    return (
        <View style={{
            marginStart: 15,
            marginEnd: 15,
            marginTop: 7

        }}>
            <TextInput
                style={style.input}
                placeholder={placeholder}
                placeholderTextColor={'grey'}
                value={value}
                onChangeText={(text) => onChangeText(text)}
                secureTextEntry={secureTextEntry}
                keyboardType={keyBoardType}
                autoCapitalize='none'

            />
            {errorMessage && (<Text style={{ color: 'red', fontSize: 12, alignSelf: "flex-start", marginStart: 23 }}> {errorMessage}</Text>)}
        </View>
    )

};
const style = StyleSheet.create({
    input: {
        color: 'black',
        borderColor: 'grey',
        borderWidth: 1.0,
        borderRadius: 10,
        alignItems: 'center',
        alignContent: 'center',
        paddingStart: 10,
        fontSize: 18,
        paddingLeft: 15
    },

})
export default TextInputCom;