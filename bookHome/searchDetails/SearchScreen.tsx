import React, { useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SearchBar from "../../reuseableComponent/CustomSearchBar";
import SearchFlatList from "../../flatListComponent/SearchFlatList";

function SearchScreen() {
    const [searchText, setValue] = useState("")
    const searchBarRef = useRef(null);
    const handlePress = () => {
        console.log("focus")

        // Focus on the search bar and open the keyboard
        if (searchBarRef.current) {
           
            console.log("focus")
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.tabTextColor}>
                Search
            </Text>
            <SearchBar value={searchText} onChangeText={setValue} />
            {
                (searchText === "") &&
                (<View style={{ marginTop: 170, alignItems: 'center' }}>
                    <TouchableOpacity onPress={handlePress}>
                        <Image source={require('../../assets/searchImageDefaultIcon.png')} style={{ width: 180, height: 150, resizeMode: 'contain' }} />
                        <Text style={{ color: 'gray' , marginStart:40 }}>
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
const styles = StyleSheet.create({
    tabTextColor: {
        color: 'black',
        alignContent: 'flex-start',
        alignSelf: 'flex-start',
        marginStart: 23,
        marginTop: 18,
        fontSize: 27,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})
export default SearchScreen;