import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
function ButtonComponent(props: {buttonTittle :any , onPress :any}) {
    const {buttonTittle , onPress} = props
    return (
    <TouchableOpacity style={style.button} onPress={onPress}>
        <Text style={style.buttonText}>
        {buttonTittle}
        </Text>
    </TouchableOpacity>)
}
const style = StyleSheet.create({
    button: {
        width: 300,
        height: 45,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#52AFFF',
        alignContent: 'center',
        marginTop: 35
    },
    buttonText: {
        color: 'white',
        borderRadius: 8,
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 18,
        padding: 7,
    },
})
export default ButtonComponent