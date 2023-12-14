import React from "react";
import { Image, StyleSheet } from "react-native";

function AppIconComponent() {
    return (
        <Image source={require('../assets/appicon.png')} style={style.image} />
    );
}
const style = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center',
    }
})
export default AppIconComponent;