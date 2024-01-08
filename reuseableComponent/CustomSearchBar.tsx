import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";;

function SearchBar(props: { value: any; onChangeText: any }) {
    const { value, onChangeText } = props;
    const {colors , dark } = useTheme()
    return (
        <View style={style.container}>
            <TouchableOpacity>
                <Image source={require('../assets/search.png')} style={style.image} />
            </TouchableOpacity>
            <TextInput
                style={style.input}
                placeholder="Search"
                placeholderTextColor={'grey'}
                value={value}
                onChangeText={(text) => onChangeText(text)}
            />
        </View>
    )
};
const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        height: 55,
        backgroundColor: '#F6F6F6',
        borderBlockColor: 'black',
        borderRadius: 14,
        alignContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: 260,
        marginStart: 20,
        height: 43,
        alignSelf: 'center',
        color: 'black',
        borderColor: 'grey',
        alignItems: 'center',
        alignContent: 'center',
        marginEnd: 20,
        marginTop: 10,
        fontSize: 18
    },
    image: {
        marginStart: 15,
        marginTop: 7
    }
})
export default SearchBar;