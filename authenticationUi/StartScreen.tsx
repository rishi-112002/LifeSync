import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native'
// import FastImage from 'react-native-fast-image';
function StartScreen() {
    return (
        <View style={style.container}>
            {/* <FastImage source={{ uri: "https://media.tenor.com/D16b6zcA3CMAAAAi/books-study.gif", }} style={style.image} /> */}
            <Text style={{ color: 'black' }}>
                hello
            </Text>
        </View>
    );
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    image: {
        width: 300,
        height: 300
    }
})
export default StartScreen;