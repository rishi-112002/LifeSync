import React, { useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SearchBar from "../../reuseableComponent/CustomSearchBar";
import SearchFlatList from "../../flatListComponent/SearchFlatList";
import { useTheme } from "@react-navigation/native";


function SearchScreen() {
    const [searchText, setValue] = useState("")
    const searchBarRef = useRef(null);
    const { colors, dark } = useTheme()
    const handlePress = () => {
        console.log("focus")

        // Focus on the search bar and open the keyboard
        if (searchBarRef.current) {

            console.log("focus")
        }
    };
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.background
        }}>
            <Text style={{
                color: colors.text,
                alignContent: 'flex-start',
                alignSelf: 'flex-start',
                marginStart: 23,
                marginTop: 18,
                fontSize: 27,
                fontWeight: 'bold'
            }}>
                Search
            </Text>
            <SearchBar value={searchText} onChangeText={setValue} />
            {
                (searchText === "") &&
                (<View style={{ marginTop: "30%", alignItems: 'center' }}>
                    <TouchableOpacity onPress={handlePress}>
                        <Image source={dark ? require('../../assets/defaultSeachForDarkTheme.png') : require('../../assets/defaultSeachForLightTheme.png')} style={{ width: 110, height: 110, resizeMode: 'contain' , marginStart:5 }} />
                        <Text style={{ color: 'darkgray', marginStart: 20 }}>
                            Type to search
                        </Text>
                    </TouchableOpacity>
                </View>
                )
            }
            <SearchFlatList searchText={searchText} />
        </View>
    )
};
export default SearchScreen;