import { useTheme } from "@react-navigation/native";
import React from "react";
import { Text, TextInput, View } from "react-native"

function TextInputCom(props: { placeholder: any; value: any; onChangeText: any; secureTextEntry: any; errorMessage: String, keyBoardType: any }) {
    const { placeholder, value, onChangeText, secureTextEntry, errorMessage, keyBoardType } = props;
    const { colors } = useTheme()

    return (
        <View style={{
            marginStart: 15,
            marginEnd: 15,
            marginTop: 7

        }}>
            <TextInput
                style={{
                    color: colors.text,
                    borderColor: 'grey',
                    borderWidth: 1.0,
                    borderRadius: 10,
                    alignItems: 'center',
                    alignContent: 'center',
                    paddingStart: 10,
                    fontSize: 18,
                    paddingLeft: 15
                }}
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
export default TextInputCom;