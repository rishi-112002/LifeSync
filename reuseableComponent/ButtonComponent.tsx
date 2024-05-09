import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
function ButtonComponent(props: { buttonTittle: any, onPress: any }) {
    const { buttonTittle, onPress } = props
    return (
        <TouchableOpacity style={style.button} onPress={onPress}>
            <Text style={style.buttonText}>
                {buttonTittle}
            </Text>
        </TouchableOpacity>)
}
const style = StyleSheet.create({
    button: {
        borderRadius: 10,
        marginStart: 25,
        marginEnd: 25,
        height: 47,
        backgroundColor: '#008F7D',
        alignContent: 'center',
        marginTop: 25,
        elevation: 2,

    },
    buttonText: {
        color: 'white',
        borderRadius: 8,
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 20,
        padding: 10,
    },
})
export default ButtonComponent