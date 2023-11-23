import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SearchBar from "../../reuseableComponent/CustomSearchBar";
import LibraryFlatList from "../../flatListComponent/LibraryFlatList";

function LibraryScreen(this: any) {
    const [searchText, setValue] = useState("")
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Text style={styles.tabTextColor}>
                    Library
                </Text>
                <TouchableOpacity>
                <Image source={require('../../assets/threeDots.png')} style={{ marginStart: 210, marginTop: 19, alignSelf: 'flex-end' }} />
                </TouchableOpacity>
            </View>
            <SearchBar value={searchText} onChangeText={setValue} />
            <LibraryFlatList searchText = {searchText}/>
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

export default LibraryScreen;