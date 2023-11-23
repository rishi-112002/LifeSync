import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SearchBar from "../../reuseableComponent/CustomSearchBar";
import SearchFlatList from "../../flatListComponent/SearchFlatList";

function SearchScreen() {
    const [searchText, setValue] = useState("")

    return (
        <View style={styles.container}>
            <Text style={styles.tabTextColor}>
                Search
            </Text>
            <SearchBar value={searchText} onChangeText={setValue} />
            {
                (searchText === "") &&
                (<View style={{ marginTop: 170, alignItems: 'center' }}>
                    <Image source={require('../../assets/searchImageDefaultIcon.png')} style={{ width: 180, height: 150, resizeMode: 'contain' }} />
                    <Text style={{ color: 'gray' }}>
                        Type to search
                    </Text>
                </View>
                )
            }
            <SearchFlatList searchText={searchText}/>
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
        alignItems: 'center',
        backgroundColor: 'white'
    }
})
export default SearchScreen;