import React from "react";
import { Image, StyleSheet, View } from "react-native";

function AppIconComponent() {
    return (
        <View style={{ elevation: 20 }}>
            <Image source={require('../assets/appicon.png')} style={style.image} />
        </View>
    );
}
const style = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        marginTop: 40,
        alignSelf: 'center',
    }
})
export default AppIconComponent;