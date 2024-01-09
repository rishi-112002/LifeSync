import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";;

function SearchBar(props: { value: any; onChangeText: any }) {
    const { value, onChangeText } = props;
    const { colors, dark } = useTheme()
    return (
        <View style={{
            flexDirection: 'row',
            marginStart: 10,
            marginEnd: 10,
            marginTop: 20,
            height: 40,
            backgroundColor: colors.card,
            borderBlockColor: 'black',
            borderRadius: 14,
            alignContent: 'center',
            alignItems: 'center'
        }}>
            <TouchableOpacity>
                <Image source={!dark ? require('../assets/search.png') : require('../assets/searchDarkTheme.png')} style={style.image} />
            </TouchableOpacity>
            <TextInput
                style={{
                    marginStart: 15,
                    height: 45,
                    color: 'black',
                    borderColor: 'grey',
                    alignItems: 'center',
                    alignContent: 'center',
                    marginTop: 2,
                    fontSize: 18
                }}
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
        marginStart: 10,
        marginTop: 5,
        height: 20,
        width: 25,
        resizeMode: 'contain',
    }
})
export default SearchBar;