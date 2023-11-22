import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native'

function SplashScreen() {
    return (
        <View style={style.container}>
            <Image source={require('../assets/appicon.png')} style={style.image} />
           
        </View>
    );
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 100,
        height: 100
    }
})
export default SplashScreen;