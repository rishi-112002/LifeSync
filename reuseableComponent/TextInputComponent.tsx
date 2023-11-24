import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native"

function TextInputCom(props: { placeholder: any; value: any; onChangeText: any; secureTextEntry: any  ; errorMessage:String}) {
    const { placeholder, value, onChangeText, secureTextEntry , errorMessage } = props;
    return (
        <View>
        <TextInput
            style={style.input}
            placeholder={placeholder}
            placeholderTextColor={'grey'}
            value={value}
            onChangeText={(text) => onChangeText(text)}
            secureTextEntry={secureTextEntry}
        />
        {errorMessage && (<Text style = {{color:'red', fontSize:12,   alignSelf: "flex-start",marginStart:23}}> {errorMessage}</Text>)}
        </View>
    )

};
const style = StyleSheet.create({
    input: {
        width: 320,
        marginStart: 20,
        height: 50,
        alignSelf: 'center',
        color: 'black',
        borderColor: 'grey',
        borderWidth: 1.0,
        borderRadius: 10,
        alignItems: 'center',
        alignContent: 'center',
        marginEnd: 20,
        marginTop: 10,
        paddingStart: 10,
        fontSize:18
    },
})
export default TextInputCom