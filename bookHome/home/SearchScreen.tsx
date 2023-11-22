import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SearchBar from "../../reuseableComponent/CustomSearchBar";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

function SearchScreen() {
    const [searchText, setValue] = useState("")
    const bookNames = [
        {
            bookName: "The Magic Tree",
        },
        {
            bookName: "Winter Fairy",
        },
        {
            bookName: "Wizards of Ice",
        },
        {
            bookName: "Call of the Forest",
        },
        {
            bookName: "The Enchanted Ones",
        },
        {
            bookName: "A Spell Too Far",
        },
        {
            bookName: "A Potion For The Wise",
        },
        {
            bookName: "Tower To The Stars.",
        }
    ]
    const filterData = (item) => {
        console.log(item);
        if (searchText === "") {
            return (
                <View>

                </View>
            )
        }
        if (item.bookName.toLowerCase().includes(searchText.toLowerCase())) {
            return (
                <View>
                    <TouchableOpacity>
                        <Text style={styles.bookList}>
                            {
                                item.bookName
                            }
                        </Text>
                    </TouchableOpacity>
                </View>)
        }

    }
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
            <FlatList
                data={bookNames}
                renderItem={({ item }) => filterData(item)}
            />

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
    bookList: {
        color: 'black',
        marginStart: 15,
        marginTop: 10,
        textAlign: 'left',
        fontSize: 18,
        flex: 1,
        width: 320,
        borderRadius: 5,
        borderWidth: 1,
        padding: 8,
        borderBottomColor: 'lightgrey',
        borderRightColor: 'white',
        borderTopColor: 'white',
        borderLeftColor: 'white'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    }
})
export default SearchScreen;