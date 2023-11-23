import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function SearchFlatList(props: { searchText: String }) {
    const { searchText } = props

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
    const filterData = (item: { bookName: any }) => {
        console.log(item);
        if (searchText === "") {
            return null
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
        else {
            return null
        }
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={bookNames}
                renderItem={({ item }) => filterData(item)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
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
export default SearchFlatList;